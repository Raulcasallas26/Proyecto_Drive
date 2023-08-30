import RolesModel from "../models/Roles_Usuario.js"

const httpRoles = {
    getRoles: async ( req, res ) => {
        try {
            const roles = await RolesModel.find({});
            res.json({ roles });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los roles", error });
        }
    },

    getRolId: async ( req, res ) => {
        const { id } = req.params;
        
        try {
            const rol = await RolesModel.findOne({ id });
            res.json({ rol });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener la formacion", error })
        }
    },

    postRol: async ( req, res ) => {
        const { denominacion } = req.body;
        const rol = new RolesModel({
            denominacion
        });

        try {
            const nuevoRol = await rol.save();

            res.json({
                mensaje: "Un rol insertado!!",
                rol: nuevoRol
            });
        } catch (error) {
            res.status(500).json({ mensaje:"Error al insertar el rol", error });
        }
    },

    putRol: async ( req, res ) => {
        const { id } = req.params;
        const { denominacion } = req.body;

        try {
            const rolActualizado = await RolesModel.findOneAndUpdate(
                { id },
                { $set: { denominacion } },
                { new: true }
            );

            if ( rolActualizado ) {
                res.json({
                    mensaje: "Registro modificado exitosamente",
                    rol: rolActualizado
                });
            } else {
                res.json({ mensaje: "No se encontro el rol con el id propocionado" })
            }
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar el rol", error })
        }
    },

    deleteRol: async ( req, res ) => {
        const { id } = req.params;

        try {
            const rolEliminado = await RolesModel.findOneAndDelete({ Id });

            if ( rolEliminado ) {
                res.json({
                    mensaje:"Cliente eliminado exitosamente",
                    rol: rolEliminado
                });
            } else {
                res.json({ mensaje: "No se encontro el rol con el id proporcionado" })
            }
        } catch (error) {
            res.status(500).json({ mensaje: "Error al eliminar el rol", error })
        }
    }
}

export default httpRoles