import mongoose from "mongoose";

const ProgramasFormacionSchema = new mongoose.Schema({
    denominacion: {type: String, },
    version: {type: String, },
    estado: { type: Boolean, default: true },
    niveldeformacion:{type: String},
    archivo:{type: String},
})

export default mongoose.model("programasFormacion", ProgramasFormacionSchema)