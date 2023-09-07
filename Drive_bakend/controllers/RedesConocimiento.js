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

    getRedesConocimientoId: async (req, res) => {
        const { id } = req.params;

        try {
            const RedesConocimiento = await RedesConocimientoModel.findOne({ id });
            res.json({ RedesConocimiento })
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener las redes de conocimiento con el id proporcionado", error });
        }
    },

    postRedesConocimiento: async (req, res) => {
        const { denominacion, codigo } = req.body;
        const red = new RedesConocimientoModel({
            denominacion,
            codigo
        });

        try {
            const nuevaRedesConocimiento = await red.save();

            res.json({
                mensaje: "Una nueva red de conocimiento insertada!!",
                nuevaRedesConocimiento
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar la nueva red de conocimiento", error })
        }
    },

    putRedesConocimiento: async (req, res) => {
        const { denominacion, codigo } = req.body;

        try {
            const RedesConocimientoActualizada = await RedesConocimientoModel.findOneAndUpdate(
                { denominacion, codigo }
            );

            if (RedesConocimientoActualizada) {
                res.json({
                    mensaje: "Registro actualizado exitosamente!!",
                    RedesConocimientoActualizada
                });
            } else {
                res.json({ mensaje: "No se encontro la red de conocimiento con el id proporcionado" })
            }
        } catch (error) {
            req.status(500).json({ mensaje: "Error al actualizar la red de conocimiento" })
        }
    }
}

export default httpRedesConocimiento