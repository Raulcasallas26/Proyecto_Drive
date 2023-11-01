import RolesUsuariosModel from "../models/RolesUsuario.js"

const httpRolesUsuarios = {
    getRolesUsuarios: async (req, res) => {
        try {
            const RolesUsuario = await RolesUsuariosModel.find();
            res.json({ RolesUsuario });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los roles", error });
        }
    },

    // getRolesUsuariosId: async (req, res) => {
    //     const { id } = req.params;

    //     try {
    //         const rol = await RolesUsuariosModel.findOne({ id });
    //         res.json({ rol });
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al obtener la formacion", error })
    //     }
    // },

    postRolesUsuarios: async (req, res) => {
        const { codigo, denominacion, } = req.body;
        try {
            const rol = new RolesUsuariosModel({
                codigo,
                denominacion,
            });
            await rol.save();
            res.json({
                mensaje: "Un rol insertado!!",
                rol
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar el rol", error });
        }
    },

    putRolUsuarios: async (req, res) => {
        const { id } = req.params;
        const { denominacion, codigo } = req.body;

        try {
            const RolesUsuariosActualizado = await RolesUsuariosModel.findOneAndUpdate(
                { _id: id }, // Cambiado de 'id' a '_id' si estás usando el ID de MongoDB
                { denominacion, codigo },
                { new: true }
            );

            if (RolesUsuariosActualizado) {
                res.json({
                    mensaje: "Registro modificado exitosamente",
                    RolesUsuarios: RolesUsuariosActualizado
                });
            } else {
                res.json({ mensaje: "No se encontró el rol con el ID proporcionado" });
            }
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar el rol", error: error.message });
        }
    },

    putRolesEstado: async (req, res) => {
        const { id } = req.params
        const rol = await RolesUsuariosModel.findById(id)
        let Roles = null
        if (rol.estado) {
            Roles = await RolesUsuariosModel.findByIdAndUpdate(id, { estado: false })
        } else {
            Roles = await RolesUsuariosModel.findByIdAndUpdate(id, { estado: true })
        }
        Roles = req.Roles
        res.json({
            msj: "fue cambiado el estado",
            Roles,
        })
    },


}

export default httpRolesUsuarios