import mongoose from "mongoose";

const nivFormacionSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    denominacion: { type: String, required: true }
})

export default mongoose("NivFormacion", nivFormacionSchema);