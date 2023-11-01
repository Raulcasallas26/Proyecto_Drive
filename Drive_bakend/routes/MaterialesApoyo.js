import httpMaterialesApoyo from "../controllers/MaterialesApoyo.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarResultados } from "../Middlewares/validaciones.js"
import { validarJWT } from "../Middlewares/validar-jwt.js";

const router = Router()

router.get("/",[validarJWT], httpMaterialesApoyo.getMaterialesApoyo)

router.get("/:id", httpMaterialesApoyo.getMaterialesApoyoId)

router.post("/", [
  check("nombre", "el nombre es obligatorio",).notEmpty().trim().isString(),
  check("documento", "el docuemnto es obligatorio").notEmpty().trim().isString(),
  validarResultados
], httpMaterialesApoyo.postMaterialesApoyo)

router.put("/:id", httpMaterialesApoyo.putMaterialesApoyo)

export default router 