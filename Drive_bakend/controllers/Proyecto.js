import ProyectoModel from "../models/Proyectos.js"
import url from "url"
import { v2 as cloudinary } from "cloudinary"

const httpProyecto = {
    getProyecto: async (req, res) => {
        try {
            const Proyecto = await ProyectoModel.find();
            res.status(200).json({ Proyecto });
        } catch (error) {
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

    postProyecto: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });
        const {
            nombre,
            codigo,
            descripcion,
            version,
            IdPrograma,
        } = req.body;

        console.log(nombre);        
        try {
           

            const buscar = await ProyectoModel.findOne({ codigo: codigo });

            if (buscar) {
                return res.status(404).json({
                    msg: ` Se encontró un ProyectoModel con el código ${codigo} en esta red`
                });
            }

            const { documento } = req.files;
            if (documento) {
                const extension = documento.name.split(".").pop();
                const { tempFilePath } = documento;
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    width: 250,
                    crop: "limit",
                    resource_type: "raw",
                    allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
                    format: extension,
                });

                const nuevoProyecto = new ProyectoModel({
                    nombre: nombre,
                    codigo: codigo,
                    descripcion: descripcion,
                    version: version,
                    documento: result.url,
                    IdPrograma: IdPrograma,
                });
                await nuevoProyecto.save();
                return res.json(nuevoProyecto);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    },

    putProyecto: async (req, res) => {
        const { id } = req.params;
        const { nombre, codigo, descripcion, version, fecha, documento, IdPrograma } = req.body;
        const proyecto = await ProyectoModel.findByIdAndUpdate(id,
            {
                nombre,
                codigo,
                descripcion,
                version,
                fecha,
                documento,
                IdPrograma
            }, { new: true })
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