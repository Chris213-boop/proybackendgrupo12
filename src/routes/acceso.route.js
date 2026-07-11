const express = require('express');
const router = express.Router();
const accesoCtrl = require('../controllers/acceso.controller');


router.post('/', accesoCtrl.registrarAcceso);       
router.get('/', accesoCtrl.obtenerAccesos);        
router.get('/:id', accesoCtrl.obtenerAccesoPorId); 
router.delete('/:id', accesoCtrl.eliminarAcceso);  

module.exports = router;