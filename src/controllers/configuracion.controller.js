const Configuracion = require("../models/configuracion.model");

const configuracionCtrl = {};

// Obtener la configuración
configuracionCtrl.getConfiguracion = async (req, res) => {
     /*
    #swagger.tags = ['Configuración']
    #swagger.summary = 'Obtener la configuración del sistema'
    #swagger.description = 'Devuelve la configuración general del sistema. Si aún no existe, se crea automáticamente con los valores por defecto.'
    */
    try {
        let configuracion = await Configuracion.findByPk(1);
        // Si todavía no existe, la crea con los valores por defecto
        if (!configuracion) {
            configuracion = await Configuracion.create({
                id: 1
            });
        }
        res.json(configuracion);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 0,
            msg: "Error al obtener la configuración"
        });
    }
};

// Actualizar la configuración
configuracionCtrl.updateConfiguracion = async (req, res) => {
    /*
    #swagger.tags = ['Configuración']
    #swagger.summary = 'Actualizar la configuración del sistema'
    #swagger.description = 'Actualiza la configuración general del sistema. Si no existe un registro de configuración, se crea automáticamente.'

    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos de la configuración.',
        required: true,
        schema: { $ref: '#/definitions/Configuracion' }
    }
    */
    try {
        let configuracion = await Configuracion.findByPk(1);
        if (!configuracion) {
            configuracion = await Configuracion.create({
                id: 1
            });
        }
        await configuracion.update(req.body);
        res.json({
            status: 1,
            msg: "Configuración actualizada correctamente",
            data: configuracion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 0,
            msg: "Error al actualizar la configuración"
        });
    }
};

module.exports = configuracionCtrl;