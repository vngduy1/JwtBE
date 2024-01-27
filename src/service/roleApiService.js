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
    let persists = roles.filter(
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

const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll({ order: [['id', 'DESC']] })
    return {
      EM: `get getAllRoles success `,
      EC: 0,
      DT: data,
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from getAllRoles server',
      EC: 1,
      DT: [],
    })
  }
}

const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
    })
    if (role) {
      await role.destroy()
      return {
        EM: 'Delete role success',
        EC: 0,
        DT: [],
      }
    } else {
      return {
        EM: 'deleteRole not exist',
        EC: 2,
        DT: [],
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from deleteRole server',
      EC: 1,
      DT: [],
    })
  }
}

const getRoleByGroup = async (id) => {
  try {
    if (!id) {
      return {
        EM: `not found any getRoleByGroup error `,
        EC: 0,
        DT: [],
      }
    }

    let roles = await db.Group.findOne({
      where: { id: id },
      include: {
        model: db.Role,
        attributes: ['id', 'url', 'description'],
        through: { attributes: [] },
      },
    })
    return {
      EM: `get getRoleByGroup success `,
      EC: 0,
      DT: roles,
    }
  } catch (error) {
    console.log(error)
    return {
      EM: 'error from getRoleByGroup server',
      EC: 1,
      DT: [],
    }
  }
}

const assignRoleToGroup = async (data) => {
  try {
    await db.Group_Role.destroy({
      where: { groupId: +data.groupId },
    })
    await db.Group_Role.bulkCreate(data.groupRoles)
    return {
      EM: `assignRoleToGroup to success `,
      EC: 0,
      DT: [],
    }
  } catch (error) {
    console.log(error)
    return {
      EM: 'error from getRoleByGroup server',
      EC: 1,
      DT: [],
    }
  }
}

module.exports = {
  createNewRoles,
  getAllRoles,
  deleteRole,
  getRoleByGroup,
  assignRoleToGroup,
}
