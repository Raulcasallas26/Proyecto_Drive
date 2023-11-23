import mongoose from "mongoose";

const ProyectoSchema = new mongoose.Schema({
    nombre:{type:String, require:true},
    descripcion:{type:String, require:true},
    version:{type:String, require:true},
    documento:{type:String, require:true},
    Programa:{type:String, require:true},
    estado:{type: Boolean, default: true},
    fecha:{type:String, default: Date.now.toString()},  
});
// Pre-hook para formatear la fecha actual como cadena antes de guardar
ProyectoSchema.pre('save', function (next) {
    this.fecha = new Date().toISOString(); // Formatear la fecha actual como cadena ISO
    next();
});

export default mongoose.model("proyec", ProyectoSchema)