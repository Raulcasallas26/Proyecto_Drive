import ProgramasFormacionModel from "../models/ProgramasFormacion.js "

const httpProgramasFormacion = {
    getProgramasFormacion: async (req, res) => {
        try {
            const ProgramasFormacion = await ProgramasFormacionModel.find({});
            res.json({ ProgramasFormacion });
        } catch ( error ) {
            res.status(500).json({ mensaje: "Error al obtener las formaciones", error })
        }
    },

    getProgramasFormacionId: async (req, res) => {
        const { id } = req.params;
        try {
            const ProgramasFormacion = await ProgramasFormacionModel.findOne({ id });
            res.json({ ProgramasFormacion })
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener la formacion", error })
        }
    },

    postProgramasFormacion: async ( req, res ) => {
        const { denominacion, codigo, version, estado } = req.body;
        try {
            const ProgramasFormacion = new ProgramasFormacionModel({
                denominacion,
                codigo,
                version,
                estado
            });
            await ProgramasFormacion.save();

            res.json({
                mensaje: "Una formacion insertada!!",
                ProgramasFormacion
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar la formacion", error });
        }
    },

    putProgramasFormacion: async ( req, res ) => {
        const { id } = req.params;
        const { denominacion, codigo } = req.body;

        try {
            const ProgramasFormacionActualizada = await ProgramasFormacionModel.findOneAndUpdate(
                { id },
                { $set: { denominacion, codigo } },
                { new: true }
            );

            if ( ProgramasFormacionActualizada ) {
                res.json({
                    mensaje: "Registro modificado exitosamente",
                    ProgramasFormacion: ProgramasFormacionActualizada
                });
            } else {
                res.json({ mensaje: "No se encontro la formacion con el id proporcionado" })
            }
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar la formacion", error })
        }
    },

    putProgramasFormacionEstado: async ( req, res ) => {
        const { id } = req.params;

        try {
            
            const ProgramasFormacion = await ProgramasFormacionModel.findOne({id});

            if ( !ProgramasFormacion ) {
                return res.status(400).json({ mensaje: "Formacion no encontrada" });
            }

            ProgramasFormacion.estado = !ProgramasFormacion.estado

            await ProgramasFormacion.save();

            const estadoMensaje = ProgramasFormacion.estado ? "Activo" : "Inactivo";

            res.json({
                mensaje: `Estado de la formacion modificada a  ${ estadoMensaje }`,
                ProgramasFormacion
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error l cambiar el estado de la formacion", error })
        }
    }
}

export default httpProgramasFormacion