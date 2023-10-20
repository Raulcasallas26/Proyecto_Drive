import mongoose from "mongoose";

const RegistroCalificadoSchema = new mongoose.Schema({
    programa: {type:Object },
    titulo: { type: String, required: false },
    lugarDesarrollo: { type: String, required: false }, 
    metodologia:{type:String, required: false},
    creditos:{type:String, required: false},
    codigoSnies:{type:String, required: false}, 
    fecha:{type:Date, default: Date.now}, 
    documento:{type:String, required:false}
})

export default mongoose.model('RegistroCalificado', RegistroCalificadoSchema)