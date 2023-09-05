import Ambiente_FormacionModel from "../models/ambientes_formacion.js"
import bcryptjs from "bcryptjs"


const httpAmbiente_Formacion = {
    getAmbiente_Formacion: async (req, res) => {
        try {
            const Ambiente_Formacion = await Ambiente_FormacionModel.find({});
            res.json({ Ambiente_Formacion });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener infotmacion del ambiente", error })
        }
    },

    getAmbiente_FormacionId: async (req, res) => {
        const { id } = req.params;
        try {
            const Ambiente_Formacion = await Ambiente_FormacionModel.findOne({ id });
            res.json({ Ambiente_Formacion })
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener informacion", error })
        }
    },

    postAmbiente_Formacion: async (req, res) => {
        const { id, codigo, nombre, tipo, descripcion, documentos, idCentroDeFormacion } = req.body;
        const Ambiente_Formacion = new Ambiente_FormacionModel({
            id,
            codigo,
            nombre,
            tipo,
            descripcion,
            documentos,
            idCentroDeFormacion
        });

        try {
            const nuevoAmbiente_Formacion = await Ambiente_Formacion.save();

            res.json({
                mensaje: "Un ambiente insertado!!",
                nuevoAmbiente_Formacion
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar el ambiente", error });
        }
    },

    putAmbiente_Formacion: async (req, res) => {
        const { id } = req.params;
        const { codigo, nombre, tipo, descripcion, documentos, idCentroDeFormacion } = req.body;
        const Ambiente_Formacion = await Ambiente_FormacionModel.findByIdAndUpdate(id, { codigo, nombre, tipo, descripcion, documentos, idCentroDeFormacion }, { new: true })
        res.json({
            msg: "ok",
            Ambiente_Formacion
        })
    },

    putAmbiente_FormacionEstado: async (req, res) => {
        const { id } = req.params;

        try {

            const Ambiente_Formacion = await Ambiente_FormacionModel.findOne({ id });

            if (!Ambiente_Formacion) {
                return res.status(400).json({ mensaje: "Ambiente no encontrado" });
            }

            Ambiente_Formacion.estado = !Ambiente_Formacion.estado

            await Ambiente_Formacion.save();

            const estadoMensaje = Ambiente_Formacion.estado ? "Activo" : "Inactivo";

            res.json({
                mensaje: `Estado de la formacion modificada a  ${estadoMensaje}`,
                Ambiente_Formacion: Ambiente_Formacion
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al cambiar la informacion del ambiente", error })
        }
    }
}

export default httpAmbiente_Formacion