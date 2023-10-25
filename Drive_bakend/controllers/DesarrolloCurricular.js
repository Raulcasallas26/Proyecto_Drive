import DesarrolloCurricularModel from "../models/DesarrolloCurricular.js"

const httpDesarrollo = {
    getDesarrollo: async (req, res) => {
        try {
            const Desarrollo = await DesarrolloCurricularModel.find();
            res.status(200).json({ Desarrollo });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los Desarrollo", error })
        }
    },

    // getDesarrolloId: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const instructor = await InstrutoresModel.findOne({ id });
    //         res.json({ instructor })
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al obtener la formacion", error })
    //     }
    // },

    postDesarrollo: async (req, res) => {
        const { guiasAprendizaje, matrizCorrelacion, proyectoFormativo, planeacionPedagogica } = req.body;
        try {
            const Desarrollo = new DesarrolloCurricularModel({
                guiasAprendizaje,
                matrizCorrelacion,
                proyectoFormativo,
                planeacionPedagogica
            });
            await Desarrollo.save();
            res.json({
                mensaje: "Un Desarrollo insertado!!",
                Desarrollo
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar el Desarrollo", error });
        }
    },

    putDesarrollo: async (req, res) => {
        const { id } = req.params;
        const { guiasAprendizaje, matrizCorrelacion, proyectoFormativo, planeacionPedagogica } = req.body;
        const Desarrollo = await DesarrolloCurricularModel.findByIdAndUpdate(id,
            {
                guiasAprendizaje,
                matrizCorrelacion,
                proyectoFormativo,
                planeacionPedagogica
            }, { new: true })
        res.json({
            msg: "ok",
            Desarrollo,
        })
    },

    putDesarrolloEstado: async (req, res) => {
        const { id } = req.params
        const usu = await DesarrolloCurricularModel.findById(id)
        let Desarrollo = null
        if (usu.estado) {
            Desarrollo = await DesarrolloCurricularModel.findByIdAndUpdate(id, { estado: false })
        } else {
            Desarrollo = await DesarrolloCurricularModel.findByIdAndUpdate(id, { estado: true })
        }
        const DesarrolloAutenticado = req.Desarrollo
        res.json({
            msj: "fue cambiado el estado",
            Desarrollo,
            DesarrolloAutenticado
        })
    },
}

export default httpDesarrollo