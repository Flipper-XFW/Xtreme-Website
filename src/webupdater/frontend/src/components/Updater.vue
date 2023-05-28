<template>
  <div class="updater column flex-center text-center">
    <template v-if="!flags.updateInProgress">
      <template v-if="flags.ableToUpdate && info.storage_sdcard_present">
        <div class="flex q-mt-sm">
          <q-select
            v-model="selected"
            :options="options"
            :suffix="options.find(({label}) => label === selected.label) ? options.find(({label}) => label === selected.label).date : ''"
            id="fw-select"
            style="width: 210px; border-radius: 14px 14px 14px 0px; border-width: 2px;"
            popup-content-style="width: 210px; height: auto; max-height: 320px; border-radius: 14px 14px 14px 0px; border: 2px solid white;"
            popup-content-class="bg-black text-gray-3"
            options-selected-class="bg-black text-white"
            behavior="menu"
            menu-self="center middle"
            menu-anchor="center middle"
            borderless
            options-dense
            dark
            >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" style="padding: 12px;">
                <q-item-section class="items-start">
                  <q-item-label v-text="scope.opt.label" class="fw-option-label" />
                </q-item-section>
                <q-item-section class="items-end">
                  <q-item-label v-text="scope.opt.date" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-btn
            v-if="selected"
            @click="update()"
            padding="12px 30px"
            :class="(!$q.screen.xs ? 'q-ml-lg' : 'q-mt-sm') + ' main-btn'"
            flat
          >Flash ⚡</q-btn>
        </div>
      </template>
      <template v-else>
        <span v-if="info.storage_sdcard_present">Your firmware doesn't support self-update. Install latest release with <a href="https://update.flipperzero.one">qFlipper desktop tool</a>.</span>
        <span v-else>Self-update is impossible without an SD card.</span>
      </template>
    </template>
    <template v-else>
      <p>{{ updateStage }}</p>
      <q-btn
        v-if="flags.updateError"
        flat
        class="q-mt-md main-btn"
        @click="flags.updateInProgress = false; flags.updateError = false"
      >Cancel</q-btn>
      <ProgressBar
        v-if="write.filename.length > 0"
        :title="write.filename"
        :progress="write.progress"
      />
    </template>
  </div>
  <div id="changelog"><br>Loading changelog...</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { fetchVersions, fetchFirmware, updater_share } from '../util/util'
import ProgressBar from './ProgressBar.vue'
import semver from 'semver'
import asyncSleep from 'simple-async-sleep'

export default defineComponent({
  name: 'Updater',

  components: {
    ProgressBar
  },

  props: {
    flipper: Object,
    rpcActive: Boolean,
    info: Object
  },

  setup () {
    return {
      flags: ref({
        restarting: false,
        rpcActive: false,
        rpcToggling: false,
        ableToUpdate: true,
        updateInProgress: false,
        updateError: false
      }),
      versions: ref({}),
      selected: ref({
        label: 'Loading...', value: '', version: ''
      }),
      options: ref([
        {
          label: 'Loading...', value: '', version: ''
        }
      ]),
      updateStage: ref(''),
      write: ref({
        filename: '',
        progress: 0
      })
    }
  },

  watch: {
    async selected (version, _) {
      const changelogElem = document.getElementById('changelog')
      if (!version.changelog) {
        changelogElem.innerHTML = '<br>Loading changelog...'
        const res = await fetch(version.changelogUrl, {
          headers: {
            Authorization: `Basic ${updater_share}`
          }
        })
        let changelog = await res.text()
        changelog = changelog.replaceAll(/^( *)[-*] (.*?)\n/gm, (match, g1, g2, offset, string, groups) => `<li style="padding-left: ${(g1 ? g1.length * 10 : 0) + 10}px">${g2}</li>`)
        for (let i = 5; i > 0; i--) {
          changelog = changelog.replaceAll(RegExp(`^${'#'.repeat(i)} (.*?)\n+`, 'gm'), `<h${i}>$1</h${i}>`)
        }
        // eslint-disable-next-line
        changelog = changelog.replaceAll(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a target="_blank" href="$2">$1</a>')
        changelog = changelog.replaceAll(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        changelog = changelog.replaceAll(/`(.*?)`/g, '<code>$1</code>')
        changelog = changelog.replaceAll(/^\s*\[\/\/\]:.*?\n+/gm, '')
        changelog = changelog.trimEnd().replaceAll('\n', '\n<br>\n')
        version.changelog = changelog
      }
      changelogElem.innerHTML = version.changelog
    }
  },

  methods: {
    async update () {
      this.flags.updateInProgress = true
      this.$emit('update', 'start')
      this.$emit('log', {
        level: 'info',
        message: 'Updater: Update started'
      })
      await this.loadFirmware()
        .catch(error => {
          this.flags.updateError = true
          this.updateStage = error
          this.$emit('showNotif', {
            message: error.toString(),
            color: 'negative'
          })
          this.$emit('log', {
            level: 'error',
            message: 'Updater: ' + error.toString()
          })
          throw error
        })
      this.flags.updateInProgress = false
    },

    async loadFirmware () {
      this.updateStage = 'Loading firmware bundle...'
      if (this.versions[this.selected.value] && this.versions[this.selected.value].url) {
        const files = await fetchFirmware(this.versions[this.selected.value].url)
          .catch(error => {
            this.flags.updateError = true
            this.updateStage = error
            this.$emit('showNotif', {
              message: 'Failed to fetch firmware: ' + error.toString(),
              color: 'negative'
            })
            this.$emit('log', {
              level: 'error',
              message: 'Updater: Failed to fetch firmware: ' + error.toString()
            })
            throw error
          })
          .finally(() => {
            this.$emit('log', {
              level: 'debug',
              message: 'Updater: Downloaded firmware from ' + this.versions[this.selected.value].url
            })
          })

        this.updateStage = 'Loading firmware files'
        this.$emit('log', {
          level: 'info',
          message: 'Updater: Loading firmware files'
        })

        let path = '/ext/update/'
        await this.flipper.commands.storage.stat('/ext/update')
          .catch(async error => {
            if (error.toString() !== 'ERROR_STORAGE_NOT_EXIST') {
              this.rpcErrorHandler(error, 'storage.stat')
            } else {
              await this.flipper.commands.storage.mkdir('/ext/update')
                .catch(error => this.rpcErrorHandler(error, 'storage.mkdir'))
                .finally(() => {
                  this.$emit('log', {
                    level: 'debug',
                    message: 'Updater: storage.mkdir: /ext/update'
                  })
                })
            }
          })

        for (const file of files) {
          if (file.size === 0) {
            path = '/ext/update/' + file.name
            if (file.name.endsWith('/')) {
              path = path.slice(0, -1)
            }
            await this.flipper.commands.storage.mkdir(path)
              .catch(error => this.rpcErrorHandler(error, 'storage.mkdir'))
              .finally(() => {
                this.$emit('log', {
                  level: 'debug',
                  message: 'Updater: storage.mkdir: ' + path
                })
              })
          } else {
            this.write.filename = file.name.slice(file.name.lastIndexOf('/') + 1)
            const unbind = this.flipper.emitter.on('storageWriteRequest/progress', e => {
              this.write.progress = e.progress / e.total
            })
            await this.flipper.commands.storage.write('/ext/update/' + file.name, file.buffer)
              .catch(error => this.rpcErrorHandler(error, 'storage.write'))
              .finally(() => {
                this.$emit('log', {
                  level: 'debug',
                  message: 'Updater: storage.write: /ext/update/' + file.name
                })
              })
            unbind()
          }
          await asyncSleep(300)
        }
        this.write.filename = ''
        this.write.progress = 0

        this.updateStage = 'Loading manifest...'
        this.$emit('log', {
          level: 'info',
          message: 'Updater: Loading update manifest'
        })

        await this.flipper.commands.system.update(path + '/update.fuf')
          .catch(error => this.rpcErrorHandler(error, 'system.update'))
          .finally(() => {
            this.$emit('log', {
              level: 'debug',
              message: 'Updater: system.update: OK'
            })
          })

        this.updateStage = 'Update in progress, pay attention to your Flipper'
        this.$emit('log', {
          level: 'info',
          message: 'Updater: Rebooting Flipper'
        })

        await this.flipper.commands.system.reboot(2)
          .catch(error => this.rpcErrorHandler(error, 'system.reboot'))
      } else {
        this.flags.updateError = true
        this.updateStage = 'Failed to fetch firmware'
        this.$emit('showNotif', {
          message: 'Unable to load firmware from the cloud server. Reload the page and try again.',
          color: 'negative',
          reloadBtn: true
        })
        this.$emit('log', {
          level: 'error',
          message: 'Updater: Failed to fetch firmware'
        })
      }
    },

    compareVersions () {
      if (semver.lt((this.info.protobuf_version_major + '.' + this.info.protobuf_version_minor) + '.0', '0.6.0')) {
        this.flags.ableToUpdate = false
      }
    },

    rpcErrorHandler (error, command) {
      error = error.toString()
      this.$emit('showNotif', {
        message: `RPC error in command '${command}': ${error}`,
        color: 'negative'
      })
      this.$emit('log', {
        level: 'error',
        message: `Updater: RPC error in command '${command}': ${error}`
      })
    }
  },

  async mounted () {
    this.versions = await fetchVersions(this.info.hardware_target)
      .catch(error => {
        this.$emit('showNotif', {
          message: 'Unable to load firmware versions from the cloud server. Reload the page and try again.',
          color: 'negative',
          reloadBtn: true
        })
        this.$emit('log', {
          level: 'error',
          message: 'Updater: failed to fetch versions'
        })
        throw error
      })
    this.compareVersions()
    this.options = Object.values(this.versions).sort((a, b) => (a.value < b.value) ? +1 : -1)
    this.selected = this.options[0]
  }
})
</script>
