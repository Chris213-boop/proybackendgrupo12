const sequelize = require('../../config/database');
const Pedido = require('../models/pedido.models');
const Detalle = require('../models/detalle.model');
const Usuario = require('../models/usuario.models');
const Producto = require('../models/producto.model');

const pedidoCtrl = {};

pedidoCtrl.crearPedido = async (req, res) => {
    /*
    #swagger.tags = ['Pedido']
    #swagger.summary = 'Crear un nuevo pedido'
    #swagger.description = 'Crea un pedido asociado a un usuario y registra los productos comprados junto con sus cantidades y precios históricos.'

    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos necesarios para crear el pedido.',
        required: true,
        schema: { $ref: '#/definitions/PedidoCreate' }
    }
    */
    const { usuarioId, items, id_mercado_pago } = req.body;
    const t = await sequelize.transaction();
    try {
        const total = items.reduce((acc, i) => acc + i.cantidad * i.precio_unitario, 0);

        const pedido = await Pedido.create({
            usuarioId,
            total,
            id_mercado_pago
        }, { transaction: t });

        const detalles = items.map(i => ({
            pedidoId: pedido.id,
            productoId: i.productoId,
            cantidad: i.cantidad,
            precio_unitario: i.precio_unitario
        }));

        await Detalle.bulkCreate(detalles, { transaction: t });

        await t.commit();
        res.status(201).json({ status: '1', pedidoId: pedido.id });
    } catch (error) {
        console.error(error);
        await t.rollback();
        res.status(500).json({ status: '0', msg: 'Error al crear el pedido' });
    }
};

pedidoCtrl.getPedidos = async (req, res) => {
    /*
    #swagger.tags = ['Pedido']
    #swagger.summary = 'Obtener todos los pedidos'
    #swagger.description = 'Devuelve todos los pedidos registrados incluyendo información del usuario, detalles y productos asociados.'
    */
    try {
        const pedidos = await Pedido.findAll({
            include: [
                {
                    model: Usuario,
                    attributes: ['id', 'nombres', 'apellido']
                },
                {
                    model: Detalle,
                    as: 'detalles',
                    include: [
                        {
                            model: Producto,
                            attributes: ['nombre', 'precio']
                        }
                    ]
                }
            ],
            order: [['fecha', 'DESC']]
        });
        res.json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al obtener pedidos' });
    }
};

pedidoCtrl.getPedidoPorId = async (req, res) => {
    /*
    #swagger.tags = ['Pedido']
    #swagger.summary = 'Obtener un pedido por ID'
    #swagger.description = 'Obtiene la información de un pedido específico junto con sus detalles.'

    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del pedido.',
        required: true,
        type: 'integer'
    }
        */
    try {
        const pedido = await Pedido.findByPk(req.params.id, { include: { model: Detalle, as: 'detalles' } });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener el pedido' });
    }
};

pedidoCtrl.actualizarEstado = async (req, res) => {
    /*
    #swagger.tags = ['Pedido']
    #swagger.summary = 'Actualizar estado de un pedido'
    #swagger.description = 'Actualiza el estado de envío de un pedido. Los estados posibles pueden ser Pendiente, Despachado o Entregado.'

    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del pedido.',
        required: true,
        type: 'integer'
    }

    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Nuevo estado del pedido.',
        required: true,
        schema: {
            $ref: '#/definitions/ActualizarEstadoPedido'
        }
    }
        */
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if (!pedido) return res.status(404).json({ status: '0', msg: 'Pedido no encontrado' });
        await pedido.update({ estado_envio: req.body.estado_envio });
        res.json({ status: '1', msg: 'Estado actualizado' });
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al actualizar estado' });
    }
};

module.exports = pedidoCtrl;