import httpDesarrollo from "../controllers/DesarrolloCurricular.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarResultados } from "../Middlewares/validaciones.js"
import { validarJWT } from "../Middlewares/validar-jwt.js";

const router = Router()

router.get("/",[validarJWT], httpDesarrollo.getDesarrollo)

// router.get("/:id", httpDesarrollo.getDesarrolloId)

router.post("/", [ 
    check("guasAprendizaje","las guias de aprendizaje es un campo obligatorio").notEmpty().trim().isString(),
    check("matrizCorrelacion","la matriz correlacion es un campo obligatorio").notEmpty().trim().isString(),
    check("proyectoFormativo","el proyecto formativo es un campo obligatorio").notEmpty().trim().isString(),
    check("planeacionPedagogica","la planeacion pedagogica es un campo obligatoria").notEmpty().trim().isString(),
    check("estado","el estado es un campo obligatorio").notEmpty().trim().isString(),
    validarResultados
    ], httpDesarrollo.postDesarrollo)

router.put("/:id",[ 
    check("guasAprendizaje","las guias de aprendizaje es un campo obligatorio").notEmpty().trim().isString(),
    check("matrizCorrelacion","la matriz correlacion es un campo obligatorio").notEmpty().trim().isString(),
    check("proyectoFormativo","el proyecto formativo es un campo obligatorio").notEmpty().trim().isString(),
    check("planeacionPedagogica","la planeacion pedagogica es un campo obligatoria").notEmpty().trim().isString(),
    check("estado","el estado es un campo obligatorio").notEmpty().trim().isString(),
    validarResultados
    ], httpDesarrollo.putDesarrollo) 

router.put("/estado/:id", httpDesarrollo.putDesarrolloEstado)

export default router