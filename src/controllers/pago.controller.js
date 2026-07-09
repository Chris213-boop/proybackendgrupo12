const Pedido = require('../models/pedido.models');
const PagoMercadoPago = require('../models/pago.models');
const pagoCtrl = {};

//crear pago
pagoCtrl.registrarPago = async (req, res) => {
    const { pedidoId, mp_payment_id, estado_pago } = req.body;
    try {
        const pedido = await Pedido.findByPk(pedidoId);
        if (!pedido) return res.status(404).json({ status: '0', msg: 'Pedido no encontrado' });

        await PagoMercadoPago.create({ pedidoId, mp_payment_id, estado_pago });

        if (estado_pago === 'APROBADO') {
            await pedido.update({ estado_envio: 'Despachado' });
        }

        res.status(201).json({ status: '1', msg: 'Pago registrado' });
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al registrar el pago' });
    }
};

//mostrar todos
pagoCtrl.obtenerPagos = async (req, res) => {
    /*
    #swagger.tags = ['Pago']
    #swagger.summary = 'Obtener todos los pagos'
    */
    try {
        const pagos = await PagoMercadoPago.findAll();
        res.json(pagos);
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error al obtener los pagos.' });
    }
};

module.exports = pagoCtrl;