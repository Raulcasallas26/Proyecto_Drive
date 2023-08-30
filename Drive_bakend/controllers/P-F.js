import Prog_formacionModel from "../models/P-F.js"
import bcryptjs from "bcryptjs"


const httpFormacion = {
    getFormaciones: async (req, res) => {
        try {
            const formaciones = await Prog_formacionModel.find({});
            res.json({ formaciones });
        } catch ( error ) {
            res.status(500).json({ mensaje: "Error al obtener las formaciones", error })
        }
    },

    getFormacionId: async (req, res) => {
        const { id } = req.params;
        try {
            const formacion = await Prog_formacionModel.findOne({ id });
            res.json({ formacion })
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener la formacion", error })
        }
    },

    postFormacion: async ( req, res ) => {
        const { id, denominacion, codigo, version, estado } = req.body;
        const formacion = new Prog_formacionModel({
            id,
            denominacion,
            codigo,
            version,
            estado
        });

        try {
            const nuevaFormacion = await formacion.save();

            res.json({
                mensaje: "Una formacion insertada!!",
                formacion: nuevaFormacion
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar la formacion", error });
        }
    },

    putFormacion: async ( req, res ) => {
        const { id } = req.params;
        const { denominacion, codigo } = req.body;

        try {
            const formacionActualizada = await Prog_formacionModel.findOneAndUpdate(
                { id },
                { $set: { denominacion, codigo } },
                { new: true }
            );

            if ( formacionActualizada ) {
                res.json({
                    mensaje: "Registro modificado exitosamente",
                    formacion: formacionActualizada
                });
            } else {
                res.json({ mensaje: "No se encontro la formacion con el id proporcionado" })
            }
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar la formacion", error })
        }
    },

    putFormacionEstado: async ( req, res ) => {
        const { id } = req.params;

        try {
            
            const formacion = await Prog_formacionModel.findOne({id});

            if ( !formacion ) {
                return res.status(400).json({ mensaje: "Formacion no encontrada" });
            }

            formacion.estado = !formacion.estado

            await formacion.save();

            const estadoMensaje = formacion.estado ? "Activo" : "Inactivo";

            res.json({
                mensaje: `Estado de la formacion modificada a  ${ estadoMensaje }`,
                formacion: formacion
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error l cambiar el estado de la formacion", error })
        }
    }
}

export default httpFormacion