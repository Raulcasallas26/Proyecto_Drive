import InstrumentoEvaluacionModel from "../models/InstrumentosEvaluacion.js"
import bcryptjs from "bcryptjs"


const httpInstrumentosEvaluacion = {
    getInstrumentosEvaluacion: async (req, res) => {
        try {
            const InstrumentosEvaluacion = await InstrumentoEvaluacionModel.find({});
            res.json({ InstrumentosEvaluacion });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener infotmacion de instrumentos de evaluacion", error })
        }
    },

    getInstrumentosEvaluacionId: async (req, res) => {
        const { id } = req.params;
        try {
            const InstrumentosEvaluacion = await InstrumentoEvaluacionModel.findOne({ id });
            res.json({ InstrumentosEvaluacion })
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener informacion de instrumentos de evaluacion", error })
        }
    },

    postInstrumentosEvaluacion: async (req, res) => {
        const { nombre, documento, estado } = req.body;
        const InstrumentosEvaluacion = new InstrumentoEvaluacionModel({
            nombre,
            documento,
            estado
        });

        try {
            const nuevoInstrumentosEvaluacion = await InstrumentosEvaluacion.save();

            res.json({
                mensaje: "Un instrumento de evaluacion insertado!!",
                nuevoInstrumentosEvaluacion
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar instrumento de evaluacion", error });
        }
    },

    putInstrumentosEvaluacion: async (req, res) => {
        const { id } = req.params;
        const { nombre, documento } = req.body;
        const InstrumentosEvaluacion = await InstrumentoEvaluacionModel.findByIdAndUpdate(id, { nombre, documento }, { new: true })
        res.json({
            msg: "ok",
            InstrumentosEvaluacion
        })
    },

    putInstrumentosEvaluacionEstado: async (req, res) => {
        const { id } = req.params;

        try {

            const InstrumentosEvaluacion = await InstrumentoEvaluacionModel.findOne({ id });

            if (!InstrumentosEvaluacion) {
                return res.status(400).json({ mensaje: "instrumentos de evaluacion no encontrados" });
            }

            InstrumentosEvaluacion.estado = !InstrumentosEvaluacion.estado

            await InstrumentosEvaluacion.save();

            const estadoMensaje = InstrumentosEvaluacion.estado ? "Activo" : "Inactivo";

            res.json({
                mensaje: `Estado de instrumentos de evaluacion modificado a  ${estadoMensaje}`,
                InstrumentosEvaluacion: InstrumentosEvaluacion
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al cambiar la informacion del instrumento de evaluacion", error })
        }
    }
}

export default httpInstrumentosEvaluacion