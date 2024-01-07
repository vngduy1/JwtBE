const { Sequelize } = require('sequelize')

//sợi dây kết nối tới database
const sequelize = new Sequelize('jwt', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
})

const connection = async () => {
  try {
    //.authenticate()chức năng này để kiểm tra xem kết nối có ổn không:
    await sequelize.authenticate()
    console.log('Connection successfully!!!')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export default connection
