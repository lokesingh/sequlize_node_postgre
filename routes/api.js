//https://github.com/AlaaMezian/NodeJs-backend-structure/blob/master/router/index.js
var express = require("express");
var router = express.Router(); 
var controller = require('../controller/web.controller');
var checkAuthenication = require('../middlewares/middleware');


router.post('/registration',controller.registration)
router.post('/login',controller.login)
router.post('/getAllUser',checkAuthenication.checkAuthenication,controller.getAllUser)
router.post('/updateUser',checkAuthenication.checkAuthenication,controller.updateUser)
router.post('/searchFilter',checkAuthenication.checkAuthenication,controller.searchFilter)
module.exports = router;