import mongoose from "mongoose";

const UsuariosSchema = new mongoose.Schema({
    nombre:{type:String, require: true},
    apellidos:{type:String, require: true}, 
    cedula:{type:String, require: true, unique:true}, 
    telefono:{type:String, require: true},
    email:{type:String, require: true, unique:true}, 
    password:{type:String, require: true},
    perfilProfesional:{type:String, require: true},
    curriculum:{type:String, require: true}, 
    estado:{type: Boolean, default: true, require: true},
    RolUsuario:{type:Object},
    RedConocimiento:{type:String}
}) 

export default mongoose.model("Usuario", UsuariosSchema)