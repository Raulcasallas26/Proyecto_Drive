import mongoose from "mongoose";

const   ProgramasFormacionSchema = new mongoose.Schema({
    denominacion: {type: String, },
    codigo: {type: String,  unique: true},
    version: {type: String, },
    estado: { type: Boolean, default: true }
})

export default mongoose.model("programasFormacion", ProgramasFormacionSchema)