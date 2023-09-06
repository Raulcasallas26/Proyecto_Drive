import RedesModel from "../models/Redes_Conocimiento.js"

const httpRedes = {
    getRedes: async ( req, res ) => {
        try {
            const redes = await RedesModel.find({});
            res.json({ redes });
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al obtener las redes de conocimiento", error })
        }
    },

    getRedId: async ( req, res ) => {
        const { id } = req.params;

        try {
            const red = await RedesModel.findOne({ id });
            res.json ({ red })
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al obtener las redes de conocimiento con el id proporcionado", error });
        }
    },

    postRedes: async ( req, res ) => {
        const { denominacion, codigo } = req.body;
        const red = new RedesModel ({
            denominacion,
            codigo
        });

        try {
            const nuevaRed = await red.save();

            res.json({
                mensaje: "Una nueva red de conocimiento insertada!!",
                red: nuevaRed
            });
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al insertar la nueva red de conocimiento", error })
        }
    },

    putRed: async ( req, res ) => {
        const { denominacion, codigo } = req.body;

        try {
            const redActualizada = await RedesModel.findOneAndUpdate(
                { denominacion, codigo }
            );

            if ( redActualizada ) {
                res.json({
                    mensaje: "Registro actualizado exitosamente!!",
                    red: redActualizada
                });
            } else {
                res.json({ mensaje: "No se encontro la red de conocimiento con el id proporcionado" })
            }
        } catch (error) {
            req.status( 500 ).json({ mensaje: "Error al actualizar la red de conocimiento" })
        }
    }
}

export default httpRedes