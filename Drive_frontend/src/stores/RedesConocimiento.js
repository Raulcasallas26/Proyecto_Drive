import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useRedesConocimientoStore = defineStore(
    "RedesConocimiento", () => {
        const addRedesConocimiento = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/RedesConocimiento`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getRedesConocimiento = async (token) => {
            try {
                let header = {headers:{"x-token":token}} 
                let res = await axios.get(`${urlBackend}/RedesConocimiento`,header)
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