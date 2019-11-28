var modal = require('../models/index')

saveUserInformation=(data)=>{
	
	 return new Promise((resolve, reject)=>{ 
			
		modal.user.findAll({where: {email: data.email}}).then(function(user_result) {
			if(user_result){
							console.log(user_result)
				reject({msg:'Email already registered'});
			} else{
				var newUser = modal.user.build({
					username: data.username,
					name:data.name,
					email:data.email,
					password: data.password,
					is_active: true,
					is_deleted: false
				}) 
				newUser.save().then(function(newTask){
					resolve(newTask)
				}).catch(function(err_user){
					console.log('error:', err_user);
						reject(err_user);
				});
			}
		}).catch(function(err_user){
			console.log('error:', err_user);
				reject(err_user);
		});
	})
}

getAllUser=()=>{
	return new Promise((resolve, reject)=>{ 
		var promise =
		modal.user.findAll({where: {is_deleted: false,is_active:true}}).then((get_user)=>{
			
			resolve(get_user);
		})
		.catch((get_err_user)=>{
		  console.log('error:', get_err_user);
		  	 resolve(get_err_user);
		});
	})
}

login=(data)=>{
	 return new Promise((resolve, reject)=>{
		modal.user.findAll({where: {email: data.email}}).then(function(user_result) {
			resolve(user_result);
		}).catch((get_err_user)=>{
		  console.log('error:', get_err_user);
		  	 resolve(get_err_user);
		});
	 })
}

updateUser=(data)=>{
	return new Promise((resolve, reject)=>{
		var user_id =  data.id 
		var updateData = {
			username: data.username,
			name:data.name,
			password: data.password
		}
		modal.user.update(updateData,{returning: true, where: {id: user_id}}).then(function(updateUserData){
			resolve(updateUserData)
		}).catch(function(err_user){
			console.log('error:', err_user);
				reject(err_user);
		});
	})
}

module.exports={saveUserInformation,getAllUser,login}
