import httpUsuarios from "../controllers/Usuarios.js"
import { Router } from "express"
import { check } from "express-validator"

const router = Router()

router.get("/", httpUsuarios.getUsuario)


router.get("/:cedula", httpUsuarios.getUsuarioCedula)

router.post("/", [
    check("nombre", "el mombre es obligatorio").notEmpty().trim().isString(),
    check("apellido", "El apellido es obligatorio").notEmpty().isString().trim(),
    check("cedula", "la cedula es obligatoria y de minimo 8 caracteres").notEmpty().trim().isLength({min: 8}),
    check("email", "El email es obligatorio").notEmpty().isString().trim(),
    check("contracena", "La contraseña es obligatoria").notEmpty().isString().trim(),
    check("direccion", "La direccion es obligatoria").notEmpty().isString().trim(),
    check("telefono", "El telefono es obligatorio").notEmpty().isString().trim().isNumeric(),
], httpUsuarios.postUsuario)

router.put("/:id", httpUsuarios.putUsuario)

router.put("/estado/:id", httpUsuarios.usuarioPutChangeState)

router.delete("/:id", httpUsuarios.deleteUsuario) 

export default router

