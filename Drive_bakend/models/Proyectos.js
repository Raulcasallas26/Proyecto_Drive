import mongoose from "mongoose";

const PoryectoSchema = new mongoose.Schema({
    id: {type: String},
    nombre:{type:String},
    codigo:{type:String},
    descripcion:{type:String},
    fecha:{type:Date, default: Date.now}, 
    version:{type:String},
    documento:{type:String},
    IdPrograma:{type:String},
    estado:{type: Boolean, default: true},
}) 

export default mongoose.model("Proyecto", PoryectoSchema)