import UsuariosModel from "../models/Usuarios.js"
import bcrypt from "bcrypt"
import url from "url"
import path from "path"
import { v2 as cloudinary } from "cloudinary"

const httpUsuarios = {
    getUsuarios: async (req, res) => {
        try {
            const Usuarios = await UsuariosModel.find({})
            res.status(200).json({ Usuarios });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los Usuarios", error })
        }
    },

    postUsuarios: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        try {
            const {
                nombre, apellidos, cedula, telefono, email, password, perfilProfesional, RolUsuario, RedConocimiento
            } = req.body;
            const { curriculum } = req.files;
            if (curriculum) {
                const extension = curriculum.name.split(".").pop();
                const { tempFilePath } = curriculum;
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    width: 250,
                    crop: "limit",
                    resource_type: "raw",
                    allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
                    format: extension,
                });
                const buscar = await UsuariosModel.findOne({ cedula: cedula });
                if (buscar) {
                    return res.status(404).json({
                        msg: ` Se encontró un UsuariosModel con el código ${cedula} en esta red`
                    });
                } else {
                    const nuevoUsuario = new UsuariosModel({
                        nombre: nombre,
                        apellidos: apellidos,
                        cedula: cedula,
                        telefono: telefono,
                        email: email,
                        password: password,
                        perfilProfesional: perfilProfesional,
                        curriculum: result.url,
                        RolUsuario: RolUsuario,
                        RedConocimiento: RedConocimiento
                    });

                    const salt = bcrypt.genSaltSync();
                    nuevoUsuario.password = bcrypt.hashSync(req.body.password, salt);
                    const UsuarioCreado = await nuevoUsuario.save();
                    res.status(201).json(UsuarioCreado);
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    },

    putUsuarios: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        try {
            const { id } = req.params;
            const {
                nombre, apellidos, cedula, telefono, email, password, perfilProfesional, RolUsuario, RedConocimiento
            } = req.body;


            const buscarCodigo = await UsuariosModel.findOne({ cedula: cedula });
            if (buscarCodigo && buscarCodigo._id.toString() !== id) {
                return res
                    .status(404)
                    .json({ msg: "Ya se encuentra un Usuario registrado con ese codigo" });
            };

            let updatedData = {
                nombre: nombre,
                apellidos: apellidos,
                cedula: cedula,
                telefono: telefono,
                email: email,
                password: password,
                perfilProfesional: perfilProfesional,
                RolUsuario: RolUsuario,
                RedConocimiento: RedConocimiento
            };

            if (req.files && req.files.curriculum) {
                const curriculum = req.files.curriculum;
                const extension = curriculum.name.split(".").pop();
                const { tempFilePath } = curriculum;
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    width: 250,
                    crop: "limit",
                    resource_type: "raw",
                    allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
                    format: extension,
                });

                const buscar = await UsuariosModel.findById(id);

                if (buscar.curriculum) {
                    const nombreTemp = buscar.curriculum.split("/");
                    const nombrecurriculum = nombreTemp[nombreTemp.length - 1];
                    const [public_id] = nombrecurriculum.split(".");
                    await cloudinary.uploader.destroy(public_id);
                };

                updatedData.curriculum = result.url;
            };


            const buscarUsuario = await UsuariosModel.findByIdAndUpdate(
                { _id: id },
                { $set: updatedData },
                { new: true }
            );
            res.status(201).json(buscarUsuario);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
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
//     const sendEmail = async (email, subject, body) => {
//         try {
//             let pass = process.env.FROM_EMAIL_2FA;
//             const transporter = nodemailer.createTransport({
//                 host: "smtp.gmail.com",
//                 port: 465,
//                 secure: true,
//                 auth: {
//                     user: process.env.FROM_EMAIL,
//                     pass, // naturally, replace both with your real credentials or an application-specific password
//                 },
//             });

//             const options = () => {
//                 return {
//                     from: "Multichap" < ${ process.env.FROM_EMAIL }> ,
//                         to: email,
//                             subject: subject,
//                                 text: body
//             };
//         };

//         // Send email
//         transporter.sendMail(options(), (error, info) => {
//             if (error) {
//                 return error;
//             } else {
//                 return res.status(200).json({
//                     success: true,
//                 });
//             }
//         });
//     } catch(error) {

//         return error;
//     }
// };
}

export default httpUsuarios