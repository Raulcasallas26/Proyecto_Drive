import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { useRouter } from "vue-router"
import { ref } from "vue"
export const useLoginStore = defineStore(
    "login", () => {
        let loading = ref(false)
        let token = ref("")
        let rol = ref("")

        let router = useRouter()
        let datos = ref("")

        const validar = async (cedula, password) => {
            try {
                const info = {
                    cedula,
                    password
                }
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

        return {
            validar, token, logout, rol, datos
        }
    },
    {
        persist: true
    }
)
