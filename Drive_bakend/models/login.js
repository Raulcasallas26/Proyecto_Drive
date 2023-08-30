import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    password: {type: String, require: true, unique: true},
    usuario: {type: String, require: true, unique: true},
    instructor: { type: mongoose.Schema.Types.Number, ref: 'Instructor' },
    administrativo: { type: mongoose.Schema.Types.Number, ref: 'Administrativo' },
    gestorRed: { type: mongoose.Schema.Types.Number, ref: 'GestorRed' }
})

export default mongoose.model("Login", loginSchema)