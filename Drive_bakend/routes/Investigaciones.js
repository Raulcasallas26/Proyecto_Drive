import httpInvestigaciones from "../controllers/Investigaciones.js"
import { Router } from "express"
import { check } from "express-validator"
import { validarJWT } from "../Middlewares/validar-jwt.js"
import {validarResultados} from "../Middlewares/validaciones.js"
const router = Router()

router.get("/",[validarJWT], httpInvestigaciones.getInvestigaciones)

// router.get("/:cedula", httpInvestigaciones.getInvestigacionesId)

router.post("/", [
    check("denominacion","la denominacion es un campo obligatorio").notEmpty().trim().isString(),
    check("descripcion","la descripcion es un campo obligatorio").notEmpty().trim().isString(),
    check("fecha","la fecha es un campo obligatorio").notEmpty().trim().isDate(),
    check("documentos","los documentos es un campo obligatorio").notEmpty().trim().isString(),
    check("idprograma","el id del programa es un campo obligatorio").notEmpty().trim().isString(),
    check("estado","el estado es un campo obligatorio").notEmpty().trim().isString(),
    validarResultados
    ], httpInvestigaciones.postInvestigaciones)

router.put("/:id",[
    check("denominacion","la denominacion es un campo obligatorio").notEmpty().trim().isString(),
    check("descripcion","la descripcion es un campo obligatorio").notEmpty().trim().isString(),
    check("fecha","la fecha es un campo obligatorio").notEmpty().trim().isDate(),
    check("documentos","los documentos es un campo obligatorio").notEmpty().trim().isString(),
    check("idprograma","el id del programa es un campo obligatorio").notEmpty().trim().isString(),
    check("estado","el estado es un campo obligatorio").notEmpty().trim().isString(),
    validarResultados
    ], httpInvestigaciones.putInvestigaciones)

router.put("/estado/:id", httpInvestigaciones.putinvestigacionesEstado)

export default router
