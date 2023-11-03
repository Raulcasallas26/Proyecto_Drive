import httpUsuarios from "../controllers/Usuarios.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarResultados } from "../Middlewares/validaciones.js"
import validarUnicos from "./validar.js"
import { validarJWT } from "../Middlewares/validar-jwt.js";
const router = Router()

router.get("/",[validarJWT], httpUsuarios.getUsuarios), 
// router.get("/:id", httpUsuarios.getUsuariosId)

router.post("/", [ 
  check("nombre", "El nombre es obligatorio").notEmpty().trim().isString(),
  check("apellidos", "el apellido es obligatorio",).notEmpty().trim().isString(),
  check("cedula", "el numero de cedula es obligatorio").notEmpty().trim().isNumeric(),
  check("cedula").custom(validarUnicos.validarCedula),
  check("telefono", "el telefono es obligatorio").notEmpty().trim().isNumeric(),
  check("email", "el correo es obligatorio").notEmpty().trim().isString(),
  check("email", "Formato de E-mail no valido").isEmail(),
  check("email").custom(validarUnicos.validaremail),
  check("password", "la contraseña es obligatoria").notEmpty().trim().isString(),
  validarResultados,
], httpUsuarios.postUsuarios)
router.put("/:id", [
  check("nombre", "El nombre es obligatorio").notEmpty().trim().isString(),
check("apellidos", "El apellido es obligatorio",).notEmpty().trim().isString(),
check("cedula", "El numero de cedula es obligatorio").notEmpty().trim().isNumeric(),
check("telefono", "El telefono es obligatorio").notEmpty().trim().isNumeric(),
check("email", "El correo es obligatorio").notEmpty().trim().isString(),
check("email", "Formato de E-mail no valido").isEmail(),
check("perfilProfesional", "El perfil profecional es obligatorio").notEmpty().trim().isString(),
check("curriculum", "El curriculum es obligatorio").notEmpty().trim().isString(),
check("RolUsuario", "El rol del usuario es obligatorio").notEmpty().trim().isString(),
check("RedConocimiento", "La red de conocimiento es obligatoria").notEmpty().trim().isString(),
validarResultados,
], httpUsuarios.putUsuarios)

router.put("/estado/:id", httpUsuarios.putUsuariosEstado)

export default router 