let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let inventario = new Schema({
    idCategoria: Number,
    categoria: String,
    valor: Number,
    cantidad: Number,
    vendes: Number,
    ganas: Number,
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("inventarios",inventario);
