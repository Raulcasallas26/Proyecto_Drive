import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    denominacion: {type: String, required: true}
});

export default mongoose.model("Roles", rolesSchema);