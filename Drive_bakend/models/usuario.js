import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre_completo: {type: String, required: true},
    cedula: {type: Number, required: true, unique:true},
    email: {type: String, required: true, unique: true},
    red_conocimiento: {type: String, required: true},
    perfil_profecional: {type: String, required: true}
})

export default mongoose.model("Usuario", usuarioSchema)