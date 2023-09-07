import AmbientesFormacionModel from "../models/AmbientesFormacion.js"
import bcryptjs from "bcryptjs"


const httpAmbientesFormacion = {
    getAmbientesFormacion: async (req, res) => {
        try {
            const AmbientesFormacion = await AmbientesFormacionModel.find({});
            res.json({ AmbientesFormacion });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener infotmacion del ambiente", error })
        }
    },

    getAmbientesFormacionId: async (req, res) => {
        const { id } = req.params;
        try {
            const AmbientesFormacion = await AmbientesFormacionModel.findOne({ id });
            res.json({ AmbientesFormacion })
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener informacion", error })
        }
    },

    postAmbientesFormacion: async (req, res) => {
        const { id, codigo, nombre, tipo, descripcion, documentos, idCentroDeFormacion } = req.body;
        const AmbientesFormacion = new AmbientesFormacionModel({
            id,
            codigo,
            nombre,
            tipo,
            descripcion,
            documentos,
            idCentroDeFormacion
        });

        try {
            const nuevoAmbientesFormacion = await AmbientesFormacion.save();

            res.json({
                mensaje: "Un ambiente insertado!!",
                nuevoAmbientesFormacion
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar el ambiente", error });
        }
    },

    putAmbientesFormacion: async (req, res) => {
        const { id } = req.params;
        const { codigo, nombre, tipo, descripcion, documentos, idCentroDeFormacion } = req.body;
        const Ambiente_Formacion = await Ambiente_FormacionModel.findByIdAndUpdate(id, { codigo, nombre, tipo, descripcion, documentos, idCentroDeFormacion }, { new: true })
        res.json({
            msg: "ok",
            AmbientesFormacion
        })
    },

    putAmbientesFormacionEstado: async (req, res) => {
        const { id } = req.params;

        try {

            const AmbientesFormacion = await AmbientesFormacionModel.findOne({ id });

            if (!AmbientesFormacion) {
                return res.status(400).json({ mensaje: "Ambiente no encontrado" });
            }

            AmbientesFormacion.estado = !AmbientesFormacion.estado

            await AmbientesFormacion.save();

            const estadoMensaje = AmbientesFormacion.estado ? "Activo" : "Inactivo";

            res.json({
                mensaje: `Estado de la formacion modificada a  ${estadoMensaje}`,
                AmbientesFormacion: AmbientesFormacion
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al cambiar la informacion del ambiente", error })
        }
    }
}

export default httpAmbientesFormacion