import httpInstrumentosEvaluacion from "../controllers/InstrumentosEvaluacion.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarResultados } from "../Middlewares/validaciones.js"
import { validarJWT } from "../Middlewares/validar-jwt.js";

const router = Router()

router.get("/",[validarJWT], httpInstrumentosEvaluacion.getInstrumentosEvaluacion)

// router.get("/:id", httpInstrumentosEvaluacion.getInstrumentosEvaluacionId)

router.post("/", [
  check("nombre", "el nombre es obligatorio",).notEmpty().trim().isString(),
  check("documento", "el docuemnto es obligatorio").notEmpty().trim().isString(),
  check("estado","el estado es un campo obligatorio").notEmpty().trim().isString(),
  validarResultados
], httpInstrumentosEvaluacion.postInstrumentosEvaluacion)

router.put("/:id", [
  check("nombre", "el nombre es obligatorio",).notEmpty().trim().isString(),
  check("documento", "el docuemnto es obligatorio").notEmpty().trim().isString(),
  check("estado","el estado es un campo obligatorio").notEmpty().trim().isString(),
  validarResultados
], httpInstrumentosEvaluacion.putInstrumentosEvaluacion)

router.put("/estado/:id", httpInstrumentosEvaluacion.putInstrumentosEvaluacionEstado)

export default router