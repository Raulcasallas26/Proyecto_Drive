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

    // postRegistroCalificado: async (req, res) => {
    //     const { titulo, lugarDesarrollo, metodologia, creditos, codigoSnies, fecha, documentos } = req.body;
    //     const RegistroCalificado = new RegistroCalificadoModel({
    //         titulo,
    //         lugarDesarrollo,
    //         metodologia,
    //         creditos,
    //         codigoSnies,
    //         fecha,
    //         documentos
    //     });

    //     try {
    //         const nuevoRegistroCalificado = await RegistroCalificado.save();

    //         res.json({
    //             mensaje: "Una  registro calificado!!",
    //             RegistroCalificado: nuevoRegistroCalificado
    //         });
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al ingresar registro calificado", error });
    //     }
    // },

    putRegistroCalificado: async (req, res) => {
        const { id } = req.params;
        const { titulo, lugarDesarrollo, metodologia, creditos, codigoSnies, fecha, documentos } = req.body;
        const registro = await RegistroCalificadoModel.findByIdAndUpdate(id, {
            titulo,
            lugarDesarrollo,
            metodologia,
            creditos,
            codigoSnies,
            fecha,
            documentos
        }, { new: true })
        res.json({
            msg: "ok",
            registro,
        })
    }

}

export default httpRegistroCalificado