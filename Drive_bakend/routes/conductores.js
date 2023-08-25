import httpConductores from "../controllers/conductores.js"
import { Router } from "express"
import { check } from "express-validator"
// import validarResultados from "../validaciones/validaciones.js"
const router = Router()

router.get("/", httpConductores.getconductores)

// router.get("/:cedula", httpConductores.getconductoresCedula)

router.post("/", [ 
    check("nombre", "el nombre es obligatoria").notEmpty(),
    check("nombre", "minimo 4 caracteres").isLength({ min: 4 }),

    check("apellido", "es obligatorio").notEmpty(),
    check("apellido", "minimo 4 caracteres").isLength({ min: 4 }),

    check("cedula", "es obligatorio").notEmpty(),
    check("cedula", "minimo 10 caracteres").isLength({ min: 10 }),

    check("telefono", "ess obligatorio").notEmpty(),
    check("telefono", "minimo 10 caracteres").isLength({ min: 10 }),

    check("numLicencia", "es obligatorio").notEmpty(),
    check("numLicencia", "minimo 10 caracteres").isLength({ min: 10 }),

    check("licenciaVencimiento", "es obligatorio").notEmpty(),
    check("licenciaVencimiento", "minimo 5 caractes").isLength({ min: 5 }),

    check("categoriaLicencia", "es obligatorio").notEmpty(),
    check("categoriaLicencia", "minimo 5 caracteres").isLength({ min: 5 }),
    
], httpConductores.postConductores)

router.put("/:id", httpConductores.putconductores)

router.delete("/:cedula", httpConductores.deleteconductores) 

export default router
