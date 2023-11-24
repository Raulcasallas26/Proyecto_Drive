import mongoose from "mongoose";

const AmbientesFormacionSchema = new mongoose.Schema({
    id: {type: String},
    nombre:{type:String},
    tipo:{type:String},
    descripcion:{type:String},
    documentos:{type:String},
    idCentroDeFormacion:{type:String},
    estado:{type: Boolean, default: true},
}) 

export default mongoose.model("AmbientesFormacion", AmbientesFormacionSchema)