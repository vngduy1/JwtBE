import db from '../models/index'

const createNewRoles = async (roles) => {
  try {
    const testArr = [
      { url: 'test1', description: 'abc' },
      { url: '/user/update', description: 'update user' },
    ]
    let currentRoles = await db.Role.findAll({
      attributes: ['url', 'description'],
      raw: true,
    })
    let persists = testArr.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2),
    )
    if (persists.length === 0) {
      return {
        EM: 'nothing to create',
        EC: 0,
        DT: [],
      }
    }
    await db.Role.bulkCreate(persists)
    return {
      EM: `Create roles createNewRoles ${persists.length} roles`,
      EC: 0,
      DT: [],
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from createNewGroup server',
      EC: 1,
      DT: [],
    })
  }
}

module.exports = {
  createNewRoles,
}
