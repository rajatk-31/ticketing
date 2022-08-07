const express = require('express');
const router = express.Router();


const registerUser = require('./registerUser')
router.post('/new', registerUser)

const login = require('./login')
router.post('/login', login)




module.exports = router;