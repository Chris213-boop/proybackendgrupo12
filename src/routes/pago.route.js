const express = require('express');
const router = express.Router();
const pagoCtrl = require('../controllers/pago.controller');
const authCtrl = require('../controllers/auth.controller');

router.post('/', pagoCtrl.registrarPago);//crear pago

router.get('/', [authCtrl.verifyToken, authCtrl.isEmpleado], pagoCtrl.obtenerPagos);//obtener los pagos

module.exports = router;