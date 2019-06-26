const Producto = require('./producto.model.js');

//Create new producto
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const producto = new Producto({
        Nombre : req.body.Nombre,
        Codigo : req.body.Codigo,
        Talla : req.body.Talla,
        Color : req.body.Color,
        Cantidad : req.body.Cantidad,
        PrecioCosto : req.body.PrecioCosto,
        PrecioVenta : req.body.PrecioVenta,
        Proveedor : req.body.Proveedor,
        FechaIngreso : req.body.FechaIngreso,
        FechaPago : req.body.FechaPago,
        Estado : req.body.Estado,
        Persona : req.body.Persona,
    });

    producto.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear las productoes."
        });
    });
};

// Retrieve all productoes from the database.
exports.findAll = (req, res) => {
    Producto.find()
    .then(productoes => {
        res.send(productoes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las productoes."
        });
    });
};

exports.findByEstado = (req, res) => {
    Producto.find( {Estado : req.params.estadoId } )
    .then(producto => {
        if(!producto) {
            return res.status(404).send({
                message: "No se encontro info para el estado " + req.params.estadoId
            });
        }
        res.send(producto);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado producto de estado  " + req.params.estadoId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar con id " + req.params.productoId
        });
    });
};
// Find a single producto with a productoId
exports.findOne = (req, res) => {
    Producto.findById(req.params.productoId)
    .then(producto => {
        if(!producto) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.productoId
            });
        }
        res.send(producto);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado producto  " + req.params.productoId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.productoId
        });
    });
};


exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "producto content can not be empty"
        });
    }

    Producto.findByIdAndUpdate(req.params.productoId, {
      Nombre : req.body.Nombre,
      Codigo : req.body.Codigo,
      Talla : req.body.Talla,
      Color : req.body.Color,
      Cantidad : req.body.Cantidad,
      PrecioCosto : req.body.PrecioCosto,
      PrecioVenta : req.body.PrecioVenta,
      Proveedor : req.body.Proveedor,
      FechaIngreso : req.body.FechaIngreso,
      FechaPago : req.body.FechaPago,
      Estado : req.body.Estado,
      Persona : req.body.Persona,
    }, {new: true})
    .then(producto => {
        if(!producto) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.productoId
            });
        }
        res.send(producto);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.productoId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.productoId
        });
    });
};

exports.delete = (req, res) => {
    Producto.findByIdAndRemove(req.params.productoId)
    .then(producto => {
        if(!producto) {
            return res.status(404).send({
                message: "producto no encontrado id " + req.params.productoId
            });
        }
        res.send({message: "producto borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "producto no encontrado id " + req.params.productoId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el producto id " + req.params.productoId
        });
    });
};
