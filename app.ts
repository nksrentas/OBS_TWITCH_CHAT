import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import path from 'path'

import debug from './server/shared/lib/debug.singleton'
import SharedRoutesConfig from './server/shared/shared.routes.config'
import UsersRoutesConfig from './server/users/users.routes.config'
import io from './server/shared/lib/socket'

dotenv.config()

const { PORT } = process.env
const log = debug.extendNamspace('main-entry')

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const routes: SharedRoutesConfig[] = []


io(server)

app.set('views', path.join(__dirname, './server/views'))
app.set('view engine', 'pug')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, './server/public')))

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index', { title: 'Welcome to Kappa Reality' })
})

routes.push(new UsersRoutesConfig(app))

// app.use((err: Error, req: express.Request, res: express.Response) => {
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   res.status(err.status || 500)
//   res.render('error')
// })

server.listen(PORT, () => {
  log(`Server is running on port ${PORT}`)
  routes.forEach(route => log(`Route: ${route.name} initialized`))
})