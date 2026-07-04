const axios = require("axios");
const mpCtrl = {};
const crypto = require("crypto");

mpCtrl.getPaymentLink = async (req, res) => {
    try {
        const url = "https://api.mercadopago.com/checkout/preferences";
        const { items, comprador } = req.body;
        //comprador se utilizará en otra tabla
        const body = {
            external_reference: "PEDIDO_" + Date.now(),
            items: items,
            back_urls: {
                success: "http://localhost:4200/success",
                failure: "http://localhost:4200/failure",
                pending: "http://localhost:4200/pending"
            }
        };
        const respuesta = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                "X-Idempotency-Key": crypto.randomUUID()

            }
        });
        res.status(200).json(respuesta.data);
    } catch (error) {
        console.log(error.response?.data || error);
        res.status(500).json({ mensaje: "Error al crear el pago" });
    }
};

module.exports = mpCtrl;