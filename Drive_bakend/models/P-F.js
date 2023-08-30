import mongoose from "mongoose";

const progformacionSchema = new mongoose.Schema({
    id: {type: String, required: false, unique: true},
    denominacion: {type: String, required: true},
    codigo: {type: String, required: true, unique: true},
    version: {type: String, required: true},
    estado: { type: Boolean, default: true } // 1 es activo y 0 es inactivo
})

export default mongoose.model("progFormacion", progformacionSchema)