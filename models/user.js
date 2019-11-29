'use strict'
module.exports = function(sequelize,Datatypes){
    var user = sequelize.define('user',{
            
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
    return user;
}