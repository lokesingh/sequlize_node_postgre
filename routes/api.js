//https://github.com/AlaaMezian/NodeJs-backend-structure/blob/master/router/index.js
var express = require("express");
var router = express.Router(); 
var controller = require('../controller/web.controller');
var checkAuthenication = require('../middlewares/middleware');


router.post('/registration',controller.registration)
router.post('/login',controller.login)
router.post('/getAllUser',controller.getAllUser)
router.post('/getUserWithBook',controller.getUserWithBook)
router.post('/updateUser',checkAuthenication.checkAuthenication,controller.updateUser)
router.post('/searchFilter',checkAuthenication.checkAuthenication,controller.searchFilter)
router.post('/userGetById',checkAuthenication.checkAuthenication,controller.userGetById)
module.exports = router;