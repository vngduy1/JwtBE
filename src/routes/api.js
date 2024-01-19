import express from 'express'
import userController from '../controller/userController'
import apiController from '../controller/apiController'
import groupController from '../controller/groupController'

const router = express.Router()

/**
 *
 * @param {*} app init api
 */
const initAPiRoutes = (app) => {
  router.get('/test-api', apiController.testApi)
  router.post('/register', apiController.handleRegister)
  router.post('/login', apiController.handleLogin)

  router.get('/user/read', userController.readUser)
  router.post('/user/create', userController.createUser)
  router.put('/user/update', userController.updateUser)
  router.delete('/user/delete', userController.deleteUser)

  router.get('/group/read', groupController.readGroup)

  return app.use('/api/v1/', router)
}

export default initAPiRoutes
