import httpRedesConocimiento from "../controllers/RedesConocimiento.js";
import { Router } from "express";
import {check} from "express-validator"
import {validarResultados} from "../Middlewares/validaciones.js"
import { validarJWT } from "../Middlewares/validar-jwt.js";

const router = Router()

  router.get("/",[validarJWT], httpRedesConocimiento.getRedesConocimiento)
  
  // router.get("/:id", httpRedesConocimiento.getRedesConocimientoId)
  
  router.post("/", [
    check("denominacion", "La denominacion es obligatoria").notEmpty().trim().isString(),
    check("codigo", "El codigo es obligatorio").notEmpty().trim().isString(),
    validarResultados
  ], httpRedesConocimiento.postRedesConocimiento)
  
  router.put("/:id",[
    check("denominacion", "La denominacion es obligatoria").notEmpty().trim().isString(),
    check("codigo", "El codigo es obligatorio").notEmpty().trim().isString(),
    validarResultados
  ], httpRedesConocimiento.putRedesConocimiento)
  
  export default router