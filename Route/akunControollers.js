const express = require('express');
const app = express.Router();
const verifiedToken = require('../midleware/verifyToken'); 
const refreshToken = require('../controllers/refreshToken');
const registerController = require('../controllers/registerFunc');
const login = require('../controllers/loginfunc');
const getController = require('../controllers/getController');
const logutController = require('../controllers/logoutController');

app.get('/getAKUN',verifiedToken,getController);
app.post('/register',registerController);
app.post('/login',login)
app.get('/refreshToken',refreshToken);
app.delete('/delete',logutController);

module.exports = app;
