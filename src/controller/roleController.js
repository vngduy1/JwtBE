import roleApiService from '../service/roleApiService'

const readRole = async (req, res) => {
  try {
    let data = await roleApiService.getAllRoles()
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from readRole server',
      EC: -1,
      DT: '',
    })
  }
}

const createRole = async (req, res) => {
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
      EM: 'error from createRole roleApiService server',
      EC: -1,
      DT: '',
    })
  }
}

const updateUser = async (req, res) => {
  try {
    //Validate sau do
    let data = await roleApiService.updateUser(req.body)
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

const deleteRole = async (req, res) => {
  try {
    let data = await roleApiService.deleteRole(req.body.id)
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from deleteRole server',
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
  readRole,
  createRole,
  updateUser,
  deleteRole,
  getUserAccount,
}
