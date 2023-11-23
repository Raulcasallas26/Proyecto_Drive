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


    // postProyecto: async ( req, res ) => {
    //     const {nombre, codigo, descripcion, version, documento, Programa} = req.body;
    //     try {
    //         const proyecto = new ProyectoModel({
    //             nombre,
    //             codigo, 
    //             descripcion, 
    //             version, 
    //             documento,
    //             Programa
    //         });
    //         await proyecto.save();
    //         res.json({
    //             mensaje: "Un proyecto insertado!!",
    //             proyecto
    //         });
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al insertar el Proyecto", error });
    //     } 
    // },

    postProyecto: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        try {
            const {
                nombre, descripcion, version, Programa
            } = req.body;
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
                const buscar = await ProyectoModel.findOne({ nombre: nombre });
                if (buscar) {
                    return res.status(404).json({
                        msg: ` Se encontró un Proyecto con el Nombre ${nombre} en la base de datos`
                    });
                } else {
                    const nuevoUsuario = new ProyectoModel({
                        nombre: nombre,
                        descripcion: descripcion,
                        version: version,
                        documento: result.url,
                        Programa: Programa,
                    });
                    const UsuarioCreado = await nuevoUsuario.save();
                    res.status(201).json(UsuarioCreado);
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    },

    // putProyecto: async (req, res) => {
    //     const { id } = req.params;
    //     const { nombre, codigo, descripcion, version, fecha, documento, Programa } = req.body;
    //     const proyecto = await ProyectoModel.findByIdAndUpdate(id,
    //         {
    //             nombre,
    //             codigo,
    //             descripcion,
    //             version,
    //             fecha,
    //             documento,
    //             Programa
    //         }, { new: true })
    //     res.json({
    //         msg: "ok",
    //         proyecto,
    //     })
    // },

    putProyecto: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        try {
            const { id } = req.params;
            const { nombre, descripcion, version, Programa, fecha} = req.body;


            const buscarCodigo = await ProyectoModel.findOne({ nombre: nombre });
            if (buscarCodigo && buscarCodigo._id.toString() !== id) {
                return res
                    .status(404)
                    .json({ msg: "Ya se encuentra un proyecto registrado con ese nombre" });
            };

            let updatedData = {
                nombre: nombre,
                descripcion: descripcion,
                version: version,
                Programa: Programa,
                fecha: fecha,
            };

            if (req.files && req.files.documento) {
                const documento = req.files.documento;
                const extension = documento.name.split(".").pop();
                const { tempFilePath } = documento;
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    width: 250,
                    crop: "limit",
                    resource_type: "raw",
                    allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
                    format: extension,
                });

                const buscar = await ProyectoModel.findById(id);

                if (buscar.documento) {
                    const nombreTemp = buscar.documento.split("/");
                    const nombredocumento = nombreTemp[nombreTemp.length - 1];
                    const [public_id] = nombredocumento.split(".");
                    await cloudinary.uploader.destroy(public_id);
                };

                updatedData.documento = result.url;
            };


            const buscarProyecto = await ProyectoModel.findByIdAndUpdate(
                { _id: id },
                { $set: updatedData },
                { new: true }
            );
            res.status(201).json(buscarProyecto);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
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