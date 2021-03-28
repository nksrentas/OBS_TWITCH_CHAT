import express from 'express'
import debug from 'debug'

require('dotenv').config()

const { PORT } = process.env

const app: express.Application = express()
const log: debug.IDebugger = debug('main')

app.listen(PORT, () => {
  log(`Server is running on port ${PORT}`)
})