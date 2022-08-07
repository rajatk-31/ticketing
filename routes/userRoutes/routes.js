const express = require('express');

const router = express.Router();


const registerUser = require('./registerUser')
router.post('/new', registerUser)


module.exports = router;