const Producto = require('../models/producto.model');
const productoCtrl = {};

// Recuperar todos
productoCtrl.getProductos = async (req, res) => {
    /*
    #swagger.tags = ['Producto']
    #swagger.summary = 'Obtener todos los productos'
    */
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los Productos.' });
    }
};

//get Productos destacados
productoCtrl.getDestacados = async (req, res) => {
    /*
    #swagger.tags = ['Producto']
    #swagger.summary = 'Obtener productos destacados'
    */
    try {
        const productos = await Producto.findAll({
            where: {
                destacado: true
            }
        });

        res.json(productos);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los Productos.' });
    }
};

//get por categoria
productoCtrl.getProductosPorCategoria = async (req, res) => {
    /*
    #swagger.tags = ['Producto']
    #swagger.summary = 'Obtener productos por categoría'
    #swagger.parameters['categoria'] = {
        in: 'path',
        required: true,
        type: 'string'
    }
    */
    try {
        const productos = await Producto.findAll({
            where: {
                categoria: req.params.categoria
            }
        });

        res.json(productos);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los Productos.' });
    }
};

// getProductoPorId
productoCtrl.getProductoPorId = async (req, res) => {
    /*
    #swagger.tags = ['Producto']
    #swagger.summary = 'Obtener producto por ID'
    #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'integer'
    }
    */
    try {
        const productos = await Producto.findAll({
            where: {
                id: req.params.id
            }
        });

        res.json(productos);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los Productos.' });
    }
};

//post
productoCtrl.crearProducto = async (req, res) => {
    /*
    #swagger.tags = ['Producto']
    #swagger.summary = 'Crear un producto'
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Producto' }
    }
    */
    try {
        await Producto.create(req.body);

        res.json({ status: '1', msg: 'producto Guardado.' });
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al agregar.' });
    }
};



module.exports = productoCtrl;