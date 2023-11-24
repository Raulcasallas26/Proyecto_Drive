import httpAmbientesFormacion from "../controllers/AmbientesFormacion.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarResultados } from "../Middlewares/validaciones.js"
import { validarJWT } from "../Middlewares/validar-jwt.js";

const router = Router()

router.get("/", [validarJWT], httpAmbientesFormacion.getAmbientesFormacion)

router.post("/", [
  check("nombre", "el nombre es obligatorio",).notEmpty().trim().isString(),
  check("tipo", "el tipo es obligatorio").notEmpty().trim().isString(),
  check("descripcion", "la descricion es obligatoria").notEmpty().trim().isString(),
  check("documentos", "los documentos son obligatorios").notEmpty().trim().isString(),
  check("idCentroDeFormacion", "el centro de formacion es obligatorio").notEmpty().trim().isString(),
  validarResultados
], httpAmbientesFormacion.postAmbientesFormacion)

router.put("/:id", [
  check("nombre", "el nombre es obligatorio",).notEmpty().trim().isString(),
  check("tipo", "el tipo es obligatorio").notEmpty().trim().isString(),
  check("descripcion", "la descricion es obligatoria").notEmpty().trim().isString(),
  check("documentos", "los documentos son obligatorios").notEmpty().trim().isString(),
  check("idCentroDeFormacion", "el centro de formacion es obligatorio").notEmpty().trim().isString(),
  validarResultados
], httpAmbientesFormacion.putAmbientesFormacion)

router.put("/estado/:id", httpAmbientesFormacion.putAmbientesFormacionEstado)
export default router