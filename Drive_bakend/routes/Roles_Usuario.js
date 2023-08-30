import httpRoles from "../controllers/Roles_Usuario.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarResultados } from "../Middlewares/validaciones.js";

const router = Router ()

router.get("/", httpRoles.getRoles)

router.get("/:id", httpRoles.getRolesId)

router.post("/", [
    check("denominacion", "La denominacion es un campo requerido").notEmpty().trim().isString(),
    validarResultados
  ], httpRoles.postRol)

  router.put("/:id", httpRoles.putRol)

  router.delete("/:id", httpRoles.deleteRol)