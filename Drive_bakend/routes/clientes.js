import httpclientes from "../controllers/clientes.js"
import { Router } from "express"
import { check } from "express-validator"
const router = Router()

router.get("/", httpclientes.getclientes)

router.get("/:cedula", httpclientes.getclientesCedula)

router.post("/",[
    check("nombre", "el mombre es obligatorio").notEmpty(),
    check("nombre", "minimo 8 caracteres").isLength({ min: 8 }),

    check("apellido","es obligatorio").notEmpty(),
    check("apellido","15 caracteres").isLength({max:15}),

    check("cedula","es obligatorio").notEmpty(),
    check("cedula","10 caracteres").isLength({max:10}),
    
    check("telefono","es obligatorio").notEmpty(),
    check("telefono","10 caracteres").isLength({max:10}),
], httpclientes.postclientes)

router.put("/:cedula", httpclientes.putclientes)

router.delete("/:cedula", httpclientes.deleteclientes)

export default router
