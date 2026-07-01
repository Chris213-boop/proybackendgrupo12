const express = require('express');
const router = express.Router();
const { enviarMensajeContacto } = require('../controllers/contacto.controller');

router.post('/', enviarMensajeContacto);

module.exports = router;
