import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useRegistroCalificadoStore = defineStore(
    "RegistroCalificado", () => {
        const addRegistroCalificado = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/registroCalificado`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getRegistroCalificado = async (token) => {
            try {
                let header = {headers:{"x-token":token}} 
                let res = await axios.get(`${urlBackend}/registroCalificado`,header)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editRegistroCalificado = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/registroCalificado/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarRegistroCalificado = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/registroCalificado/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addRegistroCalificado, getRegistroCalificado, editRegistroCalificado, activarRegistroCalificado, 
        }
    }
)