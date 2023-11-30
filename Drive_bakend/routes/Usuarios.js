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
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("apellidos", "el apellido es obligatorio",).trim().not().isEmpty().isString(),
    check("cedula", "el numero de cedula es obligatorio").trim().not().isEmpty().isNumeric(),
    check("cedula").custom(validarUnicos.validarCedula),
    check("telefono", "el telefono es obligatorio").trim().not().isEmpty().isNumeric(),
    check("curriculum").optional(),
    check("email", "el correo es obligatorio").trim().not().isEmpty().isString(),
    check("email", "Formato de E-mail no valido").isEmail(),
    check("email").custom(validarUnicos.validaremail),
    check("password", "la contraseña es obligatoria").trim().not().isEmpty().isString(),
    validarResultados,
  ], httpUsuarios.postUsuarios)

router.put("/:id", [
  check("nombre", "El nombre es obligatorio").notEmpty().trim().isString(),
  check("apellidos", "El apellido es obligatorio").notEmpty().trim().isString(),
  check("cedula", "El numero de cedula es obligatorio").trim().not().isEmpty(),
  check("telefono", "El telefono es obligatorio").trim().not().isEmpty(),
  check("email", "El correo es obligatorio").trim().not().isEmpty(),
  check("email", "Formato de E-mail no valido").isEmail(),
  check("perfilProfesional", "El perfil profecional es obligatorio").notEmpty().trim().isString(),
  check("curriculum").optional(),
  check("RolUsuario", "El rol del usuario es obligatorio").notEmpty().trim().isString(),
  check("RedConocimiento", "La red de conocimiento es obligatoria").notEmpty().trim().isString(),
  validarResultados,
], httpUsuarios.putUsuarios)

router.put("/estado/:id", httpUsuarios.putUsuariosEstado)

export default router 