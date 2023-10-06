import RegistroCalificadoModel from "../models/RegistroCalificado.js"

const httpRegistroCalificado = {
    getRegistroCalificado: async (req, res) => {
        try {
            const RegistroCalificado = await RegistroCalificadoModel.find({});
            res.json({ RegistroCalificado });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los registro calificado", error });
        }
    },

    // getRegistroCalificadoId: async (req, res) => {
    //     const { id } = req.params;

    //     try {
    //         const RegistroCalificado = await RegistroCalificadoModel.findOne({ id });
    //         res.json({ RegistroCalificado })
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al obtener los registro calificados", error });
    //     }
    // },

    postRegistroCalificado: async (req, res) => {
        const { titulo, lugarDesarrollo, metodologia, creditos, codigoSnies, fecha, documentos } = req.body;
        const RegistroCalificado = new RegistroCalificadoModel({
            titulo,
            lugarDesarrollo,
            metodologia,
            creditos,
            codigoSnies,
            fecha,
            documentos
        });

        try {
            const nuevoRegistroCalificado = await RegistroCalificado.save();

            res.json({
                mensaje: "Una  registro calificado!!",
                RegistroCalificado: nuevoRegistroCalificado
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al ingresar registro calificado", error });
        }
    },

    putRegistroCalificado: async (req, res) => {
        const { id } = req.params.id;
        const { titulo, lugarDesarrollo, metodologia, creditos, codigoSnies, fecha, documentos } = req.body;

        try {

            const RegistroCalificadoActualizado = await RegistroCalificadoModel.findOneAndUpdate(
                { id },
                { $set: { titulo, lugarDesarrollo, metodologia, creditos, codigoSnies, fecha, documentos } },
                { new: true }
            );

            if (RegistroCalificadoActualizado) {
                res.json({
                    mensaje: "Registro modificado exitosamente",
                    RegistroCalificado: RegistroCalificadoActualizado
                });
            } else {
                res.json({ mensaje: "No se encontro los  registro calificados" })
            }
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar los registros calificados" })
        }
    }

}

export default httpRegistroCalificado