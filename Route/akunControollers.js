const express = require('express');
const app = express.Router();
//import contrrolers
const verifiedToken = require('../midleware/verifyToken'); 
const refreshToken = require('../controllers/refreshToken');
const getController = require('../controllers/getController');
const logutController = require('../controllers/logoutController');
const loginDanRegister = require('../controllers/loginDanRegister');

//get 
app.get('/getAKUN',verifiedToken,getController);

//register
app.post('/register',loginDanRegister.register);

//login
app.post('/login',loginDanRegister.login)

app.get('/refreshToken',loginDanRegister.refreshToken);
app.delete('/delete',logutController);

module.exports = app;
