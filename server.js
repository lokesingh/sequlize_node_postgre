var express = require("express");
var app = express();
var router = express.Router(); 
var server = require('http');
 
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var dbConnection = require('./dbConnection/connection');
/**** Set headers ****/
app.use(function (req, res, next) {
	
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

var Server = server.createServer(app);
/*** routitng statrt here ****/
app.use("/api",require("./routes/api"));
// app.get('/',(req,res)=>{
//   console.log('lokendra');
// })

/**** Bind server to specifc port ****/
Server.listen(4005,function(){
  console.log('Server listening');
}); 



//https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04

// sudo -u postgres psql


// migration
/*
'use strict';

import * as models from "../../models";

module.exports = {

  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable(models.Role.tableName, models.Role.attributes)
    .then(() => queryInterface.createTable(models.Team.tableName, models.Team.attributes))
    .then(() => queryInterface.createTable(models.User.tableName, models.User.attributes))

  },

  down: function (queryInterface, Sequelize) {
    ...
  }

};*/