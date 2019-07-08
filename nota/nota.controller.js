const Nota = require('./nota.model.js');
const admin = "5d1839ca7acb9c6267278051";
//Create new Nota
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const nota = new Nota({
      titulo : req.body.titulo,
      contenido : req.body.contenido,
      user_id : req.params.user_id,
    });

    nota.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear las Notaes."
        });
    });
};

// Retrieve all Notaes from the database.
exports.findAll = (req, res) => {
  let busqueda = {user_id : req.params.user_id };
  if(req.params.user_id == admin ){
    busqueda = {};
  }
  Nota.find( busqueda )
  .then(Notaes => {
      res.send(Notaes);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Error en traer las Notaes."
      });
  });
};

exports.findByEstado = (req, res) => {
    let busqueda = {Estado : req.params.estadoId , user_id : req.params.user_id }
    if(req.params.user_id == admin ){
      busqueda = {Estado : req.params.estadoId };
    }
    Nota.find( busqueda )
    .then(Nota => {
        if(!Nota) {
            return res.status(404).send({
                message: "No se encontro info para el estado " + req.params.estadoId
            });
        }
        res.send(Nota);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado Nota de estado  " + req.params.estadoId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar con id " + req.params.NotaId
        });
    });
};
// Find a single Nota with a NotaId
exports.findOne = (req, res) => {
    Nota.findById(req.params.notaId)
    .then(Nota => {
        if(!Nota) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.notaId
            });
        }
        res.send(Nota);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado Nota  " + req.params.notaId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.notaId
        });
    });
};


exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Nota content can not be empty"
        });
    }

    Nota.findByIdAndUpdate(req.params.notaId, {
      titulo : req.body.titulo,
      contenido : req.body.contenido,
      user_id : req.params.user_id,
    }, {new: true})
    .then(Nota => {
        if(!Nota) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.notaId
            });
        }
        res.send(Nota);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.notaId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.notaId
        });
    });
};

exports.delete = (req, res) => {
    Nota.findByIdAndRemove(req.params.notaId)
    .then(Nota => {
        if(!Nota) {
            return res.status(404).send({
                message: "Nota no encontrado id " + req.params.notaId
            });
        }
        res.send({message: "Nota borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Nota no encontrado id " + req.params.notaId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el Nota id " + req.params.notaId
        });
    });
};
