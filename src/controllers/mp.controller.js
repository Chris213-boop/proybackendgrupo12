const axios = require("axios");
const mpCtrl = {};
const crypto = require("crypto");

mpCtrl.getPaymentLink = async (req, res) => {
    /*
    #swagger.tags = ['MercadoPago']
    #swagger.summary = 'Crear enlace de pago'
    #swagger.description = 'Crea una preferencia de pago en MercadoPago y devuelve el enlace de checkout para que el usuario pueda realizar el pago.'

    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Lista de productos que forman parte del pedido.',
        required: true,
        schema: {
            items: [ { $ref: '#/definitions/MercadoPagoItem' } ]
        }
    }
    */
    try {
        const url = "https://api.mercadopago.com/checkout/preferences";
        const { items } = req.body;

        const body = {
            external_reference: "PEDIDO_" + Date.now(),
            items: items
        };

        console.log("--- SOLICITANDO LINK DE CHECKOUT SEGURO A MP ---");

        const respuesta = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                "X-Idempotency-Key": crypto.randomUUID()
            }
        });

        // respuesta que contiene el init_point
        return res.status(200).json(respuesta.data);

    } catch (error) {
        console.error("--- ERROR EN LA API DE MERCADOPAGO ---");
        console.error(error.response?.data || error.message);

        return res.status(500).json({
            status: "0",
            mensaje: "Error al crear la preferencia de MercadoPago",
            detalles: error.response?.data || error.message
        });
    }
};

module.exports = mpCtrl;