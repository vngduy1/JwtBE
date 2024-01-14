import e from 'express'
import userApiService from '../service/userApiService'

const readUser = async (req, res) => {
  try {
    let data = await userApiService.getAllUser()
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    })
  } catch (error) {
    console.log(e)
    return res.status(500).json({
      EM: 'error from server',
      EC: -1,
      DT: '',
    })
  }
}

const createUser = (req, res) => {
  try {
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from server',
      EC: -1,
      DT: '',
    })
  }
}

const updateUser = (req, res) => {
  try {
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from server',
      EC: -1,
      DT: '',
    })
  }
}

const deleteUser = (req, res) => {}

module.exports = {
  readUser,
  createUser,
  updateUser,
  deleteUser,
}
