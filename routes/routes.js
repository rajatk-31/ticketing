const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes/routes')
router.use('/users', userRoutes)


module.exports = router;