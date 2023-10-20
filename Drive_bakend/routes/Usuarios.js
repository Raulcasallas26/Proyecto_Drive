import httpUsuarios from "../controllers/Usuarios.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarResultados } from "../Middlewares/validaciones.js"

const router = Router()

router.get("/", httpUsuarios.getUsuarios), 

// router.get("/:id", httpUsuarios.getUsuariosId)

router.post("/", [
  check("nombre", "El nombre es obligatorio").notEmpty().trim().isString(),
  // check("apellidos", "el apellido es obligatorio",).notEmpty().trim().isString(),
  check("cedula", "el numero de identificacion es obligatorio").notEmpty().trim().isNumeric(),
  check("telefono", "el telefono es obligatorio").notEmpty().trim().isNumeric(),
  check("email", "el correo es obligatorio").notEmpty().trim().isString(),
  check("password", "la contraseña es obligatoria").notEmpty().trim().isString(),
  // check("perfilProfesional", "el perfil profecional es obligatorio").notEmpty().trim().isString(),
  // check("curriculum", "el curriculum es obligatorio").notEmpty().trim().isString(),
  // check("idRolUsuario", "el rol de usuario es obligatorio").notEmpty().trim().isString(),
  // check("idRedConocimiento", "la red de conocimiento es obligatoria").notEmpty().trim().isString(),
  validarResultados
], httpUsuarios.postUsuarios)

router.put("/:id", httpUsuarios.putUsuarios)

router.put("/estado/:id", httpUsuarios.putUsuariosEstado)

export default router 