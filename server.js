const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Activar CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const config = require('./config.js');
const mongoose = require('mongoose');

require('./producto/producto.routes.js')(app);
require('./usuario/usuario.routes.js')(app);

mongoose.Promise = global.Promise;

mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Conectado a la base de datos");
}).catch(err => {
    console.log('No se pudo conectar... Saliendo de la base de datos', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.json({"message": "APi para ropa y estilo"});
});

app.listen(config.serverport, () => {
    console.log("Escuchando al puerto "+config.serverport);
});
