import express from "express"
import mongoose from "mongoose"

import formacion from "../routes/ProgramasFormacion.js";
import login from "../routes/login.js";
import instructores from "../routes/instructores.js";
import ambiente from "../routes/ambientes_formacion.js";
import ciudades from "../routes/Ciudades.js";
import guias from "../routes/GuiasAprendiz.js";
import instrumentos from "../routes/InstrumentrosEvaluacion.js";
import material from "../routes/MaterialesApoyo.js";
import roles from "../routes/Roles_Usuario.js";  

import cors from "cors"
class Server {   
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
        this.conectarDB()
    }

    routes() { 
        this.app.use('/formacion', formacion);
        this.app.use('/login', login) ;
        this.app.use('/instructores', instructores);
        this.app.use('/ambiente', ambiente); 
        this.app.use('/ciudad', ciudades);
        this.app.use('/guias', guias);
        this.app.use('/instrumento', instrumentos)
        this.app.use('/material', material);
        this.app.use('/roles', roles)
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