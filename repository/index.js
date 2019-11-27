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
		modal.user.findAll().then((get_user)=>{
			console.log('get_user',get_user)
			resolve(get_user);
		})
		.catch((get_err_user)=>{
		  console.log('error:', get_err_user);
		  	 resolve(get_err_user);
		});
	})
}

login=(data)=>{
	// return new Promise((resolve, reject)=>{
	// 	User.findOne({ user_email: data.email}, (err, user_detail)=> {
	// 	    if (err) {
	// 	    	 console.log('error:', get_err_user);
	// 	  	 	reject(get_err_user);
	// 	    } 
	// 	    resolve(user_detail);
	// 	})
	// })
}

module.exports={saveUserInformation,getAllUser,login}
