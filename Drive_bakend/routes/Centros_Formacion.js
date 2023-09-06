import httpCentro from "../controllers/Centros_Formacion.js"
import { Router } from "express"
import { check } from "express-validator"
// import validarResultados from "../validaciones/validaciones.js"
const router = Router()

router.get("/", httpCentro.getCentros)

router.get("/:cedula", httpCentro.getCentroId)

router.post("/", [], httpCentro.postCentro)

router.put("/:id", httpCentro.putCentro)

export default router
