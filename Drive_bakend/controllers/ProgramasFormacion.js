import ProgramasFormacionModel from "../models/ProgramasFormacion.js";

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

    // getProgramasFormacionId: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const ProgramasFormacion = await ProgramasFormacionModel.findOne({ id });
    //         res.json({ ProgramasFormacion })
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al obtener la formacion", error })
    //     }
    // },

    // postProgramasFormacion: async (req, res) => {
    //     const { denominacion, codigo, version, estado, niveldeformacion, archivoOEnlace } =
    //         req.body;

    //     const ProgramasFormacion = new ProgramasFormacionModel({
    //         denominacion,
    //         codigo,
    //         version,
    //         niveldeformacion,
    //         archivoOEnlace,
    //     });
    //     try {
    //         await ProgramasFormacion.save();
    //         res.json({
    //             mensaje: "Una formacion insertada!!",
    //             ProgramasFormacion,
    //         });
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al insertar la formacion", error });
    //     }
    // },

    postProgramasFormacion: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        try {
            const { denominacion, codigo, version, estado, niveldeformacion 
            }= req.body;
            const { archivoOEnlace } = req.files;
            if (archivoOEnlace) {
                const extension = archivoOEnlace.name.split(".").pop();
                const { tempFilePath } = archivoOEnlace;
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    width: 250,
                    crop: "limit",
                    resource_type: "raw",
                    allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
                    format: extension,
                });
                const buscar = await ProgramasFormacionModel.findOne({ codigo: codigo });
                if (buscar) {
                    return res.status(404).json({
                        msg: ` Se encontró un Programas de Formacion con el código ${codigo} en registrado`
                    });
                } else {
                    const nuevoProgramaFormacion = new ProgramasFormacionModel({
                        denominacion: denominacion,
                        codigo: codigo,
                        version: version,
                        niveldeformacion: niveldeformacion,
                        archivoOEnlace: result.url,
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



    putProgramasFormacion: async (req, res) => {
        const { id } = req.params;
        const { denominacion, codigo, version, estado, niveldeformacion, archivoOEnlace } =
            req.body;
        const programas = await ProgramasFormacionModel.findByIdAndUpdate(
            id,
            {
                denominacion,
                codigo,
                version,
                estado,
                niveldeformacion,
                archivoOEnlace
            },
            { new: true }
        );
        res.json({
            msg: "ok",
            programas,
        });
    },

    // putUsuarios : async (req, res) => {
    //     cloudinary.config({
    //         cloud_name: process.env.CLOUDINARY_NAME,
    //         api_key: process.env.CLOUDINARY_KEY,
    //         api_secret: process.env.CLOUDINARY_SECRET,
    //         secure: true,
    //     });

    //     try {
    //         const { id } = req.params;
    //         const {
    //             nombre, apellidos, cedula, telefono, email, password, perfilProfesional, RolUsuario, RedConocimiento
    //         } = req.body;


    //         const buscarCodigo = await ProgramasFormacionModel.findOne({ cedula: cedula });
    //         if (buscarCodigo && buscarCodigo._id.toString() !== id) {
    //             return res
    //                 .status(404)
    //                 .json({ msg: "Ya se encuentra un Usuario registrado con ese codigo" });
    //         };

    //         let updatedData = {
    //             nombre: nombre,
    //                     apellidos: apellidos,
    //                     cedula: cedula,
    //                     telefono: telefono,
    //                     email: email,
    //                     password: password,
    //                     perfilProfesional: perfilProfesional,
    //                     RolUsuario: RolUsuario,
    //                     RedConocimiento: RedConocimiento
    //         };

    //         if (req.files && req.files.archivoOEnlace) {
    //             const archivoOEnlace = req.files.archivoOEnlace;
    //             const extension = archivoOEnlace.name.split(".").pop();
    //             const { tempFilePath } = archivoOEnlace;
    //             const result = await cloudinary.uploader.upload(tempFilePath, {
    //                 width: 250,
    //                 crop: "limit",
    //                 resource_type: "raw",
    //                 allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
    //                 format: extension,
    //             });

    //             const buscar = await ProgramasFormacionModel.findById(id);

    //             if (buscar.archivoOEnlace) {
    //                 const nombreTemp = buscar.archivoOEnlace.split("/");
    //                 const nombrecurriculum = nombreTemp[nombreTemp.length - 1];
    //                 const [public_id] = nombrecurriculum.split(".");
    //                 await cloudinary.uploader.destroy(public_id);
    //             };

    //             updatedData.archivoOEnlace = result.url;
    //         }; 

        
    //         const buscarUsuario = await ProgramasFormacionModel.findByIdAndUpdate(
    //             { _id: id },
    //             { $set: updatedData },
    //             { new: true }
    //         );
    //         res.status(201).json(buscarUsuario);
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({ error: error.message });
    //     }
    // },




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
