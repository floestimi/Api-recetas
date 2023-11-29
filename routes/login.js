const express = require('express');
const login = express.Router();


const controller = require('../controllers/controller')

login.post('/', controller.login)

module.exports = login;