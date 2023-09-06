import httpRedes from "../controllers/Redes_Conocimiento.js";
import { Router } from "express";
import {check} from "express-validator"
import {validarResultados} from "../Middlewares/validaciones.js"

const router = Router()

  router.get("/", httpRedes.getRedes)
  
  router.get("/:id", httpRedes.getRedId)
  
  router.post("/", [
    check("denominacion", "La denominacion es obligatoria").notEmpty().trim().isString(),
    check("codigo", "El codigo es obligatorio").notEmpty().trim().isString(),
    validarResultados
  ], httpRedes.postRedes)
  
  router.put("/:cedula", httpRedes.putRed)
  
  export default router