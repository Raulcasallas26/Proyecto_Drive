import RedesConocimientoModel from "../models/RedesConocimiento.js"

const httpRedesConocimiento = {
    getRedesConocimiento: async (req, res) => {
        try {
            const RedesConocimiento = await RedesConocimientoModel.find({});
            res.json({ RedesConocimiento });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener las redes de conocimiento", error })
        }
    },

    // getRedesConocimientoId: async (req, res) => {
    //     const { id } = req.params;

    //     try {
    //         const RedesConocimiento = await RedesConocimientoModel.findOne({ id });
    //         res.json({ RedesConocimiento })
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al obtener las redes de conocimiento con el id proporcionado", error });
    //     }
    // },

    postRedesConocimiento: async (req, res) => {
        const { denominacion, codigo } = req.body;
        try {
            const red = new RedesConocimientoModel({
                denominacion,
                codigo
            });
            await red.save();

            res.json({
                mensaje: "Una nueva red de conocimiento insertada!!",
                red
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar la nueva red de conocimiento", error })
        }
    },

    putRedesConocimiento: async (req, res) => {
        const { id } = req.params;
        const { denominacion, codigo} = req.body;
        const redes = await RedesConocimientoModel.findByIdAndUpdate(id, {denominacion, codigo}, { new: true })
        res.json({
            msg: "ok",
            redes
        })
    }
}

export default httpRedesConocimiento