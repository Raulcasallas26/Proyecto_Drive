import httpRolesUsuarios from "../controllers/RolesUsuario.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarResultados } from "../Middlewares/validaciones.js";

const router = Router()

router.get("/", httpRolesUsuarios.getRolesUsuarios)

router.get("/:id", httpRolesUsuarios.getRolesUsuariosId)

router.post("/", [
  check("denominacion", "La denominacion es un campo requerido").notEmpty().trim().isString(),
  check("codigo", "El Codigo es un campo requerido").notEmpty().trim().isString(),
  validarResultados
], httpRolesUsuarios.postRolesUsuarios)

router.put("/:id", httpRolesUsuarios.putRolUsuarios)

export default router