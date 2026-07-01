const contactoCtrl = require("../controllers/contacto.controller");

const express = require('express');
const router = express.Router();

router.post('/', contactoCtrl.enviarMensajeContacto);

module.exports = router;
