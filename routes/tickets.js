const express = require('express');
const router = express.Router();

const ticketsCtrl = require('../controllers/tickets');

router.get('/tickets/:flightId/new', ticketsCtrl.new);
router.post('/tickets/:flightId', ticketsCtrl.create);
router.delete('/tickets/:id', ticketsCtrl.delete);

module.exports = router;