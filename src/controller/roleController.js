import roleApiService from '../service/roleApiService'

const readUser = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page
      let limit = req.query.limit
      let data = await userApiService.getUserWithPagination(+page, +limit)
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      })
    } else {
      let data = await userApiService.getAllUser()
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from readUser server',
      EC: -1,
      DT: '',
    })
  }
}

const createUser = async (req, res) => {
  try {
    //Validate sau do
    let data = await roleApiService.createNewRoles(req.body)
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from createUser roleApiService server',
      EC: -1,
      DT: '',
    })
  }
}

const updateUser = async (req, res) => {
  try {
    //Validate sau do
    let data = await userApiService.updateUser(req.body)
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from updateUser server',
      EC: -1,
      DT: '',
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    let data = await userApiService.deleteUser(req.body.id)
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from deleteUser server',
      EC: -1,
      DT: '',
    })
  }
}

const getUserAccount = async (req, res) => {
  return res.status(200).json({
    EM: 'getUserAccount ok!!',
    EC: 0,
    DT: {
      access_token: req.token,
      groupWithRoles: req.user.groupWithRoles,
      email: req.user.email,
      username: req.user.username,
    },
  })
}

module.exports = {
  readUser,
  createUser,
  updateUser,
  deleteUser,
  getUserAccount,
}
