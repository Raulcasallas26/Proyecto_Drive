import mongoose from "mongoose";

const GuiasAprendizSchema = new mongoose.Schema({
    codigo:{type:String},
    nombre:{type:String},
    fase:{type:String},
    documento:{type:String},
    idInstrumentosEvaluacion:{type:String},
    idMaterialApoyo:{type:String}
}) 

export default mongoose.model("GuiasAprendiz", GuiasAprendizSchema)