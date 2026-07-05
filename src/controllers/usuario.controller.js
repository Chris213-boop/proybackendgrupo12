const Usuario = require('./../models/usuario.models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const usuarioCtrl = {}

usuarioCtrl.loginUsuario = async (req, res) => {
    /*
    #swagger.tags = ['Usuario']
    #swagger.summary = 'Iniciar sesión de un usuario'
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            username: 'juanperez',
            password: '123456'
        }
    }
    #swagger.responses[200] = {
        description: 'Login exitoso',
        schema: {
            status: 1,
            msg: 'success',
            username: 'juanperez',
            perfil: 'administrador',
            userid: 1,
            token: 'jwt_token_here'
        }
    }
*/
    //en req.body se espera que vengan las credenciales de login
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ status: 0, msg: "Faltan credenciales" });
    }
    try {
        // Criterio de búsqueda estricto: DEBEN coincidir username Y password
        let criteria = {
            where: {
                username: req.body.username
            }
        };
        //el método findOne retorna un objeto que cumpla con los criterios de busqueda
        const user = await Usuario.findOne(criteria);
        if (!user) {
            res.json({
                status: 0,
                msg: "not found"
            })
        }
        
        // Comparación segura de hash con bcrypt (Evita texto plano)
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 0, msg: "Credenciales incorrectas" });
        }
        else {
            const unToken = jwt.sign({ id: user.id, perfil: user.perfil }, process.env.JWT_SECRET);
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
//crear usuarios
usuarioCtrl.createUsuario = async (req, res) => {
    /*
        #swagger.tags = ['Usuario']
        #swagger.summary = 'Crear un nuevo usuario'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/Usuario' }
        }
        */
    //en req.body se espera que vengan los datos de usuario a crear
    const data = req.body;
    try {
        if (data.password) {
            // CORRECCIÓN: Hasheo de la contraseña antes de guardar en la BD
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }

        await Usuario.create(data);
        res.status(200).json({ status: '1', msg: 'Usuario guardado.' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
}

// Obtener todos los socios
usuarioCtrl.getUsuarios = async (req, res) => {
    /*
        #swagger.tags = ['Usuario']
        #swagger.summary = 'Obtener todos los usuarios'
        */
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los Usuarios.' });
    }
};

// Eliminar un socio
usuarioCtrl.deleteUsuario = async (req, res) => {
    /*
        #swagger.tags = ['Usuario']
        #swagger.summary = 'Eliminar un usuario'
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'integer'
        }
        */
    try {
        // .destroy() elimina el registro que coincida con el ID enviado por parámetro
        await Usuario.destroy({
            where: { id: req.params.id }
        });
        res.json({ status: '1', msg: 'Usuario removed' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
    }
};

// Editar un socio
usuarioCtrl.editUsuario = async (req, res) => {
    /*
        #swagger.tags = ['Usuario']
        #swagger.summary = 'Modificar un usuario'
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/Usuario' }
        }
        */
    const data = req.body;
    try {
        const usuarios = await Usuario.findByPk(req.params.id);
        if (usuarios) {
            await usuarios.update(data);
            res.status(200).json({ status: '1', msg: 'Usuario actualizado' });
        } else {
            res.status(404).json({ status: '0', msg: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar Usuario', error: error.message });
    }
};


// Obtener usuario por ID
usuarioCtrl.gerUsuarioPorId = async (req, res) => {
    /*
        #swagger.tags = ['Usuario']
        #swagger.summary = 'Obtener usuario por ID'
    */
    try {
        // Buscamos por la clave primaria (id numérico)
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ status: '0', msg: 'Usuario no encontrado.' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener el Usuario.' });
    }
};
//exportacion del modulo controlador
module.exports = usuarioCtrl;