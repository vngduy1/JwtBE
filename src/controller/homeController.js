import userService from '../service/userService'

const homeController = (req, res) => {
  res.render('home.ejs')
}

const userController = async (req, res) => {
  let userList = await userService.getUserList()
  res.render('user.ejs', { userList })
}

const createNewUser = (req, res) => {
  let email = req.body.email
  let password = req.body.password
  let username = req.body.username

  userService.createNewUser(email, password, username)

  return res.redirect('/user')
}

const deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id)
  return res.redirect('/user')
}

const getUpdateUser = async (req, res) => {
  let id = req.params.id
  let user = await userService.getUserById(id)
  let userData = {}
  userData = user
  return res.render('updateUser.ejs', { userData })
}

const handleUpdateUser = async (req, res) => {
  let email = req.body.email
  let username = req.body.username
  let id = req.body.id
  await userService.updateUserInFor(email, username, id)

  return res.redirect('/user')
}

module.exports = {
  homeController,
  userController,
  createNewUser,
  deleteUser,
  getUpdateUser,
  handleUpdateUser,
}
