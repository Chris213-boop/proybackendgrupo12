const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const usuarioCtrl = require('./../controllers/usuario.controller');
const autCtrl = require('./../controllers/auth.controller');

// definiendo rutas
router.post('/login', usuarioCtrl.loginUsuario);

router.post('/', usuarioCtrl.createUsuario);//crear usuario
router.get('/', autCtrl.verifyToken, usuarioCtrl.getUsuarios);//obtener todos los usuarios
router.delete('/:id', autCtrl.verifyToken, usuarioCtrl.deleteUsuario);//eliminar usuario
router.put('/:id', autCtrl.verifyToken, usuarioCtrl.editUsuario);//editar usuario
router.get('/:id', autCtrl.verifyToken, usuarioCtrl.gerUsuarioPorId);//buscar ususario por ID

//exportacion del modulo de rutas

module.exports = router;