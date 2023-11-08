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

    getNivelesFormacionId: async (req, res) => {
        const { id } = req.params;

        try {
            const Nivel = await NivelesFormacionModel.findOne({ id });
            res.json({ Nivel });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los niveles de formacion", error })
        }
    },

    postNivelesFormacion: async (req, res) => {
        const { codigo, denominacion, } = req.body;
        const Nivel = new NivelesFormacionModel({
            codigo,
            denominacion,

        });

        try {
            const nuevoNivelesFormacion = await Nivel.save();

            res.json({
                mensaje: "Un nivel de formacion insertado!!",
                Nivel: nuevoNivelesFormacion
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar los niveles de formacion", error });
        }
    },

    putNivelesFormacion: async (req, res) => {
        const { id } = req.params;
        const { denominacion, codigo } = req.body;

        try {
            const NivelActualizado = await NivelesFormacionModel.findOneAndUpdate(
                { _id: id }, // Cambiado de 'id' a '_id' si estás usando el ID de MongoDB
                { denominacion, codigo },
                { new: true }
            );

            if (NivelActualizado) {
                res.json({
                    mensaje: "Registro modificado exitosamente",
                    Nivel: NivelesFormacionActualizado
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