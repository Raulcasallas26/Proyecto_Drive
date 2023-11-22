import NivelesFormacionModel from "../models/Nivel_Formacion.js"

const httpNivelesFormacion = {
    getNivelesFormacion: async (req, res) => {
        try {
            const Nivel = await NivelesFormacionModel.find({});
            res.json({ Nivel });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los niveles de formacion", error });
        }
    },

    postNivelesFormacion: async (req, res) => {
        const { denominacion } = req.body;
        const Nivel = new NivelesFormacionModel({
            denominacion
        });
        try {
            const nivelGuargado = await Nivel.save();

            res.json({
                mensaje: "Un nivel de formacion insertado!!",
                nivelGuargado
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar los niveles de formacion", error });
        }
    },

    putNivelesFormacion: async (req, res) => {
        const { id } = req.params;
        const { denominacion } = req.body;

        try {
            const NivelActualizado = await NivelesFormacionModel.findOneAndUpdate(
                { _id: id }, // Cambiado de 'id' a '_id' si estás usando el ID de MongoDB
                { denominacion},
                { new: true }
            );

            if (NivelActualizado) {
                res.json({
                    mensaje: "Registro modificado exitosamente",
                    NivelActualizado
                });
            } else {
                res.json({ mensaje: "No se encontró los niveles de formacion con el  ID proporcionado" });
            }
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar los niveles de formacion", error: error.message });
        }
    },

    putNivelesFormacionEstado: async (req, res) => {
        const { id } = req.params
        const NivelesFormacion= await NivelesFormacionModel.findById(id)
        let Nivel = null
        if (Nivel.estado) {
            NivelesFormacion = await NivelesFormacionModel.findByIdAndUpdate(id, { estado: false })
        } else {
            Nivel = await NivelesFormacionModel.findByIdAndUpdate(id, { estado: true })
        }
        Nivel = req.NivelesFormacion
        res.json({
            msj: "fue cambiado los estados de niveles de formacion",
            NivelesFormacion,
        })
    },


}

export default httpNivelesFormacion