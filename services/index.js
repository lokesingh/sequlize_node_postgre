var repository = require('../repository/index');
var Q = require('q');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var secret = "6z7mfMW1GwKzG2sgsG9icqN1bfcJTooGwIOySP22";
saveUser=(data)=> {
	return new Promise((resolve, reject)=>{ 
	  repository.saveUserInformation(data).then(result=> {
	  		
	      //return result;
	    resolve(result);
	  }).catch(function (err) {
	       // return err;
	     reject(err); 
	  });
   	})
}

getAllUser=(data)=> {
	return new Promise((resolve, reject)=>{ 
	  repository.getAllUser(data).then(result=> {
	      //return result;
	      resolve(result);
	  }).catch(function (err) {
	      
	       // return err;
	       reject(err); 
	  });
	})
}

login=(data)=>{

	return new Promise((resolve, reject)=>{ 
	 repository.login(data).then(result=> {
	 	
	 	// email id not resgistered
	 	if(!result){
	 		var response={ msg: 'your email id  not registered.' }
			return	reject(response);
	 	}
	 	// check email is_deleted or not
	 	if(result.is_deleted==true){
			var	response={ msg: 'your email id does not registered.' }
			return	reject(response);
	 	} 
	 	if(result.is_active==false){
	 		 var response={ msg: 'your email id is blocked.' }
			return	reject(response);
	 	}
	 	// password match
	 
	 	var passwordIsValid = bcrypt.compareSync(data.password, result[0].password);
	 	
	 	if (!passwordIsValid){

			 var response={  msg: 'Your password does not match.' }
			return reject(response);
		}
    
	    var token = jwt.sign({ user_id:result[0].id }, secret, { expiresIn: '24h' });
   
		 var data_result=  {'token': token,'user_name':result[0].username,'user_email':result[0].email};;
    
		var response={ data:data_result}  ;
			resolve(response);
	  }).catch(function (err) {
	       // return err;
	       reject(err); 
	  });
	})
}

updateUser=(data)=> {
	return new Promise((resolve, reject)=>{ 
	  repository.updateUser(data).then(result=> {
	  		
	      //return result;
	    resolve(result);
	  }).catch(function (err) {
	       // return err;
	       console.log(err)
	     reject(err); 
	  });
   	})
}

searchFilter=(data)=> {
	return new Promise((resolve, reject)=>{ 
	  repository.searchFilter(data).then(result=> {
	  		
	      //return result;
	    resolve(result);
	  }).catch(function (err) {
	       // return err;
	     reject(err); 
	  });
   	})
}

userGetById=(data)=> {
	return new Promise((resolve, reject)=>{ 
	  repository.userGetById(data).then(result=> {
	  		
	      //return result;
	    resolve(result);
	  }).catch(function (err) {
	       // return err;
	     reject(err); 
	  });
   	})
}

module.exports={saveUser,getAllUser,login,updateUser,searchFilter,userGetById}