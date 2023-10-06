import httpRetroAlimentacionRed from "../controllers/RetroAlimentacionRed.js"
import { Router } from "express"
import { check } from "express-validator"
// import validarResultados from "../validaciones/validaciones.js"
const router = Router()

router.get("/", httpRetroAlimentacionRed.getRetroAlimentacionRed)

router.get("/:cedula", httpRetroAlimentacionRed.getRetroAlimentacionRedId)

router.post("/", [], httpRetroAlimentacionRed.postRetroAlimentacionRed)

router.put("/:id", httpRetroAlimentacionRed.putRetroAlimentacionRed)

export default router