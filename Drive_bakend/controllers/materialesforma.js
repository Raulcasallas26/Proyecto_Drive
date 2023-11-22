import MaterialesformaModel from "../models/materialesforma.js";
import bcryptjs from "bcryptjs";

const httpMaterialesforma = {
  getMaterialesforma: async (req, res) => {
    try {
      const MaterialesApoyo = await MaterialesformaModel.find();
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

  getMaterialesformaId: async (req, res) => {
    const { id } = req.params;
    try {
      const MaterialesApoyo = await MaterialesformaModel.findOne({ id });
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

  postMaterialesforma: async (req, res) => {
    const {  nombre, tipo, descripccion, documentos } = req.body;
    const MaterialesApoyo = new MaterialesformaModel({
      
      nombre,
      tipo,
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

  putMaterialesforma: async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, descripccion, documentos } = req.body;
    const MaterialesApoyo = await MaterialesformaModel.findByIdAndUpdate(
      id,
      { nombre, tipo, descripccion, documentos },
    
      { new: true }
    );
    res.json({
      msg: "ok",
      MaterialesApoyo,
    });
  },

  putMaterialesformaEstado: async (req, res) => {
    const { id } = req.params;

    try {
      const MaterialesApoyo = await MaterialesformaModel.findOne({ id });

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

export default httpMaterialesforma;
