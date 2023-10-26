import jwt from "jsonwebtoken"
import Usuario from "../models/Usuarios.js"

export const validarJWT = async (req, res, next)=>{
    const token = req.header("x-token")
    console.log(token)

    if(!token){
        return res.status(401).json({message:"No hay token"})
    }
    try {
        const payload = jwt.verify(token, process.env.CLAVETOCK)
        console.log(payload);
        const usuario = await Usuario.findById(payload.userId)
        req.usuario= usuario
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Token no valido"})
    }
}