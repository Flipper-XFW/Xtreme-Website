<template>
  <q-page class="flex-center column full-width">
    <div class="flex-center column align-items-center">
      <template v-if="packs === null">
        <q-spinner
          color="primary"
          size="3em"
          class="q-mb-md"
        ></q-spinner>
        <p>Loading Asset Packs...</p>
      </template>
      <q-list v-else class="packs-grid">
        <q-card
          v-for="pack in packs"
          :key="pack.name"
          v-bind="pack"
          class="my-card"
          dark
        >
          <img :src="pack.image">

          <div class="text-h5 text-bold text-center">{{ pack.name }}</div>
          <div class="text-h7 text-center">By {{ pack.author }}</div>

          <q-card-actions :align="'stretch'">
            <q-btn
              :href="pack.download"
              class="main-btn"
              style="flex: 1;"
              flat
            >Download</q-btn>
            <q-btn
              v-if="pack.name !== installing"
              :disable="!serialSupported || installing !== null || rpcToggling"
              @click="install(pack)"
              class="main-btn"
              style="flex: 1;"
              flat
            >{{ !serialSupported ? 'Unsupported' : rpcToggling ? 'Connecting' : !connected ? 'Connect' : 'Install' }}</q-btn>
            <q-btn
              v-else
              class="main-btn"
              :style="`flex: 1; background-image: linear-gradient(to right, #d33 ${progress * 100}%, transparent ${progress * 100}%);`"
              disable
              flat
            >Installing</q-btn>
          </q-card-actions>

        </q-card>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { fetchPacks, fetchPack } from '../util/util'
import { defineComponent, ref } from 'vue'
import asyncSleep from 'simple-async-sleep'

export default defineComponent({
  name: 'PagePacks',

  props: {
    flipper: Object,
    connected: Boolean,
    rpcActive: Boolean,
    rpcToggling: Boolean,
    serialSupported: Boolean,
    info: Object
  },

  setup () {
    return {
      packs: ref(null),
      flags: ref({
        restarting: false,
        rpcActive: false,
        rpcToggling: false
      }),
      progress: ref(0),
      installing: ref(null)
    }
  },

  watch: {
    async info (newInfo, oldInfo) {
      if (newInfo !== null && newInfo.storage_databases_present && this.connected) {
        await this.start()
      }
    }
  },

  methods: {
    async install (pack) {
      if (!this.serialSupported) return
      if (!this.connected || this.info == null || !this.rpcActive) {
        if (!this.rpcToggling) this.$emit('selectPort')
        return
      }
      try {
        this.installing = pack.name
        this.progress = 0
        const files = await fetchPack(pack.download)
          .catch(error => {
            this.$emit('showNotif', {
              message: 'Failed to fetch pack: ' + error.toString(),
              color: 'negative'
            })
            this.$emit('log', {
              level: 'error',
              message: 'Packs: Failed to fetch pack: ' + error.toString()
            })
            throw error
          })
          .finally(() => {
            this.$emit('log', {
              level: 'debug',
              message: 'Packs: Downloaded pack from ' + pack.download
            })
          })

        const fileList = Object.entries(files).sort((a, b) => (a[0] > b[0]) ? +1 : -1)
        let path = '/ext'
        let mkdir = 'asset_packs/' + fileList[0][0]
        if (mkdir.endsWith('/')) {
          mkdir = mkdir.slice(0, -1)
        }
        for (const segment of mkdir.split('/')) {
          path += '/' + segment
          await this.flipper.commands.storage.mkdir(path)
            .catch(error => this.rpcErrorHandler(error, 'storage.mkdir'))
            .finally(() => {
              this.$emit('log', {
                level: 'debug',
                message: 'Packs: storage.mkdir: ' + path
              })
            })
        }

        let i = 0
        for (const [name, file] of fileList) {
          if (file.byteLength === 0) {
            path = '/ext/asset_packs/' + name
            if (name.endsWith('/')) {
              path = path.slice(0, -1)
            }
            await this.flipper.commands.storage.mkdir(path)
              .catch(error => this.rpcErrorHandler(error, 'storage.mkdir'))
              .finally(() => {
                this.$emit('log', {
                  level: 'debug',
                  message: 'Packs: storage.mkdir: ' + path
                })
              })
          } else {
            await this.flipper.commands.storage.write('/ext/asset_packs/' + name, file.buffer)
              .catch(error => this.rpcErrorHandler(error, 'storage.write'))
              .finally(() => {
                this.$emit('log', {
                  level: 'debug',
                  message: 'Packs: storage.write: /ext/asset_packs/' + name
                })
              })
          }
          i++
          this.progress = i / fileList.length
        }
      } finally {
        this.installing = null
        this.progress = 0
      }
    },

    async startRpc () {
      this.flags.rpcToggling = true
      const ping = await this.flipper.commands.startRpcSession(this.flipper)
      if (!ping.resolved || ping.error) {
        this.$emit('showNotif', {
          message: 'Unable to start RPC session. Reload the page or reconnect Flipper manually.',
          color: 'negative',
          reloadBtn: true
        })
        this.$emit('log', {
          level: 'error',
          message: 'Device: Couldn\'t start rpc session'
        })
        throw new Error('Couldn\'t start rpc session')
      }
      this.flags.rpcActive = true
      this.flags.rpcToggling = false
      this.$emit('setRpcStatus', true)
      this.$emit('log', {
        level: 'info',
        message: 'Device: RPC started'
      })
    },

    async stopRpc () {
      this.flags.rpcToggling = true
      await this.flipper.commands.stopRpcSession()
      this.flags.rpcActive = false
      this.flags.rpcToggling = false
      this.$emit('setRpcStatus', false)
      this.$emit('log', {
        level: 'info',
        message: 'Device: RPC stopped'
      })
    },

    async restartRpc (force) {
      if ((this.connected && this.flags.rpcActive && !this.flags.restarting) || force) {
        this.flags.restarting = true
        await this.flipper.closeReader()
        await asyncSleep(300)
        await this.flipper.disconnect()
        await asyncSleep(300)
        await this.flipper.connect()
        await this.startRpc()
        this.$emit('log', {
          level: 'info',
          message: 'Device: Restarted RPC'
        })
      }
    },

    passNotif (config) {
      this.$emit('showNotif', config)
    },
    passLog (config) {
      this.$emit('log', config)
    },

    rpcErrorHandler (error, command) {
      error = error.toString()
      this.$emit('showNotif', {
        message: `RPC error in command '${command}': ${error}`,
        color: 'negative'
      })
      this.$emit('log', {
        level: 'error',
        message: `Device: RPC error in command '${command}': ${error}`
      })
    },

    async start () {
      if (!this.serialSupported) return
      this.flags.rpcActive = this.rpcActive
      if (!this.rpcActive) {
        setTimeout(() => {
          if (!this.rpcActive) {
            return this.restartRpc(true)
          }
        }, 1000)
        await this.startRpc()
      }
      navigator.serial.addEventListener('disconnect', e => {
        this.flags.rpcActive = false
        this.flags.rpcToggling = false
        this.$emit('setRpcStatus', false)
      })
    }
  },

  async mounted () {
    this.packs = await fetchPacks()
      .catch(error => {
        this.$emit('showNotif', {
          message: 'Unable to load asset packs from the cloud server. Reload the page and try again.',
          color: 'negative',
          reloadBtn: true
        })
        this.$emit('log', {
          level: 'error',
          message: 'Packs: Failed to fetch pack list'
        })
        throw error
      })
    if (this.connected && this.info !== null && this.info.storage_databases_present) {
      await this.start()
    }
  },

  async beforeUnmount () {
    this.unbindRestart()
    await asyncSleep(3000)
  }
})
</script>
