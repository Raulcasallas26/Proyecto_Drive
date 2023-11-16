import colorModel from "../models/color.js"
const httpcolor = {
    getcolor: async (req, res) => {
        try {
            const Color = await colorModel.find({})
            res.json( Color );
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener infotmacion de las guias del aprendiz", error })
        } 
    },


    postcolor: async (req, res) => {
        const { color } = req.body;
        const nuevoColor = new colorModel({
            color
        });
    
        try {
            const colorGuardado = await nuevoColor.save();
    
            res.json({
                mensaje: "Un color insertado correctamente!",
                nuevoColor: colorGuardado
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar el color", error });
        }
    },

    putcolor: async (req, res) => {
        const { id } = req.params;
        const { color } = req.body;
        const GuiasAprendiz = await colorModel.findByIdAndUpdate(id, { color }, { new: true })
        res.json({
            msg: "ok",
            GuiasAprendiz
        })
    },

    
}

export default httpcolor