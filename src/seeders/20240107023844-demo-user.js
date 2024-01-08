'use strict'

module.exports = {
  //chèn một số dữ liệu vào một vài bảng theo mặc định.
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          email: 'John Doe',
          password: '123',
          username: 'fake1',
        },
        {
          email: 'John Doe2',
          password: '123',
          username: 'fake2',
        },
        {
          email: 'John Doe3',
          password: '123',
          username: 'fake3',
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
