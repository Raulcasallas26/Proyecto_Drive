import mongoose from "mongoose";

const MaterialesApoyoSchema = new mongoose.Schema({
    nombre:{type:String},
    documento:{type:String},
}) 

export default mongoose.model("MaterialesApoyo", MaterialesApoyoSchema)