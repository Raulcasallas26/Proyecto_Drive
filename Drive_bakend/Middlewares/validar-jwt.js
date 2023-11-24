import jwt from "jsonwebtoken";
import Usuario from "../models/Usuarios.js";

// Middleware de validación de token
export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({ message: "No hay token" });
    }
    try {
        const payload = jwt.verify(token, process.env.CLAVETOCK);
        const usuario = await Usuario.findById(payload.userId);
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Token no valido" });
    } 
};

// Middleware para rutas que no requieren token
export const sinTokenMiddleware = (req, res, next) => {
    next(); // Continúa con la ejecución sin requerir token
};

export const generarJWTreset = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.CLAVETOCKREST, {
            expiresIn: "30m"//4h
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar el token")
            } else {
                resolve(token)
            }
        })
    })
}