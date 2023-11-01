import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
import { Notify } from "quasar"
export const useRedesConocimientoStore = defineStore(
    "RedesConocimiento", () => {
        const addRedesConocimiento = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/RedesConocimiento`, info)
                Notify.create({
                    color: "positive",
                    message: "Registro exitoso",
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return res
            } catch (error) {
                console.log("hay un error en la post");
                Notify.create({
                    color: "negative",
                    message: error.response.data.message,
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return error
            }
        }

        const getRedesConocimiento = async (token) => {
            try {
                let header = { headers: { "x-token": token } }
                let res = await axios.get(`${urlBackend}/RedesConocimiento`, header)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editRedesConocimiento = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/RedesConocimiento/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarRedesConocimiento = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/RedesConocimiento/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addRedesConocimiento, getRedesConocimiento, editRedesConocimiento, activarRedesConocimiento,
        }
    }
)