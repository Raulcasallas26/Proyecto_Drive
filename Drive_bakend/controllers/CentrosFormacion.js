import CentrosFormacionModel from "../models/CentrosFormacion.js"

const httpCentrosFormacion = {
    getCentrosFormacion: async ( req, res ) => { 
        try {
            const CentrosFormacion = await CentrosFormacionModel.find({});
            res.status(200).json({ CentrosFormacion });
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al obtener los centros de formacion", error });
        }
    },

    getCentrosFormacionId: async ( req, res ) => {
        const { id } = req.params;

        try {
            const CentrosFormacion = await CentrosFormacionModel.findOne({ id });
            res.json({ CentrosFormacion })
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al obtener el centro de formacion", error }); 
        }
    },

    postCentrosFormacion: async ( req, res ) => {
        const { nombre, codigo, direccion  } = req.body;
        const CentrosFormacion = new CentrosFormacionModel ({
            nombre,
            codigo,
            direccion
        });

        try {
            const nuevoCentrosFormacion = await CentrosFormacion.save();

            res.json({
                mensaje: "Un centro ingresado!!",
                CentrosFormacion: nuevoCentrosFormacion
            });
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al ingresar el centro", error });
        }
    },

    putCentrosFormacion: async (req, res) => {
        const { id } = req.params;
        const { nombre, codigo, direccion } = req.body;
    
        try {
            const CentrosFormacionActualizado = await CentrosFormacionModel.findOneAndUpdate(
                { _id: id },
                { $set: { nombre, codigo, direccion } },
                { new: true }
            );
    
            if (CentrosFormacionActualizado) {
                res.json({
                    mensaje: "Registro modificado exitosamente",
                    CentrosFormacion: CentrosFormacionActualizado
                });
            } else {
                res.json({ mensaje: "No se encontró el centro con la ID proporcionada" });
            }
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar el centro", error: error.message });
        }
    }
    
    
}

export default httpCentrosFormacion