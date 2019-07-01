module.exports = (app) => {
    const productos = require('./producto.controller.js');

    app.post('/productos/:user_id', productos.create);

    app.get('/productos/:user_id', productos.findAll);

    app.get('/productos/:productoId/:user_id', productos.findOne);

    app.get('/productos/estado/:estadoId/:user_id', productos.findByEstado);

    app.put('/productos/:productoId/:user_id', productos.update);

    app.delete('/productos/:productoId/:user_id', productos.delete);
}
