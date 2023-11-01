import httpRetroAlimentacionRed from "../controllers/RetroAlimentacionRed.js"
import { Router } from "express"
import { check } from "express-validator"
import { validarJWT } from "../Middlewares/validar-jwt.js"
// import validarResultados from "../validaciones/validaciones.js"
const router = Router()

router.get("/",[validarJWT], httpRetroAlimentacionRed.getRetroAlimentacionRed)

// router.get("/:cedula", httpRetroAlimentacionRed.getRetroAlimentacionRedId)

router.post("/", [], httpRetroAlimentacionRed.postRetroAlimentacionRed)

router.put("/:id", httpRetroAlimentacionRed.putRetroAlimentacionRed)

router.put("/estado/:id", httpRetroAlimentacionRed.putRetroalimentacionRedEstado)

export default router
