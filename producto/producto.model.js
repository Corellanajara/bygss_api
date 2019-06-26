const mongoose = require('mongoose');

const sucursalSchema = mongoose.Schema({
  Nombre : String,
  Codigo : String,
  Talla : String,
  Color : String,
  Cantidad : Number,
  PrecioCosto : Number,
  PrecioVenta : Number,
  Proveedor : String,
  FechaIngreso : String,
  FechaPago : String,
  Estado : Number,
  Persona : Array,
}, {
    timestamps: true
  });

module.exports = mongoose.model('productos', sucursalSchema);
