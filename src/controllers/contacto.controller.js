const Contacto = require('../models/contacto.model');
const contactoCtrl = {};

// Dar de alta
contactoCtrl.enviarMensajeContacto = async (req, res) => {
    try {
    // Sequelize usa .create() para instanciar y guardar en un solo paso
        await Contacto.create(req.body);
        res.json({ status: '1', msg: 'MensajeContacto Guardado.' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
};

module.exports = contactoCtrl;