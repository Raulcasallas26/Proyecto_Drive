import InstrutoresModel from "../models/instructores.js"
import bcryptjs from "bcryptjs"


const httpInstructores = {
    getInstructores: async (req, res) => {
        try {
            const instructores = await InstrutoresModel.find({});
            res.json({ instructores });
        } catch ( error ) {
            res.status(500).json({ mensaje: "Error al obtener las formaciones", error })
        }
    },

    getInstructoresId: async (req, res) => {
        const { id } = req.params;
        try {
            const instructor = await InstrutoresModel.findOne({ id });
            res.json({ instructor })
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener la formacion", error })
        }
    },

    postInstructores: async ( req, res ) => {
        const { id, nombres, apellidos, numeroIdentificacion, telefono, email, password, perfilProfesional, curriculum, estado, idRolUsuario, idRedConocimiento} = req.body;
        const instructor = new InstrutoresModel({
            id,
            nombres,
            apellidos,
            numeroIdentificacion,
            telefono,
            email,
            password,
            perfilProfesional,
            curriculum,
            estado,
            idRolUsuario,
            idRedConocimiento
        });

        try {
            const nuevoInstructor = await instructor.save();

            res.json({
                mensaje: "Un instructor insertado!!",
                nuevoInstructor
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar al instructor", error });
        } 
    },

    putInstructores: async ( req, res ) => {
        const { id } = req.params;
        const { instructor, cedula} = req.body;

        try {
            const instructorActualizado = await InstrutoresModel.findOneAndUpdate(
                { id },
                { $set: { instructor, cedula } },
                { new: true }
            );

            if ( instructorActualizado ) {
                res.json({
                    mensaje: "Registro modificado exitosamente",
                    instructor: instructorActualizado
                });
            } else {
                res.json({ mensaje: "No se encontro el instructor con la cedula ingresada" })
            }
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar la formacion", error })
        }
    },

    putInstructoresEstado: async ( req, res ) => {
        const { id } = req.params;

        try {
            
            const instructor = await InstrutoresModel.findOne({id});

            if ( !instructor ) {
                return res.status(400).json({ mensaje: "Formacion no encontrada" });
            }

            instructor.estado = !instructor.estado

            await instructor.save();

            const estadoMensaje = instructor.estado ? "Activo" : "Inactivo";

            res.json({
                mensaje: `Estado de la formacion modificada a  ${ estadoMensaje }`,
                instructor: instructor
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al cambiar la informacion del instructor", error })
        }
    }
}

export default httpInstructores