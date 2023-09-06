import mongoose from "mongoose";

const redesSchema = new mongoose.Schema({
    denominacion: {type: String, required: true},
    codigo: {type: String, unique: true, required: true}
})

export default mongoose.model('Redes', redesSchema)