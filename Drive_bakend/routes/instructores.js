import httpInstructores from "../controllers/instructores.js";
import { Router } from "express";
import {check} from "express-validator"
import {validarResultados} from "../Middlewares/validaciones.js"

const router = Router()

  router.get("/", httpInstructores.getInstructores)
  
  router.get("/:id", httpInstructores.getInstructoresId)
  
  router.post("/", [
    check("nombres", "El nombre es obligatorio").notEmpty().trim().isString(),
    check("apellidos","el apellido es obligatorio",).notEmpty().trim().isString(),
    check("numeroIdentificacion","el numero de identificacion es obligatorio").notEmpty().trim().isString(),
    check("telefono","el telefono es obligatorio").notEmpty().trim().isString(),
    check("email","el correo es obligatorio").notEmpty().trim().isString(),
    check("password","la contraseña es obligatoria").notEmpty().trim().isString(),
    check("perfilProfesional","el perfil profecional es obligatorio").notEmpty().trim().isString(),
    check("curriculum","el curriculum es obligatorio").notEmpty().trim().isString(),
    // check("idRolUsuario","el rol de usuario es obligatorio").notEmpty().trim().isString(),
    // check("idRedConocimiento","la red de conocimiento es obligatoria").notEmpty().trim().isString(),
    validarResultados    
  ], httpInstructores.postInstructores)
  
  router.put("/:cedula", httpInstructores.putInstructores)
  
  router.put("/estado/:cedula",httpInstructores.putInstructoresEstado)
  
  export default router