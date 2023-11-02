import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useInvestigacionStore = defineStore(
    "Investigacion", () => {
        const addInvestigacion = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/Investigacion`, info)
                Notify.create({
                    color: "positive",
                    message: "Registro de la Investigación exitoso",
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

        const getInvestigacion = async (token) => {
            try {
                let header = {headers:{"x-token":token}} 
                let res = await axios.get(`${urlBackend}/Investigacion`,header)
                return res 
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editInvestigacion = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/Investigacion/${id}`, info)
                Notify.create({
                    color: "positive",
                    message: "Edicion de la Investigación exitoso",
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
