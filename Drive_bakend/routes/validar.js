import Usuario from "../models/Usuarios.js";
const validarUnicos = {

    validarCedula : async (cedula) => {
        const numcedula = await Usuario.findOne({ cedula })
        if (numcedula) {
            throw new Error(`El numero de cedula ${ cedula } ya existe`)
        }
    },
    validaremail : async (email) => {
        const numemail = await Usuario.findOne({ email })
        if (numemail) {
            throw new Error(`El E-mail ${ email } ya existe`)
        }
    }
}
export default validarUnicos

// const esDocumentoValido = async(numeroDocumento)=>{
//     const documento = await Instructor.findOne({numeroDocumento})
//     if (documento){
//         throw new Error(El documento ${numeroDocumento} ya existe)
//     }
// check("numeroDocumento").custom(numeroDocumento => esDocumentoValido(numeroDocumento)),