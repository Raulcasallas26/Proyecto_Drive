import mongoose from "mongoose";

const DesarrolloCurricularSchema = new mongoose.Schema({
    guiasAprendizaje:{type:String},
    matrizCorrelacion:{type:String},
    proyectoFormativo:{type:String},
    planeacionPedagogica:{type:String, },  
    estado:{type: Boolean, default: true}
}) 

export default mongoose.model("DesarrolloCurricular", DesarrolloCurricularSchema)