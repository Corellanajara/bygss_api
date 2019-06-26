module.exports = (app) => {
    const productos = require('./producto.controller.js');

    app.post('/productos', productos.create);

    app.get('/productos', productos.findAll);

    app.get('/productos/:productoId', productos.findOne);

    app.get('/productos/estado/:estadoId', productos.findByEstado);

    app.put('/productos/:productoId', productos.update);

    app.delete('/productos/:productoId', productos.delete);
}
