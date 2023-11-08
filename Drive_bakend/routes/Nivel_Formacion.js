import httpNivelesFormacion from "../controllers/Nivel_Formacion.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarResultados } from "../Middlewares/validaciones.js";
import { validarJWT } from "../Middlewares/validar-jwt.js";
const router = Router()

router.get("/", [validarJWT], httpNivelesFormacion.getNivelesFormacion)

router.get("/:id", httpNivelesFormacion.getNivelesFormacionId)

router.post("/", [
    check("denominacion", "La denominacion es un campo requerido").notEmpty().trim().isString(),
    check("codigo", "El Codigo es un campo requerido").notEmpty().trim().isString(),
    validarResultados
], httpNivelesFormacion.postNivelesFormacion)

router.put("/:id", httpNivelesFormacion.putNivelesFormacion)

router.put("/estado/:id", httpNivelesFormacion.putNivelesFormacion)

export default router