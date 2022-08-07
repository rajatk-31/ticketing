const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes/routes')
router.use('/users', userRoutes)


const ticketRoutes = require('./ticketRoutes/routes')
router.use('/tickets', ticketRoutes)


module.exports = router;