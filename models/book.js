'use strict'
var modal = require('../models/index')
module.exports = function (sequelize, Datatypes) {
    var books = sequelize.define('books', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        user_id: {
            type: Datatypes.INTEGER,
            references: {
                model: module.users,
                key: 'id'
            }
        },
        book_name: Datatypes.STRING,
        author_name: Datatypes.STRING,
        author_email: Datatypes.STRING,
        is_active: Datatypes.BOOLEAN,
        is_deleted: Datatypes.BOOLEAN,
    }, {
            classMethods: {
                associate: function (models) {
                  books.belongsTo(modal.users, { foreignKey: 'user_id', });
                }
            }

        }
    )
    return books;
}