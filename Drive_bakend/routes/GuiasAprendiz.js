import httpGuiasAprendiz from "../controllers/GuiasAprendiz.js";
import { Router } from "express";
import {check} from "express-validator"
import {validarResultados} from "../Middlewares/validaciones.js"
import { validarJWT, sinTokenMiddleware } from "../Middlewares/validar-jwt.js";

const router = Router()

  router.get("/",[validarJWT], httpGuiasAprendiz.getGuiasAprendiz)
  
  router.get("/:id", httpGuiasAprendiz.getGuiasAprendizId)
  
  router.post("/", [
    sinTokenMiddleware,
    check("codigo","el codigo es obligatorio",).notEmpty().trim().isString(),
    check("nombre","el nombre es obligatorio").notEmpty().trim().isString(),
    check("fase","la fase es obligatoria").notEmpty().trim().isString(),
    check("documento","el documento es obligatorio").notEmpty().trim().isString(),
    check("idInstrumentosEvaluacion","el id de los instrumentos de evaluacion es obligatorio").notEmpty().trim().isString(),
    check("idMaterialApoyo","el id de material de apoyo es obligatorio").notEmpty().trim().isString(),
    validarResultados    
  ], httpGuiasAprendiz.postGuiasAprendiz)
  
  router.put("/:id", httpGuiasAprendiz.putGuiasAprendiz)
  
  export default router