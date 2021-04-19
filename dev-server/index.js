import express from 'express'
import { registerRoutes } from './routes.js'
import { setEnviroment } from './config/env.js'
import { connectToDB } from './config/db'

const app = express()

setEnviroment(app)
connectToDB()
registerRoutes(app)

const PORT = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080) : 3000

app.get('/', (req, res) => {
  res.json({ message: `Welcome to the compukitchen api. Running in ${process.env.NODE_ENV} mode.` })
})

app.listen(PORT, () => {
  console.log(`CompuKitchen listening at http://localhost:${PORT}. Running in ${process.env.NODE_ENV} mode.`)
})
