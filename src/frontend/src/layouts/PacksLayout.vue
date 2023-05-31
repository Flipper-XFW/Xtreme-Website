<template>
  <q-layout view="hhh LpR fff">
    <q-page-container class="flex justify-center">
      <router-view
        :flipper="flipper"
        :serialSupported="flags.serialSupported"
        :rpcActive="flags.rpcActive"
        :rpcToggling="flags.rpcToggling"
        :connected="flags.connected"
        :info="info"
        @selectPort="selectPort"
        @setRpcStatus="setRpcStatus"
        @setInfo="setInfo"
        @update="onUpdateStage"
        @showNotif="showNotif"
        @log="log"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import * as flipper from '../flipper/core'
import asyncSleep from 'simple-async-sleep'
import log from 'loglevel'

let dismissNotif

export default defineComponent({
  name: 'PacksLayout',

  setup () {
    const $q = useQuasar()
    return {
      flipper: ref(flipper),
      info: ref(null),
      flags: ref({
        serialSupported: false,
        portSelectRequired: false,
        connected: false,
        rpcActive: false,
        updateInProgress: false,
        settingsView: false
      }),
      reconnectLoop: ref(null),
      connectionStatus: ref('Ready to connect'),
      logger: log,
      notify: $q.notify
    }
  },

  methods: {
    async connect () {
      await this.flipper.connect()
        .then(() => {
          this.flags.portSelectRequired = false
          this.connectionStatus = 'Flipper connected'
          this.flags.connected = true
          this.log({
            level: 'info',
            message: 'Main: Flipper connected'
          })
          if (dismissNotif) {
            dismissNotif()
          }
        })
        .catch((error) => {
          if (error.toString() === 'Error: No known ports') {
            this.flags.portSelectRequired = true
          } else {
            this.connectionStatus = error.toString()
          }
        })
    },

    async selectPort () {
      const filters = [
        { usbVendorId: 0x0483, usbProductId: 0x5740 }
      ]
      await navigator.serial.requestPort({ filters })
      return this.start(true)
    },

    async disconnect () {
      await this.flipper.disconnect()
        .then(() => {
          this.connectionStatus = 'Disconnected'
          this.flags.connected = false
          this.info = null
          this.textInfo = ''
        })
        .catch(async error => {
          if (error.toString().includes('Cannot cancel a locked stream')) {
            if (this.flags.rpcActive) {
              await this.stopRpc()
            } else {
              this.flipper.closeReader()
              await asyncSleep(300)
            }
            return this.disconnect()
          } else {
            this.connectionStatus = error.toString()
          }
        })
      this.log({
        level: 'info',
        message: 'Main: Flipper disconnected'
      })
    },

    async startRpc () {
      this.flags.rpcToggling = true
      const ping = await this.flipper.commands.startRpcSession(this.flipper)
      if (!ping.resolved || ping.error) {
        throw new Error('Couldn\'t start rpc session')
      }
      this.flags.rpcActive = true
      this.flags.rpcToggling = false
      this.log({
        level: 'info',
        message: 'Main: RPC started'
      })
    },

    async stopRpc () {
      this.flags.rpcToggling = true
      await this.flipper.commands.stopRpcSession()
      this.flags.rpcActive = false
      this.flags.rpcToggling = false
      this.log({
        level: 'info',
        message: 'Main: RPC stopped'
      })
    },

    async readInfo () {
      this.info = {}
      let res = await this.flipper.commands.system.deviceInfo()
        .catch(error => this.rpcErrorHandler(error, 'system.deviceInfo'))
        .finally(() => {
          this.$emit('log', {
            level: 'debug',
            message: 'Main: system.deviceInfo: OK'
          })
        })
      for (const line of res) {
        this.info[line.key] = line.value
      }
      res = await this.flipper.commands.system.powerInfo()
        .catch(error => this.rpcErrorHandler(error, 'system.powerInfo'))
        .finally(() => {
          this.$emit('log', {
            level: 'debug',
            message: 'Main: system.powerInfo: OK'
          })
        })
      for (const line of res) {
        this.info[line.key] = line.value
      }

      await asyncSleep(300)
      res = await this.flipper.commands.storage.list('/ext')
        .catch(error => this.rpcErrorHandler(error, 'storage.list'))
        .finally(() => {
          this.$emit('log', {
            level: 'debug',
            message: 'Main: storage.list: /ext'
          })
        })
      if (res && typeof (res) === 'object' && res.length) {
        const manifest = res.find(e => e.name === 'Manifest')
        if (manifest) {
          this.info.storage_databases_present = 'installed'
        } else {
          this.info.storage_databases_present = 'missing'
        }

        res = await this.flipper.commands.storage.info('/ext')
          .catch(error => this.rpcErrorHandler(error, 'storage.info'))
          .finally(() => {
            this.$emit('log', {
              level: 'debug',
              message: 'Main: storage.info: /ext'
            })
          })
        this.info.storage_sdcard_present = 'installed'
        this.info.storage_sdcard_totalSpace = res.totalSpace
        this.info.storage_sdcard_freeSpace = res.freeSpace
      } else {
        this.info.storage_sdcard_present = 'missing'
        this.info.storage_databases_present = 'missing'
      }

      await asyncSleep(200)
      res = await this.flipper.commands.storage.info('/int')
        .catch(error => this.rpcErrorHandler(error, 'storage.info'))
        .finally(() => {
          this.$emit('log', {
            level: 'debug',
            message: 'Main: storage.info: /int'
          })
        })
      this.info.storage_internal_totalSpace = res.totalSpace
      this.info.storage_internal_freeSpace = res.freeSpace
      this.log({
        level: 'info',
        message: 'Main: Fetched device info'
      })
    },

    findKnownDevices () {
      const filters = [
        { usbVendorId: 0x0483, usbProductId: 0x5740 }
      ]
      return navigator.serial.getPorts({ filters })
    },

    autoReconnect () {
      if (this.reconnectLoop) {
        clearInterval(this.reconnectLoop)
        this.reconnectLoop = null
      }
      this.reconnectLoop = setInterval(async () => {
        const ports = await this.findKnownDevices()
        if (ports && ports.length > 0) {
          clearInterval(this.reconnectLoop)
          this.reconnectLoop = null
          return await this.start()
        }
      }, 3000)
    },

    setRpcStatus (s) {
      this.flags.rpcActive = s
    },
    setInfo (info) {
      this.info = info
    },
    onUpdateStage (stage) {
      if (stage === 'start') {
        this.flags.updateInProgress = true
      } else if (stage === 'end') {
        this.flags.updateInProgress = false
      }
    },

    showNotif ({ message, color, reloadBtn }) {
      const actions = []

      if (reloadBtn) {
        actions.push({ label: 'Reload', color: 'white', handler: () => { location.reload() } })
      }
      if (actions.length === 0) {
        actions.push({ icon: 'close', color: 'white', class: 'q-px-sm' })
      } else {
        actions.push({ label: 'Dismiss', color: 'white' })
      }

      dismissNotif = this.notify({
        message: message,
        color: color,
        textColor: 'white',
        position: 'bottom-right',
        timeout: 0,
        group: true,
        actions: actions
      })
    },

    log ({ level, message }) {
      switch (level) {
        case 'error':
          this.logger.error(message)
          break
        case 'warn':
          this.logger.warn(message)
          break
        case 'info':
          this.logger.info(message)
          break
        case 'debug':
          this.logger.debug(message)
          break
      }
    },

    rpcErrorHandler (error, command) {
      error = error.toString()
      this.showNotif({
        message: `RPC error in command '${command}': ${error}`,
        color: 'negative'
      })
      this.log({
        level: 'error',
        message: `Main: RPC error in command '${command}': ${error}`
      })
    },

    async start (manual) {
      const ports = await this.findKnownDevices()
      if (ports && ports.length > 0) {
        await this.connect()
        await this.startRpc()
        await this.readInfo()
      } else {
        this.flags.portSelectRequired = true
        if (manual) {
          return this.selectPort()
        }
      }
    }
  },

  async mounted () {
    if ('serial' in navigator) {
      this.flags.serialSupported = true
      await this.start()
      navigator.serial.addEventListener('disconnect', e => {
        this.autoReconnect()
      })
      navigator.serial.addEventListener('disconnect', (e) => {
        if (!this.flags.updateInProgress) {
          this.showNotif({
            message: 'Flipper has been disconnected'
          })
          this.flags.connected = false
          this.flags.portSelectRequired = true
        }
        this.log({
          level: 'info',
          message: 'Main: Flipper has been disconnected'
        })
      })
    }

    this.logger.setLevel('debug', true)
    const originalFactory = this.logger.methodFactory
    this.logger.methodFactory = function (methodName, logLevel, loggerName) {
      const rawMethod = originalFactory(methodName, logLevel, loggerName)

      return function (message) {
        if (methodName !== 'debug') {
          rawMethod(message)
        }
      }
    }
  }
})
</script>
