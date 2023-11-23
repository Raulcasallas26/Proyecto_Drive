import ProgramasFormacionModel from "../models/ProgramasFormacion.js";
import url from "url"
import path from "path"
import { v2 as cloudinary } from "cloudinary"

const httpProgramasFormacion = {
    getProgramasFormacion: async (req, res) => {
        try {
            const ProgramasFormacion = await ProgramasFormacionModel.find();
            res.json({ ProgramasFormacion });
        } catch (error) {
            res
                .status(500)
                .json({ mensaje: "Error al obtener las formaciones", error });
        }
    },

    postProgramasFormacion: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        try {
            const { denominacion, version, niveldeformacion
            } = req.body;
            const { archivo } = req.files;
            if (archivo) {
                const extension = archivo.name.split(".").pop();
                const { tempFilePath } = archivo;
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    width: 250,
                    crop: "limit",
                    resource_type: "raw",
                    allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
                    format: extension,
                });
                const buscar = await ProgramasFormacionModel.findOne({ denominacion: denominacion });
                if (buscar) {
                    return res.status(404).json({
                        msg: ` Se encontró un Programas de Formacion con el código ${denominacion} en registrado`
                    });
                } else {
                    const nuevoProgramaFormacion = new ProgramasFormacionModel({
                        denominacion: denominacion,
                        version: version,
                        niveldeformacion: niveldeformacion,
                        archivo: result.url,
                    });
                    const ProgramaCreado = await nuevoProgramaFormacion.save();
                    res.status(201).json(ProgramaCreado);
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    },



    // putProgramasFormacion: async (req, res) => {
    //     const { id } = req.params;
    //     const { denominacion, version, estado, niveldeformacion, archivo } =
    //         req.body;
    //     const programas = await ProgramasFormacionModel.findByIdAndUpdate(
    //         id,
    //         {
    //             denominacion,
    //             version,
    //             estado,
    //             niveldeformacion,
    //             archivo
    //         },
    //         { new: true }
    //     );
    //     res.json({
    //         msg: "ok",
    //         programas,
    //     });
    // },

    putProgramasFormacion: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });
        try {
            const { id } = req.params;
            const {
                denominacion, version, niveldeformacion } = req.body;
            const buscarCodigo = await ProgramasFormacionModel.findOne({ denominacion: denominacion });
            if (buscarCodigo && buscarCodigo._id.toString() !== id) {
                return res
                    .status(404)
                    .json({ msg: "Ya se encuentra un Programa registrado con esta denominacion" });
            };
            let updatedData = {
                denominacion: denominacion,
                version: version,
                niveldeformacion: niveldeformacion,
            };
            if (req.files && req.files.archivo) {
                const archivo = req.files.archivo;
                const extension = archivo.name.split(".").pop();
                const { tempFilePath } = archivo;
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    width: 250,
                    crop: "limit",
                    resource_type: "raw",
                    allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
                    format: extension,
                });
                const buscar = await ProgramasFormacionModel.findById(id);
                if (buscar.archivo) {
                    const nombreTemp = buscar.archivo.split("/");
                    const nombreArchivo = nombreTemp[nombreTemp.length - 1];
                    const [public_id] = nombreArchivo.split(".");
                    await cloudinary.uploader.destroy(public_id);
                };
                updatedData.archivo = result.url;
            };
            const buscarPrograma = await ProgramasFormacionModel.findByIdAndUpdate(
                { _id: id },
                { $set: updatedData },
                { new: true }
            );
            res.status(201).json(buscarPrograma);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    },




    putProgramaEstado: async (req, res) => {
        const { id } = req.params;
        const formacion = await ProgramasFormacionModel.findById(id);
        let programa = null;
        if (formacion.estado) {
            programa = await ProgramasFormacionModel.findByIdAndUpdate(id, {
                estado: false,
            });
        } else {
            programa = await ProgramasFormacionModel.findByIdAndUpdate(id, {
                estado: true,
            });
        }
        const programaAutenticado = req.programa;
        res.json({
            msj: "fue cambiado el estado",
            programa,
            programaAutenticado,
        });
    },
};

export default httpProgramasFormacion;
