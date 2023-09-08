import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useCentrosFormacionStore = defineStore(
    "CentrosFormacion", () => {
        const addCentrosFormacion = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/CentrosFormacion`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getCentrosFormacion = async () => {
            try {
                let res = await axios.get(`${urlBackend}/CentrosFormacion`)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editCentrosFormacion = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/CentrosFormacion/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarCentrosFormacion = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/CentrosFormacion/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addCentrosFormacion, getCentrosFormacion, editCentrosFormacion, activarCentrosFormacion, 
        }
    }
)