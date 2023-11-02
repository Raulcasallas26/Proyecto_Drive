import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useCiudadesStore = defineStore(
    "Ciudades", () => {
        const addCiudades = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/Ciudades`, info)
                Notify.create({
                    color: "positive",
                    message: "Registro de la Ciudad exitoso",
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return res
            } catch (error) {
                console.log("hay un error en la post");
                Notify.create({
                    color: "negative",
                    message: error.response.data.errors[0].msg,
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return error
            }
        }

        const getCiudades = async () => {
            try {
                let res = await axios.get(`${urlBackend}/Ciudades`)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editCiudades = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/Ciudades/${id}`, info)
                Notify.create({
                    color: "positive",
                    message: "Edicion de la Ciudad exitoso",
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                Notify.create({
                    color: "negative",
                    message: error.response.data.errors[0].msg,
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return error
            }
        }
        const activarCiudades = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/Ciudades/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addCiudades, getCiudades, editCiudades, activarCiudades, 
        }
    }
)