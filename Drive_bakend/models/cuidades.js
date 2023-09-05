import mongoose from "mongoose";

const CiudadesSchema = new mongoose.Schema({
    nombre:{type:String},
    CodigoDaneCiudad:{type:String},
    region:{type:String},
    departamento:{type:String},
    CodigoDaneDepartamento:{type:String}
}) 

export default mongoose.model("Ciudades", CiudadesSchema)