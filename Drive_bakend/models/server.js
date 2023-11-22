import express from "express"
import mongoose from "mongoose"
import fileUpload from 'express-fileupload';
import color from "../routes/color.js";
import login from "../routes/login.js";
import usuarios from "../routes/Usuarios.js";
import ciudades from "../routes/Ciudades.js";
import proyecto from "../routes/Proyectos.js";
import GuiasAprendiz from "../routes/GuiasAprendiz.js";
import RolesUsuarios from "../routes/RolesUsuarios.js";
import investigacion from "../routes/Investigaciones.js"
import MaterialesApoyo from "../routes/MaterialesApoyo.js";
import materialesforma from "../routes/materialesforma.js";
import NivelesFormacion from "../routes/Nivel_Formacion.js";
import CentrosFormacion from "../routes/CentrosFormacion.js";
import RedesConocimiento from "../routes/RedesConocimiento.js";
import AmbientesFormacion from "../routes/AmbientesFormacion.js";
import ProgramasFormacion from "../routes/ProgramasFormacion.js";
import RegistroCalificado from "../routes/RegistroCalificado.js";
import retroalimentacionRed from "../routes/RetroAlimentacionRed.js"
import DesarrolloCurricular from "../routes/DesarrolloCurricular.js";
import InstrumentrosEvaluacion from "../routes/InstrumentrosEvaluacion.js";

import cors from "cors"
class Server {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
        this.conectarDB()
    }

    routes() {
        this.app.use('/color', color)
        this.app.use('/login', login);
        this.app.use('/ciudad', ciudades);
        this.app.use('/usuarios', usuarios);
        this.app.use('/Proyectos', proyecto);
        this.app.use('/GuiasAprendiz', GuiasAprendiz);
        this.app.use('/RolesUsuarios', RolesUsuarios);
        this.app.use('/investigacion', investigacion);
        this.app.use('/nivelesforma', NivelesFormacion);
        this.app.use('/MaterialesApoyo', MaterialesApoyo);
        this.app.use('/materialesforma', materialesforma);
        this.app.use('/CentrosFormmacion', CentrosFormacion);
        this.app.use('/RedesConocimiento', RedesConocimiento);
        this.app.use('/ProgramasFormacion', ProgramasFormacion);
        this.app.use('/AmbientesFormacion', AmbientesFormacion);
        this.app.use('/registroCalificado', RegistroCalificado);
        this.app.use('/retroalimentacionRed', retroalimentacionRed);
        this.app.use('/desarrolloCurricular', DesarrolloCurricular);
        this.app.use('/InstrumentosEvaluacion', InstrumentrosEvaluacion);
    }

    conectarDB() {
        mongoose.connect(process.env.MONGODB)
            .then(() => console.log('Ya esta conectado'));
    }
    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.static('public'))
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }
    escuchar() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    }

}

export default Server