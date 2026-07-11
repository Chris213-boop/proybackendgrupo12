const express = require("express");
const router = express.Router();
const configuracionCtrl = require("../controllers/configuracion.controller");
const authCtrl = require("../controllers/auth.controller");

router.get("/", [authCtrl.verifyToken, authCtrl.isAdmin], configuracionCtrl.getConfiguracion);//obtener configuracion actual

router.put("/", [authCtrl.verifyToken, authCtrl.isAdmin], configuracionCtrl.updateConfiguracion); //cambiar configuraciones

module.exports = router;
