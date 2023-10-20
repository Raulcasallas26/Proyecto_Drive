import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useInvestigacionStore = defineStore(
    "Investigacion", () => {
        const addInvestigacion = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/Investigacion`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getInvestigacion = async () => {
            try {
                let res = await axios.get(`${urlBackend}/Investigacion`)
                return res 
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editInvestigacion = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/Investigacion/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarInvestigacion = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/Investigacion/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarInvestigacion");
                return error
            }
        }
        return {
            addInvestigacion, getInvestigacion, editInvestigacion, activarInvestigacion, 
        }
    }
)
