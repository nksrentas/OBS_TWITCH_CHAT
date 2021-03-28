import debug from 'debug'
import tmi from 'tmi.js'

import debugLog from '../../shared/lib/debug.singleton'
import emmiter from '../../shared/lib/emmiter'

class UsersController {
  private _log: debug.IDebugger

  constructor() {
    this._log = debugLog.extendNamspace('user-controller')
  }

  connect(client: tmi.Client) {
    client.on('connected', (address: string, port: number) => {
      this._log(`[+] Connected to ${address}:${port}`)

    })
  }

  emitMessageToClient(client: tmi.Client) {
    client.on('message', (channel: string, context: tmi.Userstate, message: string) => {
      const { username } = context

      emmiter.emit('command', { username, context, message })
    })
  }
}

export default new UsersController()