import httpMaterialesApoyo from "../controllers/MaterialesApoyo.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarResultados } from "../Middlewares/validaciones.js"
import { validarJWT } from "../Middlewares/validar-jwt.js";

const router = Router()

router.get("/",[validarJWT], httpMaterialesApoyo.getMaterialesApoyo)

router.get("/:id", httpMaterialesApoyo.getMaterialesApoyoId)

router.post("/", [
  check("codigo","el codigo es un campo obligatorio").notEmpty().trim().isString(),
  check("nombre", "el nombre es un campo obligatorio").notEmpty().trim().isString(),
  check("documento", "el docuemnto es un campo obligatorio").notEmpty().trim().isString(),
  check("descripccion","la descripcion es un campo obligatorio").notEmpty().trim().isString(),
  check("documentos","los documentos es un campo obligatorio").notEmpty().trim().isString(),
  validarResultados
], httpMaterialesApoyo.postMaterialesApoyo)

router.put("/:id",[
  check("codigo","el codigo es un campo obligatorio").notEmpty().trim().isString(),
  check("nombre", "el nombre es un campo obligatorio").notEmpty().trim().isString(),
  check("documento", "el docuemnto es un campo obligatorio").notEmpty().trim().isString(),
  check("descripccion","la descripcion es un campo obligatorio").notEmpty().trim().isString(),
  check("documentos","los documentos es un campo obligatorio").notEmpty().trim().isString(),
  validarResultados
], httpMaterialesApoyo.putMaterialesApoyo)

export default router 