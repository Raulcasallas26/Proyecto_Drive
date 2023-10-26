import httpDesarrollo from "../controllers/DesarrolloCurricular.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarResultados } from "../Middlewares/validaciones.js"
import { validarJWT } from "../Middlewares/validar-jwt.js";

const router = Router()

router.get("/",[validarJWT], httpDesarrollo.getDesarrollo)

// router.get("/:id", httpDesarrollo.getDesarrolloId)

router.post("/", [validarJWT ], httpDesarrollo.postDesarrollo)

router.put("/:id", httpDesarrollo.putDesarrollo) 

router.put("/estado/:id", httpDesarrollo.putDesarrolloEstado)

export default router