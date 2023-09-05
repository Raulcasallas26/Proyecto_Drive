import CiudadesModel from "../models/cuidades.js"
import bcryptjs from "bcryptjs"


const httpCiudades = {
    getCiudades: async (req, res) => {
        try {
            const Ciudades = await CiudadesModel.find({});
            res.json({ Ciudades });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener infotmacion de la cuidad", error })
        }
    },

    getCiudadesId: async (req, res) => {
        const { id } = req.params;
        try {
            const Ciudades = await CiudadesModel.findOne({ id });
            res.json({ Ciudades })
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener informacion de la ciudad", error })
        }
    },

    postCiudades: async (req, res) => {
        const { nombre, CodigoDaneCiudad, region, departamento, CodigoDaneDepartamento} = req.body;
        const Ciudades = new CiudadesModel({
          nombre,
          CodigoDaneCiudad, 
          region,
          departamento,
          CodigoDaneDepartamento
        });

        try {
            const nuevoCiudades = await Ciudades.save();

            res.json({
                mensaje: "Una ciudad insertada!!",
                nuevoCiudades
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar una ciudad", error });
        }
    },

    putCiudades: async (req, res) => {
        const { id } = req.params;
        const { nombre, CodigoDaneCiudad, region, departamento, CodigoDaneDepartamento } = req.body;
        const Ciudades = await CiudadesModel.findByIdAndUpdate(id, { nombre, CodigoDaneCiudad, region, departamento, CodigoDaneDepartamento }, { new: true })
        res.json({
            msg: "ok",
            Ciudades
        })
    },

    putCiudadesEstado: async (req, res) => {
        const { id } = req.params;

        try {

            const Ciudades = await CiudadesModel.findOne({ id });

            if (!Ciudades) {
                return res.status(400).json({ mensaje: "Ciudad o region  no encontrados" });
            }

            Ciudades.estado = !Ciudades.estado

            await Ciudades.save();

            const estadoMensaje = Ciudades.estado ? "Activo" : "Inactivo";

            res.json({
                mensaje: `Estado ciudades modificado a  ${estadoMensaje}`,
                Ciudades: Ciudades
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al cambiar la informacion de ciudades", error })
        }
    }
}

export default httpCiudades