import loginRegisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
  res.status(200).json({
    message: 'ok',
    data: 'test api',
  })
}

const handleRegister = async (req, res) => {
  try {
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: 'Missing required parameters',
        EC: '1',
        DT: '',
      })
    }

    if (req.body.password && req.body.password.length < 3) {
      return res.status(200).json({
        EM: 'your password must have more than 3 letters',
        EC: '1',
        DT: '',
      })
    }

    //service create user
    let data = await loginRegisterService.registerNewUser(req.body)
    console.log(data)
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: '',
    })
  } catch (e) {
    res.status(500).json({
      EM: 'error', //Em la error message,
      EC: '-1', //error code
      DT: '', //date
    })
  }
}

const handleLogin = async (req, res) => {
  //Call APi Login
  try {
    let data = await loginRegisterService.handleUserLogin(req.body)

    //set cookie
    res.cookie('jwt', data.DT.access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    })
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from server',
      EC: -1,
      DT: '',
    })
  }
}

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
}
