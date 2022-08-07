const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes/routes')
router.use('/users', userRoutes)


const ticketRoutes = require('./ticketRoutes/routes')
router.use('/tickets', ticketRoutes)


const path = require('path')
router.get('/logs', (req, res) => {
    // console.log(path.normalize(__dirname + '/../access.log'))
    res.sendFile(path.normalize(__dirname + '/../access.log'))
})


module.exports = router;