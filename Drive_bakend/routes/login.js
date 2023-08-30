import httpLogin from "../controllers/login.js";
import { Router } from "express";
import {check} from "express-validator"
import {validarResultados} from "../Middlewares/validaciones.js"

const router = Router()
  
  router.get("/", httpLogin.getLogins)
  
  router.get("/:cedula", httpLogin.getLoginCedula)
  
  router.post("/", [
    check("nombre", "el mombre es obligatorio").notEmpty().trim().isString(),
    check("cedula", "la cedula es obligatoria y de minimo 8 caracteres").notEmpty().isNumeric().trim().isLength({min: 8}),
    check("email", "El email es obligatorio").notEmpty().isString().trim(),
    check("password", "El password es obligatorio").notEmpty().isString().trim(),
    check("direccion", "La direccion es obligatoria").notEmpty().isString().trim(),
    check("apellido", "El apellido es obligatorio").notEmpty().isString().trim(),
    check("telefono", "El telefono es obligatorio").notEmpty().isNumeric().trim(),
    validarResultados
  ], httpLogin.postLogin)
  
  router.put("/:cedula", httpLogin.putLogin)
  
  router.put("/estado/:cedula",httpLogin.putLoginEstado)
  
  export default router