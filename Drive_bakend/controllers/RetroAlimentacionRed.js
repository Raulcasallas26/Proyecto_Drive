import RetroAlimentacionRedModel from "../models/RetroAlimentacionRed.js"

const httpRetroAlimentacionRed = {
    getRetroAlimentacionRed: async (req, res) => {
        try {
            const RetroAlimentacionRed = await RetroAlimentacionRedModel.find({});
            res.json({ RetroAlimentacionRed });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener la red", error });
        }
    },

    getRetroAlimentacionRedId: async (req, res) => {
        const { id } = req.params;

        try {
            const RetroAlimentacionRed = await RetroAlimentacionRedModel.findOne({ id });
            res.json({ RetroAlimentacionRed })
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener la retro alimentacion o la red", error });
        }
    },

    postRetroAlimentacionRed: async (req, res) => {
        const { codigo, nombre, codigoFicha, descripcion, documentos, idprograma } = req.body;
        const RetroAlimentacionRed = new RetroAlimentacionRedModel({
            codigo,
            nombre,
            codigoFicha,
            descripcion,
            documentos,
            idprograma
        });

        try {
            const nuevoRetroAlimentacionRed = await RetroAlimentacionRed.save();

            res.json({
                mensaje: "Una red insertada!!",
                RetroAlimentacionRed: nuevoRetroAlimentacionRed
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al ingresar la red", error });
        }
    },

    putRetroAlimentacionRed: async (req, res) => {
        const { id } = req.params.id;
        const { nombre, codigoFicha, descripcion, fecha, documentos, idprograma } = req.body;

        try {

            const RetroAlimentacionRedActualizado = await RetroAlimentacionRedModel.findOneAndUpdate(
                { id },
                { $set: { nombre, codigoFicha, descripcion, fecha, documentos, idprograma } },
                { new: true }
            );

            if (RetroAlimentacionRedActualizado) {
                res.json({
                    mensaje: "Registro modificado exitosamente",
                    RetroAlimentacionRed: RetroAlimentacionRedActualizado
                });
            } else {
                res.json({ mensaje: "No se encontro la retro alimentacion de la red" })
            }
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar la retro alimentacion de la red" })
        }
    },

    putRetroalimentacionRedEstado: async (req, res) => {
        const { id } = req.params  
        const red = await RetroAlimentacionRedModel.findById(id)
        let Retroalimentacion = null
        if (red.estado) {
            Retroalimentacion = await RetroAlimentacionRedModel.findByIdAndUpdate(id, { estado: false })
        } else {
            Retroalimentacion = await RetroAlimentacionRedModel.findByIdAndUpdate(id, { estado: true })
        }
        const RetroalimentacionAutenticado = req.Retroalimentacion
        res.json({
            msj: "fue cambiado el estado",
            Retroalimentacion,
            RetroalimentacionAutenticado
        }) 
    },
}

export default httpRetroAlimentacionRed