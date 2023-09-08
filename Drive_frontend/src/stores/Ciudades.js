import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useCiudadesStore = defineStore(
    "Ciudades", () => {
        const addCiudades = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/Ciudades`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
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
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
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