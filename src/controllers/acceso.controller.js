const Acceso = require('../models/acceso.model');
const accesoCtrl = {};

// 1. REGISTRAR UN ACCESO (Create)
accesoCtrl.registrarAcceso = async (req, res) => {
    try {
        const { ip_origen, accion_realizada } = req.body;

        // Validaciones básicas de seguridad
        if (!ip_origen || !accion_realizada) {
            return res.status(400).json({ status: '0', msg: 'Campos requeridos incompletos.' });
        }

        const nuevoAcceso = await Acceso.create({
            ip_origen,
            accion_realizada
            // fecha_hora se genera sola por el defaultValue: DataTypes.NOW
        });

        return res.status(201).json({ 
            status: '1', 
            msg: 'Acceso registrado correctamente.', 
            accesoId: nuevoAcceso.id 
        });
    } catch (error) {
        console.error('Error al registrar acceso:', error);
        return res.status(500).json({ status: '0', msg: 'Error interno del servidor.' });
    }
};

// 2. OBTENER TODOS LOS ACCESOS (Read - List)
accesoCtrl.obtenerAccesos = async (req, res) => {
    try {
        const accesos = await Acceso.findAll({
            order: [['fecha_hora', 'DESC']] // Primero los ingresos más recientes
        });
        return res.json(accesos);
    } catch (error) {
        console.error('Error al obtener accesos:', error);
        return res.status(500).json({ status: '0', msg: 'Error al recuperar el historial.' });
    }
};

// 3. OBTENER UN ACCESO POR ID (Read - Single)
accesoCtrl.obtenerAccesoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const acceso = await Acceso.findByPk(id);

        if (!acceso) {
            return res.status(404).json({ status: '0', msg: 'Registro de acceso no encontrado.' });
        }

        return res.json(acceso);
    } catch (error) {
        console.error('Error al obtener el acceso individual:', error);
        return res.status(500).json({ status: '0', msg: 'Error del servidor.' });
    }
};

// 4. ELIMINAR UN REGISTRO DE ACCESO (Delete)
accesoCtrl.eliminarAcceso = async (req, res) => {
    try {
        const { id } = req.params;
        const filasBorradas = await Acceso.destroy({ where: { id } });

        if (filasBorradas === 0) {
            return res.status(404).json({ status: '0', msg: 'El registro no existe o ya fue eliminado.' });
        }

        return res.json({ status: '1', msg: 'Registro de auditoría eliminado con éxito.' });
    } catch (error) {
        console.error('Error al eliminar el acceso:', error);
        return res.status(500).json({ status: '0', msg: 'Error al intentar eliminar el registro.' });
    }
};

module.exports = accesoCtrl;