import express from 'express'
import userController from '../controller/userController'
import apiController from '../controller/apiController'
import groupController from '../controller/groupController'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'

const router = express.Router()

/**
 *
 * @param {*} app init api
 */

// const checkUser = (req, res, next) => {
//   const nonSecurePaths = ['/', '/register', '/login']
//   if (nonSecurePaths.includes(req.path)) return next()
//   //authenticate user
//   if (user) {
//     next()
//   } else {
//   }
// }

const initAPiRoutes = (app) => {
  router.all('*', checkUserJWT, checkUserPermission)
  // router.get('/test-api', apiController.testApi)
  router.post('/register', apiController.handleRegister)
  router.post('/login', apiController.handleLogin)
  router.post('/logout', apiController.handleLogout)
  router.get('/account', userController.getUserAccount)

  router.get('/user/read', userController.readUser)
  router.post('/user/create', userController.createUser)
  router.put('/user/update', userController.updateUser)
  router.delete('/user/delete', userController.deleteUser)

  router.get('/group/read', groupController.readGroup)

  return app.use('/api/v1/', router)
}

export default initAPiRoutes
