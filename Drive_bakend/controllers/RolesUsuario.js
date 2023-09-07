import RolesUsuariosModel from "../models/RolesUsuario.js"

const httpRolesUsuarios = {
    getRolesUsuarios: async ( req, res ) => {
        try {
            const RolesUsuario = await RolesUsuariosModel.find({});
            res.json({ roles });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los roles", error });
        }
    },

    getRolesUsuariosId: async ( req, res ) => {
        const { id } = req.params;
        
        try {
            const rol = await RolesUsuariosModel.findOne({ id });
            res.json({ rol });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener la formacion", error })
        }
    },

    postRolesUsuarios: async ( req, res ) => {
        const { denominacion } = req.body;
        const rol = new RolesUsuariosModel({
            denominacion
        });

        try {
            const nuevoRolesUsuarios = await rol.save();

            res.json({
                mensaje: "Un rol insertado!!",
                RolesUsuarios: nuevoRolesUsuarios
            });
        } catch (error) {
            res.status(500).json({ mensaje:"Error al insertar el rol", error });
        }
    },

    putRolUsuarios: async ( req, res ) => {
        const { id } = req.params;
        const { denominacion } = req.body;

        try {
            const RolesUsuariosActualizado = await RolesUsuariosModel.findOneAndUpdate(
                { id },
                { $set: { denominacion } },
                { new: true }
            );

            if ( RolesUsuariosActualizado ) {
                res.json({
                    mensaje: "Registro modificado exitosamente",
                    RolesUsuarios: RolesUsuariosActualizado
                });
            } else {
                res.json({ mensaje: "No se encontro el rol con el id propocionado" })
            }
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar el rol", error })
        }
    },

    // deleteRolesUsuarios: async ( req, res ) => {
    //     const { id } = req.params;

    //     try {
    //         const RolesUsuariosEliminado = await RolesUsuariosModel.findOneAndDelete({ Id });

    //         if ( RolesUsuariosEliminado ) {
    //             res.json({
    //                 mensaje:"Cliente eliminado exitosamente",
    //                 RolesUsuarios: RolesUsuariosEliminado
    //             });
    //         } else {
    //             res.json({ mensaje: "No se encontro el rol con el id proporcionado" })
    //         }
    //     } catch (error) {
    //         res.status(500).json({ mensaje: "Error al eliminar el rol", error })
    //     }
    // }
}

export default httpRolesUsuarios