import httpRegistroCalificado from "../controllers/RegistroCalificado.js"
import { Router } from "express"
import { check } from "express-validator"
import { validarJWT } from "../Middlewares/validar-jwt.js"
import { validarResultados } from "../Middlewares/validaciones.js";
const router = Router()

router.get("/",[validarJWT], httpRegistroCalificado.getRegistroCalificado)

// router.get("/:cedula", httpRegistroCalificado.getRegistroCalificadoId)

// router.post("/",[
    // check("programa", "el programa es un campo requerido").notEmpty().trim().isString(),
    // check("titulo", "El titulo de ficha es un campo requerido").notEmpty().trim().isString(),
    // check("lugarDesarrollo","el lugar de desarrollo es un campo requerido").notEmpty().trim().isString(),
    // check("metodologia","la metodologia es un campo requerido").notEmpty().trim().isString(),
    // check("creditos", "los creditos es un campo requerido").notEmpty().trim().isString(),
    // check("codigoSnies","el codigo snies es un campo requerido").notEmpty().trim().isString(),
    // check("fecha","la fecha es un capo requerido").notEmpty().trim().isDate(),
    // check("documento","el documento es un campo requerido").notEmpty().trim().isString(),
    // validarResultados
    // ], httpRegistroCalificado.postRegistroCalificado)

router.put("/:id",[
    check("programa", "el programa es un campo requerido").notEmpty().trim().isString(),
    check("titulo", "El titulo de ficha es un campo requerido").notEmpty().trim().isString(),
    check("lugarDesarrollo","el lugar de desarrollo es un campo requerido").notEmpty().trim().isString(),
    check("metodologia","la metodologia es un campo requerido").notEmpty().trim().isString(),
    check("creditos", "los creditos es un campo requerido").notEmpty().trim().isString(),
    check("codigoSnies","el codigo snies es un campo requerido").notEmpty().trim().isString(),
    check("fecha","la fecha es un capo requerido").notEmpty().trim().isDate(),
    check("documento","el documento es un campo requerido").notEmpty().trim().isString(),
    validarResultados
    ], httpRegistroCalificado.putRegistroCalificado)

export default router