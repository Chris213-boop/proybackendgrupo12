const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API Joyería',
        description: 'Documentación de la API para la gestión de la joyería.'
    },

    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http', 'https'],

    tags: [
        {
            name: 'Producto',
            description: 'Operaciones relacionadas con los productos.'
        },
        {
            name: 'Contacto',
            description: 'Operaciones relacionadas con los mensajes de contacto.'
        },
        {
            name: 'Usuario',
            description: 'Operaciones relacionadas con los usuarios.'
        },
        {
            name: 'Dashboard',
            description: 'Operaciones relacionadas con el panel de estadísticas.'
        },
        {
            name: 'Configuración',
            description: 'Operaciones relacionadas con la configuración general del sistema.'
        },
        {
            name: 'MercadoPago',
            description: 'Operaciones relacionadas con pagos mediante MercadoPago.'
        },
        {
            name: 'Pedido',
            description: 'Operaciones relacionadas con la gestión de pedidos.'
        }
    ],

    definitions: {

        Producto: {
            nombre: 'Anillo de diamante de moissanita',
            categoria: 'anillos',
            precio: 25000,
            descuento: 10,
            imagen: 'https://m.media-amazon.com/images/I/61rM-Gbrf0L._AC_SY450_.jpg',
            descripcion: 'Anillo de diamante de moissanita de corte esmeralda/radiante para mujer, anillo de promesa de boda con halo brillante, chapado en platino, plata 925.',
            material: 'Plata 925',
            destacado: true,
            stock: 3
        },

        Contacto: {
            nombre: 'Juan Pérez',
            email: 'juan@gmail.com',
            telefono: '3884123456',
            mensaje: 'Quisiera consultar por la disponibilidad de un producto.'
        },

        Usuario: {
            username: 'juanperez',
            password: '123456',
            nombres: 'Juan',
            apellido: 'Pérez',
            perfil: 'administrador',
            email: 'juan@gmail.com',
        },

        Login: {
            username: 'juanperez',
            password: '123456'
        },

        Dashboard: {
            usuarios: 15,
            productos: 40,
            pedidos: 8,
            ventasMes: 35000,
            mensajes: 12,
            clientes: 10,
            estadoSistema: {
                api: true,
                baseDatos: true,
                mercadoPago: true,
                servidor: true
            }
        },

        Configuracion: {
            id: 1,
            longitudMinima: 8,
            requiereMayusculas: true,
            requiereNumeros: true,
            requiereEspeciales: true,
            intentosPermitidos: 5,
            tiempoBloqueoMinutos: 15,
            bloquearAutomaticamente: true,
            tiempoInactividadMinutos: 30,
            cerrarSesionAutomaticamente: true,
            permitirMultiplesSesiones: false,
            autenticacionPassword: true,
            autenticacion2FA: false,
            loginGoogle: false
        },
        VentasPorCategoria: {
            categoria: "anillos",
            total_vendido: 35
        },

        IngresosPorFecha: {
            fecha_dia: "2026-07-10",
            total_ingresos: 152000.50
        },

        TotalVentas: {
            total: 350000.75
        },

        Cantidad: {
            cantidad: 8
        },

        ProductoMasVendido: {
            producto: "Anillo de diamante de moissanita",
            vendidos: 42
        },
        MercadoPagoItem: {
            title: "Anillo de plata",
            quantity: 1,
            unit_price: 25000,
            currency_id: "ARS"
        },

        MercadoPagoPreference: {
            id: "123456789",
            init_point: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=123",
            external_reference: "PEDIDO_1720000000000"
        },

        Pago: {
            pedidoId: 1,
            mp_payment_id: "123456789",
            estado_pago: "APROBADO"
        },

        RespuestaPago: {
            status: "1",
            msg: "Pago registrado con éxito"
        },

        PedidoCreate: {
            usuarioId: 1,
            id_mercado_pago: "MP-123456789",
            items: [
                {
                    productoId: 5,
                    cantidad: 2,
                    precio_unitario: 25000
                }
            ]
        },

        ActualizarEstadoPedido: {
            estado_envio: "Despachado"
        },

        PedidoRespuesta: {
            status: "1",
            pedidoId: 15
        },
        
        Acceso: {
            fecha_hora: "2026-07-11T15:30:00.000Z",
            ip_origen: "192.168.1.10",
            accion_realizada: "Login exitoso"
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log(`Documentación generada en ${outputFile}`);
    // require('./index.js');
});