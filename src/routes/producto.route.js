const productoCtrl = require("../controllers/producto.controller");

const express = require('express');
const router = express.Router();

router.get('/', productoCtrl.getProductos);
router.get('/destacados', productoCtrl.getDestacados);
router.get('/categoria/:categoria', productoCtrl.getProductosPorCategoria);
router.get('/:id', productoCtrl.getProductoPorId);
router.post('/', productoCtrl.crearProducto);

module.exports = router;
