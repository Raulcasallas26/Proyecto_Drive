import httptickets from "../controllers/tickets.js"
import { Router } from "express"
import { check } from "express-validator"
const router = Router()

router.get("/", httptickets.gettickets)

router.get("/:cedula", httptickets.getticketsCedula)

router.post("/",[
    check("referenciaViaje", "la referencia es obligatorio").notEmpty(),
    check("referenciaViaje", "minimo 10 caracteres").isLength({ min:10}),

    check("numeorBus","es obligatorio").notEmpty(),
    check("numeroBus","minimo 4 caracteres").isLength({min:4}),

    check("placaBus","es obligatorio").notEmpty(),
    check("placaBus","minimo 6 caracteres").isLength({min:6}),

    check("numeroDeSillas","es obligaatorio").notEmpty(),
    check("numeroDeSillas","minimo 40 caracteres").isLength({min:40}),

    check("nombreVendedor","es obligatorio").notEmpty(),
    check("nombreVendedor","16 caracteres").isLength({max:16}),

    check("nombreCliente","es obligatorio").notEmpty(),
    check("nommbreCliente","16 caracteres").isLength({max:16}),

    check("cedulaCliente","es obligatorio").notEmpty(),
    check("cedulaCliente","minimo 10 caracteres").isLength({min:10}),

    check("pago","es obligatorio").notEmpty(),
    check("pago","20 caracteres").isLength({max:20}),
    
    check("fechaYHoraDeCompra","es obligatorio").notEmpty(),
    check("fechaYHoraDeSalida","10 caracteres").isLength({max:10}),
], httptickets.posttickets)


router.delete("/:cedula", httptickets.deletetickets)

export default router
