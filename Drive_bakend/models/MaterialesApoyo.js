import mongoose from "mongoose";

const MaterialesApoyoSchema = new mongoose.Schema({
    codigo: {type: String},
    nombre:{type:String}, 
    documento:{type:String},
    descripccion:{type:String},
    documentos:{type:String},
}) 

export default mongoose.model("MaterialesApoyo", MaterialesApoyoSchema)

