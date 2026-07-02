const contactoCtrl = require("../controllers/contacto.controller");

const express = require('express');
const router = express.Router();

router.get('/', contactoCtrl.getContactos);
router.post('/', contactoCtrl.crearContacto);

module.exports = router;
