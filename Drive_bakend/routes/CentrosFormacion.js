import httpCentrosFormacion from "../controllers/CentrosFormacion.js"
import { Router } from "express"
import { check } from "express-validator"
// import validarResultados from "../validaciones/validaciones.js"
const router = Router()

router.get("/", httpCentrosFormacion.getCentrosFormacion)

router.get("/:id", httpCentrosFormacion.getCentrosFormacionId)

router.post("/", [], httpCentrosFormacion.postCentrosFormacion)

router.put("/:id", httpCentrosFormacion.putCentrosFormacion)

export default router
