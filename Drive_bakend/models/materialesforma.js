import mongoose from "mongoose";

const MaterialesfromaSchema = new mongoose.Schema({

    nombre:{type:String}, 
    tipo:{type:String},
    descripccion:{type:String},
    documentos:{type:String},
}) 

export default mongoose.model("Materialesforma", MaterialesfromaSchema)

