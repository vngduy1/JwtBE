import express from 'express'
import bodyParser from 'body-parser'
require('dotenv').config()

import configViewEngine from './config/viewEngine'
import initWebRoutes from './routes/web'
import initAPiRoutes from './routes/api'
import configCors from './config/cors'
// import connection from './config/connectDb'

const app = express()
const PORT = process.env.PORT || 8080

// Add headers before the routes are defined

//config view engine
configViewEngine(app)

//config body-parser
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }))

//config cors
configCors(app)
// connection()

//init web routes
initWebRoutes(app)
initAPiRoutes(app)

app.listen(PORT, () => {
  console.log(`Running on the port ${PORT}`)
})
