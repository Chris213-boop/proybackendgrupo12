const express = require('express');
const estadisticaCtrl = require('../controllers/estadisticas.controller');
const authCtrl = require('../controllers/auth.controller');
const router = express.Router();


// Ruta para los graficos
router.get('/grafico-categorias', [authCtrl.verifyToken, authCtrl.isEmpleado], estadisticaCtrl.getVentasPorCategoria);
router.get('/grafico-ingresos', [authCtrl.verifyToken, authCtrl.isEmpleado], estadisticaCtrl.getIngresosPorFecha );
router.get('/total-ventas', [authCtrl.verifyToken, authCtrl.isEmpleado], estadisticaCtrl.getTotalVentas);
router.get('/pedidos-pendientes', [authCtrl.verifyToken, authCtrl.isEmpleado], estadisticaCtrl.getPedidosPendientes );
router.get('/productos-sin-stock', [authCtrl.verifyToken, authCtrl.isEmpleado], estadisticaCtrl.getProductosSinStock );
router.get('/productos-mas-vendidos', [authCtrl.verifyToken, authCtrl.isEmpleado], estadisticaCtrl.getProductosMasVendidos );


module.exports = router;