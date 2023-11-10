import mongoose from "mongoose";

const PoryectoSchema = new mongoose.Schema({
    nombre:{type:String, require:true},
    codigo:{type:String, require:true},
    descripcion:{type:String, require:true},
    fecha:{type:Date, default: Date.now},  
    version:{type:String, require:true},
    documento:{type:String, require:true},
    IdPrograma:{type:String, require:true},
    estado:{type: Boolean, default: true}
}) 

export default mongoose.model("proyec", PoryectoSchema)