import httpCiudades from "../controllers/Ciudades.js";
import { Router } from "express";
import {check} from "express-validator"
import {validarResultados} from "../Middlewares/validaciones.js"
import { validarJWT } from "../Middlewares/validar-jwt.js";

const router = Router()

  router.get("/",[validarJWT], httpCiudades.getCiudades)
   
  router.get("/:id", httpCiudades.getCiudades)
  
  router.post("/", [
    check("nombre","el nombre es obligatorio",).notEmpty().trim().isString(),
    check("CodigoDaneCiudad","el codigo dane de la cuidad es obligatorio").notEmpty().trim().isString(),
    check("region","la region es obligatoria").notEmpty().trim().isString(),
    check("departamento","el departamento es obligatorio").notEmpty().trim().isString(),
    check("CodigoDaneDepartamento","el codigo dane del departamento es obligatorio").notEmpty().trim().isString(),
    validarResultados    
  ], httpCiudades.postCiudades)
  
  router.put("/:id",[
    check("nombre","el nombre es obligatorio",).notEmpty().trim().isString(),
    check("CodigoDaneCiudad","el codigo dane de la cuidad es obligatorio").notEmpty().trim().isString(),
    check("region","la region es obligatoria").notEmpty().trim().isString(),
    check("departamento","el departamento es obligatorio").notEmpty().trim().isString(),
    check("CodigoDaneDepartamento","el codigo dane del departamento es obligatorio").notEmpty().trim().isString(),
    validarResultados    
  ],httpCiudades.putCiudades)
  
  export default router