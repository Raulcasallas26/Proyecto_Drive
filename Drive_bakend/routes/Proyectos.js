import httpProyecto from "../controllers/Proyecto.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarResultados } from "../Middlewares/validaciones.js"
import { validarJWT } from "../Middlewares/validar-jwt.js";

const router = Router()

router.get("/",[validarJWT], httpProyecto.getProyecto)

// router.get("/:id", httpProyecto.getProyectoId)

router.post("/",[
    check("nombre", "el  nombre es un campo requerido").notEmpty().trim().isString(),
    check("codigo", "El codigo es un campo requerido").notEmpty().trim().isString(),
    check("descripcion", "la descripcion es un campo requerido").notEmpty().trim().isString(),
    check("fecha","la fecha es un campo requerido").notEmpty().trim().isDate(),
    check("version", "la vercion es un campo requerido").notEmpty().trim().isString(),
    check("documento","el documento es un campo requerido").notEmpty().trim().isString(),
    check("Idprograma","el id del programa es un capo requerido").notEmpty().trim().isString(),
    check("estado","el estado es un campo requerido").notEmpty().trim().isString(),
    validarResultados
    ], httpProyecto.postProyecto, [validarJWT])

router.put("/:id",[
    check("nombre", "el  nombre es un campo requerido").notEmpty().trim().isString(),
    check("codigo", "El codigo es un campo requerido").notEmpty().trim().isString(),
    check("descripcion", "la descripcion es un campo requerido").notEmpty().trim().isString(),
    check("fecha","la fecha es un campo requerido").notEmpty().trim().isDate(),
    check("version", "la vercion es un campo requerido").notEmpty().trim().isString(),
    check("documento","el documento es un campo requerido").notEmpty().trim().isString(),
    check("Idprograma","el id del programa es un capo requerido").notEmpty().trim().isString(),
    check("estado","el estado es un campo requerido").notEmpty().trim().isString(),
    validarResultados
    ], httpProyecto.putProyecto) 

router.put("/estado/:id", httpProyecto.putProyectoEstado)

export default router