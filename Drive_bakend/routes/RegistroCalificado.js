import httpRegistroCalificado from "../controllers/RegistroCalificado.js"
import { Router } from "express"
import { check } from "express-validator"
const router = Router()

router.get("/", httpRegistroCalificado.getRegistroCalificado)

// router.get("/:cedula", httpRegistroCalificado.getRegistroCalificadoId)

router.post("/", [], httpRegistroCalificado.postRegistroCalificado)

router.put("/:id", httpRegistroCalificado.putRegistroCalificado)

export default router