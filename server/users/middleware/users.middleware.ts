import express from 'express'

class UsersMiddleware {

  extractStreamerName(req: express.Request, _res: express.Response, next: express.NextFunction) {
    req.body.streamer = req.params.name
    next()
  }
}

export default new UsersMiddleware()