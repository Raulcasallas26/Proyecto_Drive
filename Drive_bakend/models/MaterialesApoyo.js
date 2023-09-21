import mongoose from "mongoose";

const MaterialesApoyoSchema = new mongoose.Schema({
    id: {type: String},
    nombre:{type:String},
    documento:{type:String},
})

export default mongoose.model("MaterialesApoyo", MaterialesApoyoSchema)