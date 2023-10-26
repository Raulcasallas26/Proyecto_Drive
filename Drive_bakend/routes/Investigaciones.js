import httpInvestigaciones from "../controllers/Investigaciones.js"
import { Router } from "express"
import { check } from "express-validator"
import { validarJWT } from "../Middlewares/validar-jwt.js"
// import validarResultados from "../validaciones/validaciones.js"
const router = Router()

router.get("/",[validarJWT], httpInvestigaciones.getInvestigaciones)

// router.get("/:cedula", httpInvestigaciones.getInvestigacionesId)

router.post("/", [validarJWT], httpInvestigaciones.postInvestigaciones)

router.put("/:id", httpInvestigaciones.putInvestigaciones)

router.put("/estado/:id", httpInvestigaciones.putinvestigacionesEstado)

export default router
