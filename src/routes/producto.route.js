const express = require('express');
const router = express.Router();
const {
  getProductos,
  getProductoPorId,
  getProductosPorCategoria,
  getDestacados,
} = require('../controllers/producto.controller');

router.get('/', getProductos);
router.get('/destacados', getDestacados);
router.get('/categoria/:categoria', getProductosPorCategoria);
router.get('/:id', getProductoPorId);

module.exports = router;
