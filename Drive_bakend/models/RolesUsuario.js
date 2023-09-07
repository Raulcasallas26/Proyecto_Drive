import mongoose from "mongoose";

const RolesUsuariosSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    denominacion: {type: String, required: true}
});

export default mongoose.model("RolesUsuarios", RolesUsuariosSchema);