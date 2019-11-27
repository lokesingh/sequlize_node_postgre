
var services = require('../services/index');

registration=(req, res) => {
	
	services.saveUser(req.body).then(user_result=>{
		
		res.status(200);
		response={ msg: 'User information save successfully.',data:user_result }
				return	res.send(response)
		
	}).catch(function(err) {
        console.log('error:', err);
	  	
		res.status(500);
		return  res.send(err)
    });
	
}

getAllUser=(req, res) => {
	services.getAllUser().then(get_user_result=>{
		res.status(200);
		response={  msg: 'get user successfully.',get_user_result }
				return	res.send(response)
	}).catch(function(err) {
        console.log('error:', err);
		res.status(500);
		return  res.send(err)
    });
}
login=(req, res) => {
	services.login(req.body).then(get_user_result=>{
		res.status(200);
		return	res.send(get_user_result)
	}).catch(function(err) {
        console.log('error:', err);
		res.status(500);
		return  res.send(err)
    });
}
module.exports ={login,registration,getAllUser}

