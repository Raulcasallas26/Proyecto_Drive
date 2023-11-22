import mongoose from "mongoose";
const { Schema } = mongoose; // Importa el objeto Schema de mongoose

const nivFormacionSchema = new Schema({
    denominacion: { type: String, required: true },
    estado: { type: Boolean, default: true }, 
});

const NivFormacion = mongoose.model("NivFormacion", nivFormacionSchema); // Crea el modelo utilizando mongoose.model

export default NivFormacion;