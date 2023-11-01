import mongoose from "mongoose";

const GuiasAprendizSchema = new mongoose.Schema({
    codigo:{type:String},
    nombre:{type:String},
    fase:{type:String},
    documento:{type:String},
    idInstrumentosEvaluacion:{type:String},
    idMaterialApoyo:{type:String},
    estado:{type:Boolean, default:true} 
}) 

export default mongoose.model("GuiasAprendiz", GuiasAprendizSchema)