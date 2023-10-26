import httpCentrosFormacion from "../controllers/CentrosFormacion.js"
import { Router } from "express"
import { check } from "express-validator"
import { validarJWT } from "../Middlewares/validar-jwt.js"
// import validarResultados from "../validaciones/validaciones.js"
const router = Router()

router.get("/",[validarJWT], httpCentrosFormacion.getCentrosFormacion)

router.get("/:id", httpCentrosFormacion.getCentrosFormacionId)

router.post("/", [validarJWT], httpCentrosFormacion.postCentrosFormacion)

router.put("/:id", httpCentrosFormacion.putCentrosFormacion)

export default router
