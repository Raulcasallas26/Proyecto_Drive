import GuiasAprendizModel from "../models/GuiasAprendiz.js"
import bcryptjs from "bcryptjs"


const httpGuiasAprendiz = {
    getGuiasAprendiz: async (req, res) => {
        try {
            const GuiasAprendiz = await GuiasAprendizModel.find({})
            res.json( GuiasAprendiz );
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener infotmacion de las guias del aprendiz", error })
        }
    },

    getGuiasAprendizId: async (req, res) => {
        const { id } = req.params;
        try {
            const GuiasAprendiz = await GuiasAprendizModel.findOne({ id });
            res.json({ GuiasAprendiz })
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener informacion de las guias del aprendiz", error })
        }
    },

    postGuiasAprendiz: async (req, res) => {
        const { codigo, nombre, fase, documento, idInstrumentosEvaluacion, idMaterialApoyo, estado } = req.body;
        const GuiasAprendiz = new GuiasAprendizModel({
            codigo,
            nombre, 
            fase,
            documento,
            idInstrumentosEvaluacion,
            idMaterialApoyo,
            estado
        });

        try {
            const nuevoGuiasAprendiz = await GuiasAprendiz.save();

            res.json({
                mensaje: "Una guia de aprendiz insertado!!",
                nuevoGuiasAprendiz
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar las guias del aprendiz", error });
        }
    },

    putGuiasAprendiz: async (req, res) => {
        const { id } = req.params;
        const { codigo, nombre, fase, documento, idInstrumentosEvaluacion, idMaterialApoyo } = req.body;
        const GuiasAprendiz = await GuiasAprendizModel.findByIdAndUpdate(id, { codigo, nombre, fase, documento, idInstrumentosEvaluacion, idMaterialApoyo }, { new: true })
        res.json({
            msg: "ok",
            GuiasAprendiz
        })
    },

    putGuiasAprendizEstado: async (req, res) => {
        const { id } = req.params;

        try {

            const GuiasAprendiz = await GuiasAprendizModel.findOne({ id });

            if (!GuiasAprendiz) {
                return res.status(400).json({ mensaje: "guias de aprendiz no encontrados" });
            }

            GuiasAprendiz.estado = !GuiasAprendiz.estado

            await GuiasAprendiz.save();

            const estadoMensaje = GuiasAprendiz.estado ? "Activo" : "Inactivo";

            res.json({
                mensaje: `Estado de guias de aprendiz modificado a  ${estadoMensaje}`,
                GuiasAprendiz: GuiasAprendiz
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al cambiar la informacion de las guias de aprendiz", error })
        }
    }
}

export default httpGuiasAprendiz