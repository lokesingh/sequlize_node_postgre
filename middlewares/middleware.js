var express = require("express");
var app = express();
var jwt = require('jsonwebtoken');
var modal = require('../models/index')
var secret = "6z7mfMW1GwKzG2sgsG9icqN1bfcJTooGwIOySP22";
module.exports.checkAuthenication=(req,res,next)=>{
   // var token =  req.headers['x-access-token'];
    var token = req.body.token
    
    if (token) {
        //veryfy token
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                console.log('error:', err);
                res.status(500);
				  response={msg: 'Internale server error' }
					       		res.send(response)
            } else {
                // check user id here 
                 var user_id = decoded.user_id;
                
                modal.user.findAll({where: {id: user_id}}).then(function(user_result) {
                    if(user_result.length>0){
                
                   
                      return next();
                    }else{
                        res.status(500);
                        response={  msg: 'your are not auth user' }
                                               res.send(response)
                    }
                    
                }).catch(function(err){
                  console.log('error:', err);
                    res.status(500);
                      response={msg: 'Internale server error' }
                                        res.send(response)
                });
            }
        })
    } else{
            res.status(500);
         response={  msg: 'your are not auth user' }
                                res.send(response)
    }
}

