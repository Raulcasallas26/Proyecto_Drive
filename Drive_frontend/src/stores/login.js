import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { useRouter } from "vue-router"
import { ref } from "vue"
export const useLoginStore = defineStore(
    "login", () => {
        let token = ref("")
        let tokenreset = ref("")
        let rol = ref("")
        let router = useRouter()
        let datos = ref("")

        const validar = async (cedula, password) => {
            try {
                const info = {
                    cedula,
                    password
                }
                console.log(cedula);
                const res = await axios.post(`${urlBackend}/login `, info)
                token.value = res.data.tockent
                rol.value = res.data.usuario.RolUsuario
                datos.value = res.data.usuario

                console.log(datos);
                return res
            } catch (error) {
                console.log("error en la petición inicio sesión");
                console.log(error);
                return res
            }
        }

        console.log(datos);
        const logout = () => {
            token.value = ""
            rol.value = ""  // También puedes reiniciar la cédula al cerrar sesión si es necesario
            router.push("/")
        }

        const reset = async (email, subject, body) => {
            try {
                const info = {
                    email, 
                    subject, 
                    body
                }
                const res = await axios.post(`${urlBackend}/reset `, info)
                tokenreset.value = res.data.token
                return res
            } catch (error) {
                console.log("error en la petición de restablecer contraseña");
                console.log(error);
                return res
            }
        }

        return {
            validar, token, logout, rol, datos, reset
        }
    },
    {
        persist: true
    }
)
