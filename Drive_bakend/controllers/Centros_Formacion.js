import CentrosModel from "../models/Centros_Formacion.js"

const httpCentro = {
    getCentros: async ( req, res ) => {
        try {
            const centros = await CentrosModel.find({});
            res.json({ centros });
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al obtener los centros de formacion", error });
        }
    },

    getCentroId: async ( req, res ) => {
        const { id } = req.params;

        try {
            const centro = await CentrosModel.findOne({ id });
            res.json({ centro })
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al obtener el centro de formacion", error }); 
        }
    },

    postCentro: async ( req, res ) => {
        const { nombre, codigo, direccion  } = req.body;
        const centro = new CentrosModel ({
            nombre,
            codigo,
            direccion
        });

        try {
            const nuevoCentro = await centro.save();

            res.json({
                mensaje: "Un centro ingresado!!",
                centro: nuevoCentro
            });
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al ingresar el centro", error });
        }
    },

    putCentro: async ( req, res ) => {
        const { id } = req.params.id;
        const { nombre, codigo, direccion } = req.body;

        try {
            
            const centroActualizado = await CentrosModel.findOneAndUpdate(
                { id },
                 { $set: {nombre, codigo, direccion } },
                 { new: true }
            );

            if (centroActualizado) {
                res.json({
                    mensaje: "Registro modificado exitosamente",
                    centro: centroActualizado
                });
            } else {
                res.json({ mensaje: "No se encontro el centro con la id proporcionada" })
            }
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al actualizar el centro" })
        }
    }
    
}

export default httpCentro 