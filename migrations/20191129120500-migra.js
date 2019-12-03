'use strict';
var modal = require('../models/index')
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('user', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
      },
      username: Sequelize.STRING,
      password: Sequelize.STRING,
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      is_active: Sequelize.BOOLEAN,
      is_deleted: Sequelize.BOOLEAN,
      contact: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
      .then(() => {
        queryInterface.createTable('books', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
          },
          user_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            }
          },
          
          book_name: Sequelize.STRING,
          author_name: Sequelize.STRING,
          author_email: Sequelize.STRING,
          is_active: Sequelize.BOOLEAN,
          is_deleted: Sequelize.BOOLEAN,
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE
        })
      })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

  }
};
