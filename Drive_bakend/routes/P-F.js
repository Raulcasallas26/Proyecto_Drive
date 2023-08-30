import httpFormacion from "../controllers/P-F.js";
import { Router } from "express";
import {check} from "express-validator"
import {validarResultados} from "../Middlewares/validaciones.js"

const router = Router()

  router.get("/", httpFormacion.getFormaciones)
  
  router.get("/:id", httpFormacion.getFormacionId)
  
  router.post("/", [
    check("denominacion", "La denominacion es obligatoria").notEmpty().trim().isString(),
    check("codigo", "El codigo es obligatorio").notEmpty().trim().isString(),
    validarResultados
  ], httpFormacion.postFormacion)
  
  router.put("/:cedula", httpFormacion.putFormacion)
  
  router.put("/estado/:cedula",httpFormacion.putFormacionEstado)
  
  export default router