import mongoose from "mongoose";

const instructoresSchema = new mongoose.Schema({
    id: {type: String},
    nombres:{type:String},
    apellidos:{type:String},
    cedula:{type:String},
    telefono:{type:String},
    email:{type:String},
    password:{type:String},
    perfilProfesional:{type:String},
    curriculum:{type:String},
    estado:{type: Boolean},
    idRolUsuario:{type:String},
    idRedConocimiento:{type:String}
}) 

export default mongoose.model("instructores", instructoresSchema)