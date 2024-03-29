import db from '../models/index'
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'
import { getGroupWithRoles } from './JwtService'
import { createJwt } from '../middleware/JWTAction'
require('dotenv').config()

const salt = bcrypt.genSaltSync(10)

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt)
  return hashPassword
}

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  })
  return !!user
}

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  })
  return !!user
}

const registerNewUser = async (rawUserData) => {
  try {
    //check email && phone number are exist
    let isEmailExist = await checkEmailExist(rawUserData.email)
    if (isEmailExist === true) {
      return {
        EM: 'The email is already exist',
        EC: 1,
      }
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone)
    if (isPhoneExist === true) {
      return {
        EM: `The phone is already exist`,
        EC: 1,
      }
    }
    //hash user password
    let hashPassword = hashUserPassword(rawUserData.password)
    //create new user
    db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPassword,
      phone: rawUserData.phone,
      groupId: 4,
    })

    return {
      EM: 'A user is created successfully!!!',
      EC: 0,
    }
  } catch (e) {
    return {
      EM: 'Something wrongs in service ...',
      EC: -2,
    }
  }
}

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword)
}

const handleUserLogin = async (rawData) => {
  try {
    //check email && phone number are exist
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    })
    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password)
      if (isCorrectPassword === true) {
        // let token

        //test token
        let groupWithRoles = await getGroupWithRoles(user)
        let payload = {
          email: user.email,
          groupWithRoles,
          username: user.username,
        }

        let token = createJwt(payload)
        return {
          EM: '成功',
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
            email: user.email,
            username: user.username,
          },
        }
      }
    }
    console.log(
      'not found user with email/phone',
      rawData.valueLogin,
      'password',
      rawData.password,
    )
    return {
      EM: 'メールアドレスまた電話番号またパスワードが合ってない',
      EC: 1,
      DT: '',
    }
    // if (isPhoneExist === false) {
    //   return {
    //     EM: 'メールアドレスまた電話番号が違いました',
    //     EC: 1,
    //     DT: '',
    //   }
    // }
  } catch (e) {
    console.log(e)
    return {
      EM: 'Something wrongs in service...',
      EC: -2,
    }
  }
}

module.exports = {
  registerNewUser,
  handleUserLogin,
  hashUserPassword,
  checkEmailExist,
  checkPhoneExist,
}
