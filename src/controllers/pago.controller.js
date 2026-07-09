const Pedido = require('../models/pedido.models');
const PagoMercadoPago = require('../models/pago.models');
const pagoCtrl = {};

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

module.exports = pagoCtrl;