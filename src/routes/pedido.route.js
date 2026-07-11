const express = require('express');
const router = express.Router();
const pedidoCtrl = require('../controllers/pedido.controller');
const authCtrl = require('../controllers/auth.controller');

router.post('/',[authCtrl.verifyToken, authCtrl.isCliente], pedidoCtrl.crearPedido);
router.get('/', [authCtrl.verifyToken, authCtrl.isEmpleado], pedidoCtrl.getPedidos);
router.get('/:id', [authCtrl.verifyToken, authCtrl.isEmpleado], pedidoCtrl.getPedidoPorId);
router.put('/:id/estado', [authCtrl.verifyToken, authCtrl.isEmpleado], pedidoCtrl.actualizarEstado);

module.exports = router;