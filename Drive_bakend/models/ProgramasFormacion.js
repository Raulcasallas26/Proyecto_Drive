import mongoose from "mongoose";

const   ProgramasFormacionSchema = new mongoose.Schema({
    denominacion: {type: String, required: true},
    codigo: {type: String, required: true, unique: true},
    version: {type: String, required: true},
    estado: { type: Boolean, default: true }
})

export default mongoose.model("progFormacion", ProgramasFormacionSchema)