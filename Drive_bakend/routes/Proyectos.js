import httpProyecto from "../controllers/Proyecto.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarResultados } from "../Middlewares/validaciones.js"

const router = Router()

router.get("/", httpProyecto.getProyecto)

// router.get("/:id", httpProyecto.getProyectoId)

router.post("/", [  
], httpProyecto.postProyecto)

router.put("/:id", httpProyecto.putProyecto)

router.put("/estado/:id", httpProyecto.putProyectoEstado)

export default router