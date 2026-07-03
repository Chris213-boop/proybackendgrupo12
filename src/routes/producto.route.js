const productoCtrl = require("../controllers/producto.controller");
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.get('/', autCtrl.verifyToken, productoCtrl.getProductos);
router.get('/destacados', productoCtrl.getDestacados);
router.get('/categoria/:categoria', productoCtrl.getProductosPorCategoria);
router.get('/:id', autCtrl.verifyToken, productoCtrl.getProductoPorId);
router.post('/', autCtrl.verifyToken, productoCtrl.crearProducto);

module.exports = router;
