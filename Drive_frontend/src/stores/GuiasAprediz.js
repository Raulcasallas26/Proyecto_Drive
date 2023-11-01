import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useGuiasAprendizStore = defineStore(
    "GuiasAprendiz", () => {
        const addGuiasAprendiz = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/GuiasAprendiz`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        } 

        const getGuiasAprendiz = async (token) => {
            try {
                let header = {headers:{"x-token":token}} 
                let res = await axios.get(`${urlBackend}/GuiasAprendiz`, header)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editGuiasAprendiz = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/GuiasAprendiz/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarGuiasAprendiz = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/GuiasAprendiz/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addGuiasAprendiz, getGuiasAprendiz, editGuiasAprendiz, activarGuiasAprendiz, 
        }
    }
)