import httpcolor from "../controllers/color.js";
import { Router } from "express";
import {check} from "express-validator"
import {validarResultados} from "../Middlewares/validaciones.js"
import { validarJWT, sinTokenMiddleware } from "../Middlewares/validar-jwt.js";
const router = Router()

  router.get("/", httpcolor.getcolor)
  
/*   router.get("/:id", httpGuiasAprendiz.getGuiasAprendizId) */
  
  router.post("/", [
    sinTokenMiddleware,
    validarResultados    
  ], httpcolor.postcolor)
  
  router.put("/:id", httpcolor.putcolor)
  
  export default router
