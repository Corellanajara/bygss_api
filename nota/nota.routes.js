module.exports = (app) => {
    const notas = require('./nota.controller.js');

    app.post('/notas/:user_id', notas.create);

    app.get('/notas/:user_id', notas.findAll);

    app.get('/notas/:notaId/:user_id', notas.findOne);

    app.put('/notas/:notaId/:user_id', notas.update);

    app.delete('/notas/:notaId', notas.delete);
}
