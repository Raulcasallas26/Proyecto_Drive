import httpInvestigaciones from "../controllers/Investigaciones.js"
import { Router } from "express"
import { check } from "express-validator"
// import validarResultados from "../validaciones/validaciones.js"
const router = Router()

router.get("/", httpInvestigaciones.getInvestigaciones)

router.get("/:cedula", httpInvestigaciones.getInvestigacionesId)

router.post("/", [], httpInvestigaciones.postInvestigaciones)

router.put("/:id", httpInvestigaciones.putInvestigaciones)

export default router
