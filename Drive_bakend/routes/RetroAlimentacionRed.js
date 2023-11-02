import httpRetroAlimentacionRed from "../controllers/RetroAlimentacionRed.js"
import { Router } from "express"
import { check } from "express-validator"
import { validarJWT } from "../Middlewares/validar-jwt.js"
import validarResultados from "../Middlewares/validaciones.js"
const router = Router()

router.get("/",[validarJWT], httpRetroAlimentacionRed.getRetroAlimentacionRed)

// router.get("/:cedula", httpRetroAlimentacionRed.getRetroAlimentacionRedId)

router.post("/", [ 
    check("nombre", "el nombre es un campo requerido").notEmpty().trim().isString(),
    check("codigoficha", "El Codigo de ficha es un campo requerido").notEmpty().trim().isString(),
    check("descripcion","la descripcion es un campo requerido").notEmpty().trim().isString(),
    check("fecha","la fecha es un campo requerido").notEmpty().trim().isDate(),
    check("documentos", "los documentos es un campo requerido").notEmpty().trim().isString(),
    check("idprograma","el id programa es un campo requerido").notEmpty().trim().isString(),
    validarResultados
    ], httpRetroAlimentacionRed.postRetroAlimentacionRed)

router.put("/:id", [ 
    check("nombre", "el nombre es un campo requerido").notEmpty().trim().isString(),
    check("codigoficha", "El Codigo de ficha es un campo requerido").notEmpty().trim().isString(),
    check("descripcion","la descripcion es un campo requerido").notEmpty().trim().isString(),
    check("fecha","la fecha es un campo requerido").notEmpty().trim().isDate(),
    check("documentos", "los documentos es un campo requerido").notEmpty().trim().isString(),
    check("idprograma","el id programa es un campo requerido").notEmpty().trim().isString(),
    validarResultados
    ],httpRetroAlimentacionRed.putRetroAlimentacionRed)

router.put("/estado/:id", httpRetroAlimentacionRed.putRetroalimentacionRedEstado)

export default router
