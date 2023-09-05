import mongoose from "mongoose";

const InstrumentosEvaluacionSchema = new mongoose.Schema({
    id: {type: String},
    nombre:{type:String},
    documento:{type:String},
}) 

export default mongoose.model("InstrumentoEvaluacion", InstrumentosEvaluacionSchema)