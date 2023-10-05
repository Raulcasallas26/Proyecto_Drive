import mongoose from "mongoose";

const RetroAlimentacionRedSchema = new mongoose.Schema({
    id: { type: String, required: false },
    nombre: { type: String, required: false },
    codigoFicha: { type: String, required: false }, 
    descripcion:{type:String, required: false},
    fecha:{type:String, required: false},
    documentos:{type:String, required: false}, 
    idprograma:{type:String, required:false},
})

export default mongoose.model('RetroAlimentacionRed', RetroAlimentacionRedSchema)