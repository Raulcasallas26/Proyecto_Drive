import mongoose from "mongoose";

const centrosSchema = new mongoose.Schema({
    nombre: { type: String, required: false },
    codigo: { type: String, required: false, unique: true },
    direccion: { type: String, required: false }
})

export default mongoose.model('Centros', centrosSchema)