import httpLogin from "../controllers/login.js";
import { Router } from "express";
import {check} from "express-validator"
import {validarResultados} from "../Middlewares/validaciones.js"

const router = Router()
  router.post("/" , [
    check("cedula","Datos invalidos").trim().not().isEmpty(),
    check("password", "Datos invalidos").trim().not().isEmpty(),
    validarResultados
    ],httpLogin.loginUser)
  export default router