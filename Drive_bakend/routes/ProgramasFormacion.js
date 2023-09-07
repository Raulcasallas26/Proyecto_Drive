import httpProgramasFormacion from "../controllers/ProgramasFormacion.js";
import { Router } from "express";
import {check} from "express-validator"
import {validarResultados} from "../Middlewares/validaciones.js"

const router = Router()

  router.get("/", httpProgramasFormacion.getProgramasFormacion)
  
  router.get("/:id", httpProgramasFormacion.getProgramasFormacionId)
  
  router.post("/", [
    check("denominacion", "La denominacion es obligatoria").notEmpty().trim().isString(),
    check("codigo", "El codigo es obligatorio").notEmpty().trim().isString(),
    validarResultados
  ], httpProgramasFormacion.getProgramasFormacion)
  
  router.put("/:cedula", httpProgramasFormacion.putProgramasFormacion)
  
  router.put("/estado/:cedula",httpProgramasFormacion.putProgramasFormacionEstado)
  
  export default router