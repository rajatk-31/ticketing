const express = require('express');
const tokenVerify = require('../commonFiles/middleware')
const router = express.Router();

const getTickets = require('./getTickets')
router.get('/', tokenVerify, getTickets)
router.get('/:all', tokenVerify, getTickets)


const createTicket = require('./create')
router.post('/new', tokenVerify, createTicket)


const closeTicket = require('./closeTicket');
router.post('/markAsClosed', tokenVerify, closeTicket)

const deleteTicket = require('./deleteTickets')
router.post('/delete', tokenVerify, deleteTicket)


module.exports = router;