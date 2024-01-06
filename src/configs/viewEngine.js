import express from 'express'

/**
 *
 * @param {*} app - express app
 */

const configViewEngine = (app) => {
    app.use(express.static('./src/public'))
        .set('view engine', 'ejs')
        .set('views', './src/views')
}

export default configViewEngine
