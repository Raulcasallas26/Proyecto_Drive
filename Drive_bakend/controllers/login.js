import Instructores from "../models/instructores.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const inicioSesion={
    loginUser:async(req, res) => {
        const { cedula, password } = req.body; z
        try{
            const usuario = await Instructores.findOne({cedula})
            if (!usuario) {
                return res.status(401).json({msj:"esta mal la cedula"})
            }
            const poss = await bcrypt.compare(password,usuario.password)
            if (!poss) { 
                return res.status(401).json({msj:"esta mal la contraseña"})
            }
            const tockent = jwt.sign({userId:usuario._id},process.env.CLAVETOCK,{expiresIn:'1h'})
            res.status(200).json({msj:"inicio de secion con exito",tockent,usuario})
        }
        catch (error){
            res.status(500).json({msj:"Error en el servidor"})
        }
    }
}

export default inicioSesion
















    // getLogins: async (req, res) => {
    //     try {
    //         // Obtener tods los logins desde la base de datos
    //         const logins = await LoginModel.find({});
    //         res.json({ logins });
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al odtener los logins", error })
    //     }
    // },

    // getLoginCedula: async (req, res) => {
    //     const { cedula } = req.params;
    //     try {
    //         const login = await LoginModel.findOne({ cedula });
    //         res.json({ login })
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al obtener el login", error });
    //     }
    // },

    // postLogin: async (req, res) => {
    //     const { password, usuario, instructor, administrativo, gestorRed } = req.body;
    //     const login = new LoginModel ({
    //         password,
    //         usuario,
    //         instructor,
    //         administrativo,
    //         gestorRed
    //     });

    //     try {
    //         const salt = bcryptjs.genSaltSync(10);
    //         login.password = bcryptjs.hashSync(password, salt)
    //         // Guardar el nuevo login en la base de datos
    //         const nuevoLogin = await login.save();

    //         res.json({
    //             mensaje: "Un login insertado!!",
    //             login: nuevoLogin 
    //         });
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al insertar el Login", error });
    //     }
    // },

    // putLogin: async (req, res) => {
    //     const { cedula } = req.params;
    //     const { nombre, email } = req.body;

    //     try {
    //         // actualizar el login en la base de datos
    //         const loginActualizado = await LoginModel.findOneAndUpdate(
    //             { cedula },
    //             { $set: { nombre, email } },
    //             { new: true } // Devuelve el documento actualizado en la respuesta
    //         );

    //         if (loginActualizado) {
    //             res.json({
    //                 mensaje: "Registro modificado exitosamente",
    //                 admin: loginActualizado
    //             });
    //         } else{
    //             res.json({ mensaje: "No se encontro el login con la cedula proporcionada" })
    //         }
    //     } catch (error) {
    //         res.status(500).jsom({ mensaje: "Error al actualizar el login", error });
    //     }
    // },

    // putLoginEstado: async (req, res) => {
    //     const { cedula } = req.params;

    //     try {
    //         // Buscar el login por su cedula en la base de datos
    //         const login = await LoginModel.findOne({ cedula });

    //         if ( !login ) {
    //             return res.status(400).json({ mensaje: "Login no encontrado" });
    //         }

    //         // Aquie se cambia el estado del login opuesto
    //         login.estado = !login.estado;

    //         // Se guarda el login actualizado
    //         await login.save();

    //         // Se define un mensaje de estado en funsion del estado actualizado
    //         const estadoMensaje = login.estado ? "Activo" : "Inactivo";

    //         // Aqui se devuelve la respuesta con el login actualizado
    //         res.json({
    //             mensaje: `Èstado del login modificado a ${ estadoMensaje }`,
    //             login: login
    //         });
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al cambiar el estado del login", error })
    //     }
    // },


