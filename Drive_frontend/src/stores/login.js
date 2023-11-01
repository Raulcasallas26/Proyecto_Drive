import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import {useRouter} from "vue-router"

import { ref } from "vue"
export const useLoginStore = defineStore(
    "login", () => {
        let loading = ref(false)
        let token = ref("")
        let rol = ref("")
        let router = useRouter()


// "Gestor"

        const validar = async (cedula, password) => {
            try {
                const info = {
                    cedula,
                    password
                }
                const res = await axios.post(`${urlBackend}/login`, info)
                token.value = res.data.tockent
                rol.value= res.data.usuario.RolUsuario
                return res
            } catch (error) {
                console.log("error en la peticion inicio sesion");
                console.log(error);
                return res
            }
        }

        const logout= ()=>{
            token.value=""
            rol.value=""
            router.push("/")
        }
        return {
            validar, token, logout, rol
        }
    },
    {
        persist:true
    }
)