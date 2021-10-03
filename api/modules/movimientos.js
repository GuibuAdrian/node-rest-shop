const mongoose = require('mongoose');

const movimientosSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movimiento: { type: mongoose.Schema.Types.ObjectId},
    fecha: { type: Date},
    tiempoAtencion: {type: Number},
    precio: { type: Number, default: 450 }
});

module.exports = mongoose.model('Movimientos', movimientosSchema);