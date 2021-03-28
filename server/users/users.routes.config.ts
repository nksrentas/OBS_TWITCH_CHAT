import debug from 'debug';
import express from 'express'
import tmi from 'tmi.js'

import debugSingleton from '../shared/lib/debug.singleton'
import TwitchIRC from '../shared/lib/twitchIRC';
import SharedRoutesConfig from '../shared/shared.routes.config';
import usersController from './controllers/users.controller';
import usersMiddleware from './middleware/users.middleware';

export default class UsersRoutesConfing extends SharedRoutesConfig {
  private _log: debug.IDebugger

  constructor(app: express.Application) {
    super(app, 'USERS_ROUTE')
    this._log = debugSingleton.extendNamspace('users-route')
  }

  configureRoutes(): express.Application {
    this.app.param('name', usersMiddleware.extractStreamerName)

    this.app.route('/streamer/:name')
      .get((req: express.Request, res: express.Response) => {
        const { streamer } = req.body
        const client: tmi.Client = new TwitchIRC(streamer).instance

        usersController.connect(client)
        usersController.emitMessageToClient(client)

        res.render('index', { title: `${streamer.toUpperCase()}` })
      })

    return this.app
  }

}