import ProyectoModel from "../models/Proyectos.js"
import bcrypt from "bcrypt"

const httpProyecto = { 
    getProyecto: async (req, res) => {
        try {
            const Proyecto = await ProyectoModel.find();
            res.status(200).json({ Proyecto });
        } catch ( error ) {
            res.status(500).json({ mensaje: "Error al obtener los Proyecto", error })
        }
    },

    // getProyectoId: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const instructor = await InstrutoresModel.findOne({ id });
    //         res.json({ instructor })
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al obtener la formacion", error })
    //     }
    // },

    postProyecto: async ( req, res ) => {
        const {nombre, codigo, descripcion, version, documento} = req.body;
        try {
            const proyecto = new ProyectoModel({
                nombre,
                codigo, 
                descripcion, 
                version, 
                documento
            });
            await proyecto.save();
            res.json({
                mensaje: "Un proyecto insertado!!",
                proyecto
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar el Proyecto", error });
        } 
    },

    putProyecto: async (req, res) => {
        const { id } = req.params;
        const { nombre, apellidos, cedula, telefono, email, password, perfilProfesional, curriculum, idRolUsuario, idRedConocimiento} = req.body;
        const usuario = await ProyectoModel.findByIdAndUpdate(id, {nombre, apellidos, cedula, telefono, email, password, perfilProfesional, curriculum, idRolUsuario, idRedConocimiento}, { new: true })
        res.json({
            msg: "ok",
            usuario
        })
    },

    putProyectoEstado: async (req, res) => {
            const { id } = req.params  
            const usu = await ProyectoModel.findById(id)
            let usuario = null
            if (usu.estado) {
                usuario = await ProyectoModel.findByIdAndUpdate(id, { estado: false })
            } else {
                usuario = await ProyectoModel.findByIdAndUpdate(id, { estado: true })
            }
            const usuarioAutenticado = req.usuario
            res.json({
                msj: "fue cambiado el estado",
                usuario,
                usuarioAutenticado
            }) 
        },
}

export default httpProyecto