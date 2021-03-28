import express from 'express'
import http from 'http'
import dotenv from 'dotenv'

import debug from './server/shared/lib/debug.singleton'
import SharedRoutesConfig from './server/shared/shared.routes.config'
import UsersRoutesConfig from './server/users/users.routes.config'

dotenv.config()

const { PORT } = process.env
const log = debug.extendNamspace('main-entry')

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const routes: SharedRoutesConfig[] = []

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'Welcome to kappa reality' })
})

routes.push(new UsersRoutesConfig(app))

server.listen(PORT, () => {
  log(`Server is running on port ${PORT}`)
  routes.forEach(route => log(`Route: ${route.name} initialized`))
})