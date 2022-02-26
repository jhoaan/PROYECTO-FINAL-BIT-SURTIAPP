var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Surtiapp = new Schema({
    nombre: String,
    dni: Number,
    correo: String,
    direccion: String,
    ciudad: String,
    celular:Number,
    contraseña: String
    
    //estadoPago: {
      //  type: Boolean,
       // default: false
    //}
});

module.exports = mongoose.model("clientes", Surtiapp);