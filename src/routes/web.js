import express from 'express'

import homeController from '../controller/homeController'
import apiController from '../controller/apiController'
const router = express.Router()

/**
 *
 * @param {*} app express app
 */
const initWebRoutes = (app) => {
  router.get('/', homeController.homeController)
  router.get('/user', homeController.userController)
  router.post('/users/create-user', homeController.createNewUser)
  router.post('/delete-user/:id', homeController.deleteUser)
  router.get('/update-user/:id', homeController.getUpdateUser)
  router.post('/users/update-user', homeController.handleUpdateUser)

  router.get('/api/test-api', apiController.testApi)

  return app.use('/', router)
}

export default initWebRoutes
