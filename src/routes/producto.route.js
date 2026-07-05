const productoCtrl = require("../controllers/producto.controller");
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.get('/', productoCtrl.getProductos);
router.get('/destacados', productoCtrl.getDestacados);
router.get('/categoria/:categoria', productoCtrl.getProductosPorCategoria);
router.get('/:id', productoCtrl.getProductoPorId);
router.post('/', autCtrl.verifyToken, productoCtrl.crearProducto);
router.delete('/:id', autCtrl.verifyToken, productoCtrl.deleteProducto);
router.put('/:id', autCtrl.verifyToken, productoCtrl.modificarProducto);

module.exports = router;
