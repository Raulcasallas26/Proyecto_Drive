import mongoose from "mongoose";

const RolesUsuariosSchema = new mongoose.Schema({
    codigo: {type: String, unique: true},
    denominacion: {type: String, required: true},
    estado:{type: Boolean, default: true, require: true} 
});

export default mongoose.model("RolesUsuarios", RolesUsuariosSchema); 