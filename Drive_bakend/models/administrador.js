import mongoose from "mongoose";

const administradorSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    cedula: {type: Number, required: true, unique:true},
    email: {type: String, required: true, unique: true},
    direccion: {type: String, required: true},
    password: {type: String, required: true, unique: true},
    estado:  { type: Boolean, default: true } // 1 es activo y 0 es inactivo
})

export default mongoose.model("Administrador", administradorSchema)