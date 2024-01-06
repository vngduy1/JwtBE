import express from 'express'
import bodyParser from 'body-parser'
require('dotenv').config()

import configViewEngine from './configs/viewEngine'
import initWebRoutes from './routes/web'

const app = express()
const PORT = process.env.PORT || 8080

//config view engine
configViewEngine(app)

//config body-parser
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }))

//init web routes
initWebRoutes(app)

app.listen(PORT, () => {
    console.log(`Running on the port ${PORT}`)
})
