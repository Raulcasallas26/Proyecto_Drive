import httpbuses from "../controllers/buses.js"
import { Router } from "express"
import { check } from "express-validator"
// import validarResultados from "../validaciones/validaciones.js"
const router = Router()

router.get("/", httpbuses.getbuses)

router.get("/:cedula", httpbuses.getbusesCedula)

router.post("/",[
    check("numero", "el numero  es obligatorio").notEmpty(),
    check("numero", "minimo 8 caracteres").isLength({ min: 8 }),

    check("placa", "la placa es obligatoria").notEmpty(),
    check("placa", "minimo 6 caracteres").isLength({min:6}),

    check("tipoBus","es obligatorio").notEmpty(),
    check("tipoBus", "20 caracteres").isLength({max:20}), 

    check("capacidad", "es obligatorio").notEmpty(),
    check("capacidad", "minimo 30").isLength({min:30}),

    check("marca", "es obligatorio").notEmpty(),
    check("marca", "15 caracteres").isLength({max:15}),

    check("conductor","es obligatorio").notEmpty(),
    check("conductor","15 caracteres").isLength({max:15}),
    
],httpbuses.postbuses)

router.put("/:id", httpbuses.putbuses)

router.delete("/:cedula", httpbuses.deletebuses)

export default router 