import tmi from 'tmi.js'

export default class TwitchIRC {
  private _instance: tmi.Client

  constructor(channel: string) {
    this._instance = new tmi.Client({
      identity: {
        username: process.env.USERNAME,
        password: process.env.OAUTH
      },
      channels: [channel]
    })

    this._instance.connect()
  }

  get instance(): tmi.Client {
    return this._instance
  }

  set instance(value: tmi.Client) {
    this._instance = value
  }
}