import httpProgramasFormacion from "../controllers/ProgramasFormacion.js";
import { Router } from "express";
import {check} from "express-validator"
import validarUnicos from "./validar.js"
import {validarResultados} from "../Middlewares/validaciones.js"
import { validarJWT } from "../Middlewares/validar-jwt.js";
const router = Router()

  router.get("/", httpProgramasFormacion.getProgramasFormacion)
  
  // router.get("/:id", httpProgramasFormacion.getProgramasFormacionId)
  
  router.post("/", [
    check("denominacion", "La denominacion es obligatoria").trim().not().isEmpty(),
    check("denominacion").custom(validarUnicos.validarprogramaFormacion),
    check("version","la version es un campo obligatorio").trim().not().isEmpty(),
    check("niveldeformacion","el nivel de formacion es un campo obligatorio").trim().not().isEmpty(),
    validarResultados
  ], httpProgramasFormacion.postProgramasFormacion)
  
  router.put("/:id",[
    check("denominacion", "La denominacion es obligatoria").trim().not().isEmpty(),
    check("version","la version es un campo obligatorio").trim().not().isEmpty(),
    check("niveldeformacion","el nivel de formacion es un campo obligatorio").trim().not().isEmpty(),
    validarResultados
  ], httpProgramasFormacion.putProgramasFormacion)
  
  router.put("/estado/:id",httpProgramasFormacion.putProgramaEstado)
  
  export default router