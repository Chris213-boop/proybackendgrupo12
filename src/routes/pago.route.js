const express = require('express');
const router = express.Router();
const pagoCtrl = require('../controllers/pago.controller');

router.post('/', pagoCtrl.registrarPago);

module.exports = router;