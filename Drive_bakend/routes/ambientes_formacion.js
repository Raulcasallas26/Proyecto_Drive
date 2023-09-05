import httpAmbiente_Formacion from "../controllers/ambientes_formacion.js";
import { Router } from "express";
import {check} from "express-validator"
import {validarResultados} from "../Middlewares/validaciones.js"

const router = Router()

  router.get("/", httpAmbiente_Formacion.getAmbiente_Formacion)
   
  router.get("/:id", httpAmbiente_Formacion.getAmbiente_FormacionId)
  
  router.post("/", [
    check("codigo", "El codigo es obligatorio").notEmpty().trim().isString(),
    check("nombre","el nombre es obligatorio",).notEmpty().trim().isString(),
    check("tipo","el tipo es obligatorio").notEmpty().trim().isString(),
    check("descripcion","la descricion es obligatoria").notEmpty().trim().isString(),
    check("documentos","los documentos son obligatorios").notEmpty().trim().isString(),
    check("idCentroDeFormacion","el centro de formacion es obligatorio").notEmpty().trim().isString(),
    validarResultados    
  ], httpAmbiente_Formacion.postAmbiente_Formacion)
  
  router.put("/:id",httpAmbiente_Formacion.putAmbiente_Formacion)
  
  export default router