import mongoose from "mongoose";

const InvestigacionesSchema = new mongoose.Schema({
    denominacion: { type: String, required: false },
    codigo: { type: String, required: false }, 
    descripcion:{type:String, required: false},
    fecha:{type:String, required: false},
    documentos:{type:String, required: false}, 
    idprograma:{type:String, required:false},
})

export default mongoose.model('Investigaciones', InvestigacionesSchema)