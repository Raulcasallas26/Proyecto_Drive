import UsuariosModel from "../models/Usuarios.js"
import bcrypt from "bcrypt"

const httpUsuarios = { 
    getUsuarios: async (req, res) => {
        try {
            const Usuarios = await UsuariosModel.find();
            res.status(200).json({ Usuarios });
        } catch ( error ) {
            res.status(500).json({ mensaje: "Error al obtener los Usuarios", error })
        }
    },

    // getUsuariosId: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const instructor = await InstrutoresModel.findOne({ id });
    //         res.json({ instructor })
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al obtener la formacion", error })
    //     }
    // },

    postUsuarios: async ( req, res ) => {
        const {nombre, apellidos, cedula, telefono, email, password, perfilProfesional, curriculum, estado, idRolUsuario, idRedConocimiento} = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10); 
            const usuario = new UsuariosModel({
                nombre, 
                apellidos,
                cedula,
                telefono,
                email,
                password:hashedPassword,
                perfilProfesional,
                curriculum,
                estado,
                idRolUsuario,
                idRedConocimiento
            });
            await usuario.save();
            res.json({
                mensaje: "Un usuario insertado!!",
                usuario
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar al instructor", error });
        } 
    },

    putUsuarios: async (req, res) => {
        const { id } = req.params;
        const { nombre, apellidos, cedula, telefono, email, password, perfilProfesional, curriculum, idRolUsuario, idRedConocimiento} = req.body;
        const usuario = await UsuariosModel.findByIdAndUpdate(id, 
            {nombre, 
            apellidos, 
            cedula, 
            telefono, 
            email, 
            password, 
            perfilProfesional, 
            curriculum, 
            idRolUsuario, 
            idRedConocimiento}, { new: true })
        res.json({
            msg: "ok",
            usuario
        })
    },

    putUsuariosEstado: async (req, res) => {
            const { id } = req.params  
            const usu = await UsuariosModel.findById(id)
            let usuario = null
            if (usu.estado) {
                usuario = await UsuariosModel.findByIdAndUpdate(id, { estado: false })
            } else {
                usuario = await UsuariosModel.findByIdAndUpdate(id, { estado: true })
            }
            const usuarioAutenticado = req.usuario
            res.json({
                msj: "fue cambiado el estado",
                usuario,
                usuarioAutenticado
            }) 
        },
}

export default httpUsuarios