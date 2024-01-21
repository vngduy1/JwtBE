require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import configViewEngine from './config/viewEngine'
import initWebRoutes from './routes/web'
import initAPiRoutes from './routes/api'
import configCors from './config/cors'
// import connection from './config/connectDb'

const app = express()
const PORT = process.env.PORT || 8080

//config view engine
configViewEngine(app)

//config body-parser
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }))

//config cookie=parser
app.use(cookieParser())

//config cors
configCors(app)

//init web routes
initWebRoutes(app)
initAPiRoutes(app)

//not found middleware
app.use((req, res) => {
  return res.send('404 not found')
})

app.listen(PORT, () => {
  console.log(`Running on the port ${PORT}`)
})
