import httpMaterialesforma from "../controllers/materialesforma.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarResultados } from "../Middlewares/validaciones.js"
import { validarJWT } from "../Middlewares/validar-jwt.js";

const router = Router()

router.get("/", [validarJWT], httpMaterialesforma.getMaterialesforma)

router.get("/:id", httpMaterialesforma.getMaterialesformaId)

router.post("/", [

    check("nombre", "el nombre es un campo obligatorio").notEmpty().trim().isString(),
    check("tipo", "el docuemnto es un campo obligatorio").notEmpty().trim().isString(),
    check("descripccion", "la descripcion es un campo obligatorio").notEmpty().trim().isString(),
    check("documentos", "los documentos es un campo obligatorio").notEmpty().trim().isString(),
    validarResultados
], httpMaterialesforma.postMaterialesforma)

router.put("/:id", [

    check("nombre", "el nombre es un campo obligatorio").notEmpty().trim().isString(),
    check("tipo", "el docuemnto es un campo obligatorio").notEmpty().trim().isString(),
    check("descripccion", "la descripcion es un campo obligatorio").notEmpty().trim().isString(),
    check("documentos", "los documentos es un campo obligatorio").notEmpty().trim().isString(),
    validarResultados
], httpMaterialesforma.putMaterialesforma)

export default router 