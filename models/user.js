'use strict'
module.exports = function(sequelize,Datatypes){
    var users = sequelize.define('users',{
            id: {
							type: Datatypes.INTEGER,
							primaryKey: true,
							autoIncrement: true // Automatically gets converted to SERIAL for postgres
						},
            username:Datatypes.STRING,
            password:Datatypes.STRING,
            name:Datatypes.STRING,
            email:Datatypes.STRING,
            is_active:Datatypes.BOOLEAN,
            is_deleted:Datatypes.BOOLEAN,
            contact:Datatypes.STRING
        },{
            classMethods:{
                associate:function(models){

                }
            }

        }  
    )
    return users;
}