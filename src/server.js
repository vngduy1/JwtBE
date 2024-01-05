import express from 'express'
require('dotenv').config()

import configViewEngine from './configs/viewEngine'
import initWebRoutes from './routes/web'

const app = express()

//config view engine
configViewEngine(app)

//init web routes
initWebRoutes(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Running on the port ${PORT}`)
})
