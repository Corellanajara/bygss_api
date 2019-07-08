const mongoose = require('mongoose');

const sucursalSchema = mongoose.Schema({
  titulo : String,
  contenido : String,
  user_id : String,

}, {
    timestamps: true
  });

module.exports = mongoose.model('notas', sucursalSchema);
