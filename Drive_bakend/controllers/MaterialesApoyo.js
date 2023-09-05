import MaterialesApoyoModel from "../models/MaterialesApoyo.js"
import bcryptjs from "bcryptjs"


const httpMaterialesApoyo = {
    getMaterialesApoyo: async (req, res) => {
        try {
            const MaterialesApoyo = await MaterialesApoyoModel.find({});
            res.json({ MaterialesApoyo });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener infotmacion de material de apoyo", error })
        }
    },

    getMaterialesApoyoId: async (req, res) => {
        const { id } = req.params;
        try {
            const MaterialesApoyo = await MaterialesApoyoModel.findOne({ id });
            res.json({ MaterialesApoyo })
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener informacion de material de apoyo", error })
        }
    },

    postMaterialesApoyo: async (req, res) => {
        const { id, nombre, documento } = req.body;
        const MaterialesApoyo = new MaterialesApoyoModel({
          id,
          nombre,
          documento
        });

        try {
            const nuevoMaterialesApoyo = await MaterialesApoyo.save();

            res.json({
                mensaje: "Un material de apoyo insertado!!",
                nuevoMaterialesApoyo
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar material de apoyo", error });
        }
    },

    putMaterialesApoyo: async (req, res) => {
        const { id } = req.params;
        const { nombre, documento } = req.body;
        const MaterialesApoyo = await MaterialesApoyoModel.findByIdAndUpdate(id, { nombre, documento }, { new: true })
        res.json({
            msg: "ok",
            MaterialesApoyo
        })
    },

    putMaterialesApoyoEstado: async (req, res) => {
        const { id } = req.params;

        try {

            const MaterialesApoyo = await MaterialesApoyoModel.findOne({ id });

            if (!MaterialesApoyo) {
                return res.status(400).json({ mensaje: "Material de apoyo no encontrados" });
            }

            MaterialesApoyo.estado = !MaterialesApoyo.estado

            await MaterialesApoyo.save();

            const estadoMensaje = MaterialesApoyo.estado ? "Activo" : "Inactivo";

            res.json({
                mensaje: `Estado de material de apoyo modificado a  ${estadoMensaje}`,
                MaterialesApoyo: MaterialesApoyo
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al cambiar la informacion del material de apoyo", error })
        }
    }
}

export default httpMaterialesApoyo