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
        const AmbientesFormacion = await AmbientesFormacionModel.findByIdAndUpdate(id,
            {
                codigo,
                nombre,
                tipo,
                descripcion,
                documentos,
                idCentroDeFormacion
            }, { new: true })
        res.json({
            msg: "ok",
            AmbientesFormacion
        })
    },

    putAmbientesFormacionEstado: async (req, res) => {
        const { id } = req.params
        const formacion = await AmbientesFormacionModel.findById(id)
        let Amnbiente = null
        if (formacion.estado) {
            Amnbiente = await AmbientesFormacionModel.findByIdAndUpdate(id, { estado: false })
        } else {
            Amnbiente = await AmbientesFormacionModel.findByIdAndUpdate(id, { estado: true })
        }
        const AmnbienteAutenticado = req.Amnbiente
        res.json({
            msj: "fue cambiado el estado",
            Amnbiente,
            AmnbienteAutenticado
        })
    },
}

export default httpAmbientesFormacion