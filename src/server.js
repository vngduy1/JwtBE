import express from 'express'
import bodyParser from 'body-parser'
require('dotenv').config()

import configViewEngine from './config/viewEngine'
import initWebRoutes from './routes/web'
// import connection from './config/connectDb'

const app = express()
const PORT = process.env.PORT || 8080

//config view engine
configViewEngine(app)

//config body-parser
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }))

//test connection db
// connection()

//init web routes
initWebRoutes(app)

app.listen(PORT, () => {
  console.log(`Running on the port ${PORT}`)
})
