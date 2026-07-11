const express = require('express');
const router = express.Router();
const accesoCtrl = require('../controllers/acceso.controller');
const autCtrl = require('./../controllers/auth.controller');


router.post('/', [autCtrl.verifyToken, autCtrl.isEmpleado], accesoCtrl.registrarAcceso);       
router.get('/', [autCtrl.verifyToken, autCtrl.isEmpleado], accesoCtrl.obtenerAccesos);        
router.get('/:id', [autCtrl.verifyToken, autCtrl.isEmpleado], accesoCtrl.obtenerAccesoPorId); 
router.delete('/:id', [autCtrl.verifyToken, autCtrl.isEmpleado], accesoCtrl.eliminarAcceso);  

module.exports = router;