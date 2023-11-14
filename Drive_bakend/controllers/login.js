import Instructores from "../models/Usuarios.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const inicioSesion={
    loginUser:async(req, res) => {
        const { cedula, password } = req.body; 
        try{
            const usuario = await Instructores.findOne({cedula})
            if (!usuario) {
                return res.status(401).json({msj:"Credenciales invalidas"})
            }
            const poss = bcrypt.compare(password,usuario.password)
            if (!poss) { 
                return res.status(401).json({msj:"Credenciales invalidas"})
            }
            const tockent = jwt.sign({userId:usuario._id},process.env.CLAVETOCK,{expiresIn:'10h'})
            console.log("Togen generado por primera vez", tockent);
            res.status(200).json({msj:"inicio de secion con exito",tockent,usuario})
        }
        catch (error){
            res.status(500).json({msj:"Error en el servidor"}) 
        }
    }
}

export default inicioSesion

