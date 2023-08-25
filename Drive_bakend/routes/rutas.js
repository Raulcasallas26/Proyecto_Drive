import httprutas from "../controllers/rutas.js"
import { Router } from "express"
import { check } from "express-validator"
// import validarResultados from "../validaciones/validaciones.js"
const router = Router()

router.get("/", httprutas.getrutas)

router.get("/:id", httprutas.getrutasid)     

router.post("/", [
    check("cuidadOrigen", "la cuidad es obligatorio").notEmpty(),
    check("cuidadOrigen", "minimo 20 caracteres").isLength({ min: 20 }),

    check("cuidadDestino","es obligatorio").notEmpty(),
    check("cuidadDestino","20 caracteres").isLength({max:20}),

    check("intermedios","es obligatorio").notEmpty(),
    check("intermedios","20 caracteres").isLength({max:20}),

    check("tiempoEnLaRuta","es obligatorio").notEmpty(),
    check("tiempoEnLaRuta","20 caracteres").isLength({max:20}),

    check("precioDeTicket","es obligatorio").notEmpty(),
    check("precioDeTicket","10 caracteres").isLength({max:10}),
    
    check("numeroDePuestosDisponibles").notEmpty(),
    check("numeroDePuestosDisponibles","10 caracteres").isLength({max:10}),
],httprutas.postrutas)

router.put("/:id", httprutas.putrutas)

router.delete("/:id", httprutas.deleterutas)

export default router
