import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useLoginStore = defineStore(
    "login", () => {
        let cargar = ref(false)

        const validar = async (cedula, password) => {
            try {
                const info = {
                    cedula,
                    password
                }
                cargar.value = true
                let res = await axios.post(`${urlBackend}/login`, info)
                return res
            } catch (error) {
                cargar.value = true
                console.log("hay un error en la post de login"); 
                return error
            } finally {
                cargar.value = false
            }
        }

        return {
            validar, cargar
        }
    }
)
