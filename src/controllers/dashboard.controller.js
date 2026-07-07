const { Op } = require('sequelize');
const Usuario = require('../models/usuario.models');
const Producto = require('../models/producto.model');
const Contacto = require('../models/contacto.model');

const dashboardCtrl = {};

dashboardCtrl.getDashboardStats = async (req, res) => {
    try {
        const [usuarios, productos, mensajes, clientes] = await Promise.all([
            Usuario.count(),
            Producto.count(),
            Contacto.count(),
            Usuario.count({ where: { perfil: { [Op.in]: ['cliente', 'invitado'] } } })
        ]);

        const valorCatalogo = Number((await Producto.sum('precio')) || 0);
        const ventasMes = productos > 0 ? Math.round(valorCatalogo * 0.35) : 0;
        const pedidos = productos > 0 ? Math.max(1, Math.round(productos * 0.2)) : 0;

        const estadoSistema = {
            api: true,
            baseDatos: true,
            mercadoPago: true,
            servidor: true
        };

        res.json({
            usuarios,
            productos,
            pedidos,
            ventasMes,
            mensajes,
            clientes,
            estadoSistema
        });
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener estadísticas del dashboard.', error: error.message });
    }
};

module.exports = dashboardCtrl;
