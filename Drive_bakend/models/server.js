import express from "express"
import mongoose from "mongoose"

import ProgramasFormacion from "../routes/ProgramasFormacion.js";
import login from "../routes/login.js";
import usuarios from "../routes/Usuarios.js";
import AmbientesFormacion from "../routes/AmbientesFormacion.js";
import ciudades from "../routes/Ciudades.js";
import GuiasAprendiz from "../routes/GuiasAprendiz.js";
import InstrumentrosEvaluacion from "../routes/InstrumentrosEvaluacion.js";
import MaterialesApoyo from "../routes/MaterialesApoyo.js";
import RolesUsuarios from "../routes/RolesUsuarios.js";  
import CentrosFormacion from "../routes/CentrosFormacion.js" 
import RedesConocimiento from "../routes/RedesConocimiento.js"

import cors from "cors"
class Server {   
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
        this.conectarDB()
    }

    routes() { 
        this.app.use('/ProgramasFormacion', ProgramasFormacion);
        this.app.use('/login', login) ;
        this.app.use('/usuarios',usuarios );
        this.app.use('/AmbientesFormacion', AmbientesFormacion); 
        this.app.use('/ciudad', ciudades);
        this.app.use('/GuiasAprendiz', GuiasAprendiz);
        this.app.use('/InstrumentosEvaluacion', InstrumentrosEvaluacion)
        this.app.use('/MaterialesApoyo', MaterialesApoyo);
        this.app.use('/RolesUsuarios', RolesUsuarios);
        this.app.use('/CentrosFormmacion',CentrosFormacion);
        this.app.use('/RedesConocimiento',RedesConocimiento)
    }

    conectarDB() {
        mongoose.connect(process.env.MONGODB)
        .then(() => console.log('Ya esta conectado'));
    }
    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.static('public'))
    }
    escuchar() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    }
    
}

export default Server