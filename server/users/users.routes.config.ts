import express from 'express'

import debug from '../shared/lib/debug.singleton'
import SharedRoutesConfig from '../shared/shared.routes.config';

export default class UsersRoutesConfing extends SharedRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'USERS_ROUTE')
  }

  configureRoutes(): express.Application {
    this.app.param('name', (req: express.Request, res: express.Response, next: express.NextFunction, name: string) => {
      debug.log('Streamer name: ', name);
      next()

    })
    this.app.route('/streamer/:name')
      .all()
      .get((req: express.Request, res: express.Response) => {
        res.json({ message: 'its return' })
      })

    return this.app
  }

}