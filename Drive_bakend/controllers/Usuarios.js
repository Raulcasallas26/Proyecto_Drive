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
        const { id, nombre, apellidos, cedula, telefono, email, password, perfilProfesional, curriculum, estado, idRolUsuario, idRedConocimiento} = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10); 
            const usuario = new UsuariosModel({
                id,
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
            const nuevoUsuario = await usuario.save();
            res.json({
                mensaje: "Un usuario insertado!!",
                nuevoUsuario
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar al instructor", error });
        } 
    },

    putUsuarios: async ( req, res ) => {
        const { id } = req.params;
        const { codigo, nombre, fase, documento, idInstrumentosEvaluacion, idMaterialApoyo } = req.body;
        const GuiasAprendiz = await GuiasAprendizModel.findByIdAndUpdate(id, { codigo, nombre, fase, documento, idInstrumentosEvaluacion, idMaterialApoyo }, { new: true })
        res.json({
            msg: "ok",
            GuiasAprendiz
        })
    },

    putUsuariosEstado: async ( req, res ) => {
        const { id } = req.params;

        try {
            
            const usuario = await InstrutoresModel.findOne({id});

            if ( !usuario ) {
                return res.status(400).json({ mensaje: "Formacion no encontrada" });
            }

            usuario.estado = !usuario.estado

            await usuario.save();

            const estadoMensaje = usuario.estado ? "Activo" : "Inactivo";

            res.json({
                mensaje: `Estado de la formacion modificada a  ${ estadoMensaje }`,
                usuario: usuario
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al cambiar la informacion del usuario", error })
        }
    }
}

export default httpUsuarios