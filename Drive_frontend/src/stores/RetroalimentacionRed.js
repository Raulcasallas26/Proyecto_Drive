import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
export const useRetroalimentacionRedStore = defineStore(
    "RetroalimentacionRed", () => {
        const addRetroalimentacionRed = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/retroalimentacionRed`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getRetroalimentacionRed = async (token) => {
            try {
                let header = {headers:{"x-token":token}} 
                let res = await axios.get(`${urlBackend}/retroalimentacionRed`,header)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editRetroalimentacionRed = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/retroalimentacionRed/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarRetroalimentacionRed = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/retroalimentacionRed/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addRetroalimentacionRed, getRetroalimentacionRed, editRetroalimentacionRed, activarRetroalimentacionRed, 
        }
    }
)