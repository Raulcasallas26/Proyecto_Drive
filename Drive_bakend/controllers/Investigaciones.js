import InvestigacionesModel from "../models/Investigaciones.js"

const httpInvestigaciones = {
    getInvestigaciones: async ( req, res ) => {
        try {
            const Investigaciones = await InvestigacionesModel.find({});
            res.json({ Investigaciones });
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al obtener las investigacion", error });
        }
    },

    getInvestigacionesId: async ( req, res ) => {
        const { id } = req.params;

        try {
            const Investigaciones = await InvestigacionesModel.findOne({ id });
            res.json({ Investigaciones})
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al obtener la investigacion", error }); 
        }
    },

    postInvestigaciones: async ( req, res ) => {
        const {  denominacion, codigo, descripcion, fecha, documentos, idprograma} = req.body;
        const Investigaciones = new InvestigacionesModel ({
            denominacion,
            codigo,
            descripcion,
            fecha,
            documentos,
            idprograma
        });

        try {
            const nuevoInvestigaciones = await Investigaciones.save();

            res.json({
                mensaje: "Una  Investigacion insertada!!",
                Investigaciones: nuevoInvestigaciones
            });
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al ingresar una investigacion", error });
        }
    },

    putInvestigaciones: async ( req, res ) => {
        const { id } = req.params.id;
        const {  denominacion, codigo, descripcion, fecha, documentos, idprograma} = req.body;

        try {
            
            const InvestigacionesActualizado = await InvestigacionesModel.findOneAndUpdate(
                { id },
                 { $set: {denominacion, codigo, descripcion, fecha, documentos, idprograma }},
                 { new: true }
            );

            if (InvestigacionesActualizado) {
                res.json({
                    mensaje: "Registro modificado exitosamente",
                    Investigaciones: InvestigacionesActualizado
                });
            } else {
                res.json({ mensaje: "No se encontro la investigacion" })
            }
        } catch (error) {
            res.status( 500 ).json({ mensaje: "Error al actualizar las investigaciones" })
        }
    }
    
}

export default httpInvestigaciones