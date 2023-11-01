import mongoose from "mongoose";

const CentrosFormacionSchema = new mongoose.Schema({
    nombre: { type: String, required: false }, 
    codigo: { type: String, required: false, unique: true },
    estado:{type: Boolean, default: true, require: true},
    direccion: { type: String, required: false}
})  

export default mongoose.model('CentrosFormacion', CentrosFormacionSchema) 