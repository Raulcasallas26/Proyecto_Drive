import httpCentrosFormacion from "../controllers/CentrosFormacion.js";
import { Router } from "express";
import { check } from "express-validator";
//import { validarJWT } from "../Middlewares/validar-jwt.js";
import { validarJWT, sinTokenMiddleware } from "../Middlewares/validar-jwt.js";
import {validarResultados} from "../Middlewares/validaciones.js"
const router = Router();

router.get("/", [validarJWT], httpCentrosFormacion.getCentrosFormacion);

router.get("/:id",  httpCentrosFormacion.getCentrosFormacionId);

router.post("/",[
    sinTokenMiddleware,
    check("nombre","el nombre es un campo obligatorio").notEmpty().trim().isString(),
    check("codigo","el codigo es un campo obligatorio").notEmpty().trim().isString(),
    check("direccion","la direccion es un campo obligatorio").notEmpty().trim().isString(),
    validarResultados,
    ], httpCentrosFormacion.postCentrosFormacion);

router.put("/:id",[
    sinTokenMiddleware,
    check("nombre","el nombre es un campo obligatorio").notEmpty().trim().isString(),
    check("codigo","el codigo es un campo obligatorio").notEmpty().trim().isString(),
    check("direccion","la direccion es un campo obligatorio").notEmpty().trim().isString(),
    validarResultados,
    ], httpCentrosFormacion.putCentrosFormacion);

router.put("/estado/:id", httpCentrosFormacion.PutactivarCentrosFormacion)

export default router;