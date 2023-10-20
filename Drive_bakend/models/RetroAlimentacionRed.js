import mongoose from "mongoose";

const RetroAlimentacionRedSchema = new mongoose.Schema({
    codigo: { type: String},
    nombre: { type: String, required: false },
    codigoFicha: { type: String, required: false }, 
    descripcion:{type:String, required: false},
    fecha:{type:Date, default: Date.now, required: false},
    documentos:{type:String, required: false}, 
    idprograma:{type:String, required:false},
    estado:{type: Boolean, default: true}
})

export default mongoose.model('RetroAlimentacionRed', RetroAlimentacionRedSchema)