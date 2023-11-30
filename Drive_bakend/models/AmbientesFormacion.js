import mongoose from "mongoose";

const AmbientesFormacionSchema = new mongoose.Schema({
    nombre:{type:String},
    tipo:{type:String},
    descripcion:{type:String},
    CentroDeFormacion:{type:String},
    documentos:{type:String},
    estado:{type: Boolean, default: true},
}) 

export default mongoose.model("AmbientesFormacion", AmbientesFormacionSchema)