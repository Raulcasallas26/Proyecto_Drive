import mongoose from "mongoose";

const AmbientesFormacionSchema = new mongoose.Schema({
    id: {type: String},
    codigo:{type:String},
    nombre:{type:String},
    tipo:{type:String},
    descripcion:{type:String},
    documentos:{type:String},
    idCentroDeFormacion:{type:String},
}) 

export default mongoose.model("AmbientesFormacion", AmbientesFormacionSchema)