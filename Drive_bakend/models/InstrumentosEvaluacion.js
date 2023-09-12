import mongoose from "mongoose";

const InstrumentosEvaluacionSchema = new mongoose.Schema({
    id: {type: String},
    nombre:{type:String},
    documento:{type:String},
    estado:{type: Boolean, default: true},
}) 

export default mongoose.model("InstrumentoEvaluacion", InstrumentosEvaluacionSchema)