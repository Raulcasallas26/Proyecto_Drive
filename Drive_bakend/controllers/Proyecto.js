import ProyectoModel from "../models/Proyectos.js"

const httpProyecto = { 
    getProyecto: async (req, res) => { 
        try {
            const Proyecto = await ProyectoModel.find();
            res.status(200).json({ Proyecto });
        } catch ( error ) {
            res.status(500).json({ mensaje: "Error al obtener los Proyecto", error })
        }
    },

    // getProyectoId: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const instructor = await InstrutoresModel.findOne({ id });
    //         res.json({ instructor })
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al obtener la formacion", error })
    //     }
    // },

    postProyecto: async ( req, res ) => {
        const {nombre, codigo, descripcion, version, documento, IdPrograma} = req.body;
        try {
            const proyecto = new ProyectoModel({
                nombre,
                codigo, 
                descripcion, 
                version, 
                documento,
                IdPrograma
            });
            await proyecto.save();
            res.json({
                mensaje: "Un proyecto insertado!!",
                proyecto
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar el Proyecto", error });
        } 
    },

    putProyecto: async (req, res) => {
        const { id } = req.params;
        const { nombre, codigo, descripcion, version, fecha, documento, IdPrograma} = req.body;
        const proyecto = await ProyectoModel.findByIdAndUpdate(id, 
            {nombre, 
            codigo,
            descripcion, 
            version, 
            fecha,
            documento,
            IdPrograma}, { new: true })
        res.json({
            msg: "ok",
            proyecto,
        })
    },

    putProyectoEstado: async (req, res) => {
            const { id } = req.params  
            const usu = await ProyectoModel.findById(id)
            let proyecto = null
            if (usu.estado) {
                proyecto = await ProyectoModel.findByIdAndUpdate(id, { estado: false })
            } else {
                proyecto = await ProyectoModel.findByIdAndUpdate(id, { estado: true })
            }
            const proyectoAutenticado = req.proyecto
            res.json({
                msj: "fue cambiado el estado",
                proyecto,
                proyectoAutenticado
            }) 
        },
}

export default httpProyecto