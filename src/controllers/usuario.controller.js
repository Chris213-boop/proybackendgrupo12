const Usuario = require('./../models/usuario.models')
const jwt = require('jsonwebtoken');

const usuarioCtrl = {}

usuarioCtrl.createUsuario = async (req, res) => {
    //en req.body se espera que vengan los datos de usuario a crear
    const data = req.body;
    try {
        await Usuario.create(data);
        res.status(200).json({ status: '1', msg: 'Usuario guardado.' });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
usuarioCtrl.loginUsuario = async (req, res) => {
    //en req.body se espera que vengan las credenciales de login
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ status: 0, msg: "Faltan credenciales" });
    }
    // Criterio de búsqueda estricto: DEBEN coincidir username Y password
    let criteria = {
        where: {
            username: req.body.username,
            password: req.body.password
        }
    };
    try {
        //el método findOne retorna un objeto que cumpla con los criterios de busqueda
        const user = await Usuario.findOne(criteria);
        if (!user) {
            res.json({
                status: 0,
                msg: "not found"
            })
        } else {
            const unToken = jwt.sign({id: user.id}, process.env.JWT_SECRET);
            res.json({
                status: 1,
                msg: "success",
                username: user.username, //retorno información útil para el frontend
                perfil: user.perfil, //retorno información útil para el frontend
                userid: user.id, //retorno información útil para el frontend
                token: unToken
            })
        }
    } catch (error) {
        res.json({
            status: 0,
            msg: 'error'
        })
    }
}
//exportacion del modulo controlador
module.exports = usuarioCtrl;