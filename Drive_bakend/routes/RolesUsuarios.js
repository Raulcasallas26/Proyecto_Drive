import httpRolesUsuarios from "../controllers/RolesUsuario.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarResultados } from "../Middlewares/validaciones.js";
import { validarJWT } from "../Middlewares/validar-jwt.js";

const router = Router()

router.get("/",[validarJWT], httpRolesUsuarios.getRolesUsuarios) 

// router.get("/:id", httpRolesUsuarios.getRolesUsuariosId)

router.post("/", [
  check("denominacion", "La denominacion es un campo requerido").notEmpty().trim().isString(),
  check("codigo", "El Codigo es un campo requerido").notEmpty().trim().isString(),
  validarResultados
], httpRolesUsuarios.postRolesUsuarios)

router.put("/:id", [
  check("denominacion", "La denominacion es un campo requerido").notEmpty().trim().isString(),
  check("codigo", "El Codigo es un campo requerido").notEmpty().trim().isString(),
  validarResultados
], httpRolesUsuarios.putRolUsuarios)

router.put("/estado/:id", httpRolesUsuarios.putRolesEstado)

export default router