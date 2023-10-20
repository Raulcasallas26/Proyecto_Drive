import InvestigacionesModel from "../models/Investigaciones.js"

const httpInvestigaciones = {
    getInvestigaciones: async (req, res) => {
        try {
            const Investigaciones = await InvestigacionesModel.find({});
            res.json({ Investigaciones });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener las investigacion", error });
        }
    },

    // getInvestigacionesId: async ( req, res ) => {
    //     const { id } = req.params;

    //     try {
    //         const Investigaciones = await InvestigacionesModel.findOne({ id });
    //         res.json({ Investigaciones})
    //     } catch (error) {
    //         res.status( 500 ).json({ mensaje: "Error al obtener la investigacion", error }); 
    //     }
    // },

    postInvestigaciones: async (req, res) => {
        const { denominacion, codigo, descripcion, documentos, idprograma } = req.body;
        try {
            const Investigaciones = new InvestigacionesModel({
                denominacion,
                codigo,
                descripcion,
                documentos,
                idprograma
            });

            await Investigaciones.save();
            res.json({
                msj: "Se inserto la investigacion con exito",
                Investigaciones
            })
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar la investigacion", error });
        }
    },

    putInvestigaciones: async (req, res) => {
        const { id } = req.params.id;
        const { denominacion, codigo, descripcion, fecha, documentos, idprograma } = req.body;

        try {

            const InvestigacionesActualizado = await InvestigacionesModel.findOneAndUpdate(
                { id },
                { $set: { denominacion, codigo, descripcion, fecha, documentos, idprograma } },
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
            res.status(500).json({ mensaje: "Error al actualizar las investigaciones" })
        }
    },

    putinvestigacionesEstado: async (req, res) => {
        const { id } = req.params  
        const inv = await InvestigacionesModel.findById(id)
        let investigacion = null
        if (inv.estado) {
            investigacion = await InvestigacionesModel.findByIdAndUpdate(id, { estado: false })
        } else {
            investigacion = await InvestigacionesModel.findByIdAndUpdate(id, { estado: true })
        }
        investigacion = req.investigacion
        res.json({
            msj: "fue cambiado el estado",
            investigacion,
        }) 
    },

}

export default httpInvestigaciones