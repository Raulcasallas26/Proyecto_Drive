import httpInstrumentosEvaluacion from "../controllers/InstrumentosEvaluacion.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarResultados } from "../Middlewares/validaciones.js"

const router = Router()

router.get("/", httpInstrumentosEvaluacion.getInstrumentosEvaluacion)

router.get("/:id", httpInstrumentosEvaluacion.getInstrumentosEvaluacionId)

router.post("/", [
  check("nombre", "el nombre es obligatorio",).notEmpty().trim().isString(),
  check("documento", "el docuemnto es obligatorio").notEmpty().trim().isString(),
  validarResultados
], httpInstrumentosEvaluacion.postInstrumentosEvaluacion)

router.put("/:id", httpInstrumentosEvaluacion.putInstrumentosEvaluacion)

// router.put("/estado/:id", httpUsuarios.putUsuariosEstado)

export default router