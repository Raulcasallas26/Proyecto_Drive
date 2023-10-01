import ProgramasFormacionModel from "../models/ProgramasFormacion.js ";

const httpProgramasFormacion = {
    getProgramasFormacion: async (req, res) => {
        try {
            const ProgramasFormacion = await ProgramasFormacionModel.find();
            res.json({ ProgramasFormacion });
        } catch (error) {
            res
                .status(500)
                .json({ mensaje: "Error al obtener las formaciones", error });
        }
    },

    // getProgramasFormacionId: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const ProgramasFormacion = await ProgramasFormacionModel.findOne({ id });
    //         res.json({ ProgramasFormacion })
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al obtener la formacion", error })
    //     }
    // },

    postProgramasFormacion: async (req, res) => {
        const { denominacion, codigo, version, estado, niveldeformacion, archivoOEnlace } =
            req.body;
        try {
            const ProgramasFormacion = new ProgramasFormacionModel({
                denominacion,
                codigo,
                version,
                estado,
                niveldeformacion,
                archivoOEnlace,
            });
            await ProgramasFormacion.save();

            res.json({
                mensaje: "Una formacion insertada!!",
                ProgramasFormacion,
            });
        } catch (error) {
            res
                .status(500)
                .json({ mensaje: "Error al insertar la formacion", error });
        }
    },

    putProgramasFormacion: async (req, res) => {
        const { id } = req.params;
        const { denominacion, codigo, version, estado, niveldeformacion, archivoOEnlace } =
            req.body;
        const programas = await ProgramasFormacionModel.findByIdAndUpdate(
            id,
            { denominacion, codigo, version, estado, niveldeformacion, archivoOEnlace },
            { new: true }
        );
        res.json({
            msg: "ok",
            programas,
        });
    },

    putProgramaEstado: async (req, res) => {
        const { id } = req.params;
        const formacion = await ProgramasFormacionModel.findById(id);
        let programa = null;
        if (formacion.estado) {
            programa = await ProgramasFormacionModel.findByIdAndUpdate(id, {
                estado: false,
            });
        } else {
            programa = await ProgramasFormacionModel.findByIdAndUpdate(id, {
                estado: true,
            });
        }
        const programaAutenticado = req.programa;
        res.json({
            msj: "fue cambiado el estado",
            programa,
            programaAutenticado,
        });
    },
};

export default httpProgramasFormacion;
