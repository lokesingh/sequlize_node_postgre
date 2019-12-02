'use strict'
module.exports = function (sequelize, Datatypes) {
    var book = sequelize.define('book', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        user_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'users',
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

                }
            }

        }
    )
    return book;
}