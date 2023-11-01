import MaterialesApoyoModel from "../models/MaterialesApoyo.js";
import bcryptjs from "bcryptjs";

const httpMaterialesApoyo = {
  getMaterialesApoyo: async (req, res) => {
    try {
      const MaterialesApoyo = await MaterialesApoyoModel.find();
      res.json({ MaterialesApoyo });
    } catch (error) {
      res
        .status(500)
        .json({
          mensaje: "Error al obtener infotmacion de material de apoyo",
          error,
        });
    }
  },

  getMaterialesApoyoId: async (req, res) => {
    const { id } = req.params;
    try {
      const MaterialesApoyo = await MaterialesApoyoModel.findOne({ id });
      res.json({ MaterialesApoyo });
    } catch (error) {
      res
        .status(500)
        .json({
          mensaje: "Error al obtener informacion de material de apoyo",
          error,
        });
    }
  },

  postMaterialesApoyo: async (req, res) => {
    const { codigo, nombre, documento, descripccion, documentos } = req.body;
    const MaterialesApoyo = new MaterialesApoyoModel({
      codigo,
      nombre,
      documento,
      descripccion,
      documentos,
    });

    try {
      const nuevoMaterialesApoyo = await MaterialesApoyo.save();

      res.json({
        mensaje: "Un material de apoyo insertado!!",
        nuevoMaterialesApoyo,
      });
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al insertar material de apoyo", error });
    }
  },

  putMaterialesApoyo: async (req, res) => {
    const { id } = req.params;
    const { codigo, nombre, documento, descripccion, documentos } = req.body;
    const MaterialesApoyo = await MaterialesApoyoModel.findByIdAndUpdate(
      id,
      { codigo, nombre, documento, descripccion, documentos },
      { new: true }
    );
    res.json({
      msg: "ok",
      MaterialesApoyo,
    });
  },

  putMaterialesApoyoEstado: async (req, res) => {
    const { id } = req.params;

    try {
      const MaterialesApoyo = await MaterialesApoyoModel.findOne({ id });

      if (!MaterialesApoyo) {
        return res
          .status(400)
          .json({ mensaje: "Material de apoyo no encontrados" });
      }

      MaterialesApoyo.estado = !MaterialesApoyo.estado;

      await MaterialesApoyo.save();

      const estadoMensaje = MaterialesApoyo.estado ? "Activo" : "Inactivo";

      res.json({
        mensaje: `Estado de material de apoyo modificado a  ${estadoMensaje}`,
        MaterialesApoyo: MaterialesApoyo,
      });
    } catch (error) {
      res
        .status(500)
        .json({
          mensaje: "Error al cambiar la informacion del material de apoyo",
          error,
        });
    }
  },
};

export default httpMaterialesApoyo;
