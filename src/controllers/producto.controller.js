const Producto = require('../models/producto.model');
const productoCtrl = {};

// Recuperar todos
productoCtrl.getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los Productos.' });
    }
};

//get Productos destacados
productoCtrl.getDestacados = async (req, res) => {
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
productoCtrl.getDestacados = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            where: {
                categoria : req.params.categoria
            }
        });

        res.json(productos);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los Productos.' });
    }
};

// getProductoPorId
productoCtrl.getProductoPorId = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            where: {
                id : req.params.id
            }
        });

        res.json(productos);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los Productos.' });
    }
};



module.exports = productoCtrl;