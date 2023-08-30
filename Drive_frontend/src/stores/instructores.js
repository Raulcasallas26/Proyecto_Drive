import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useInstructoresStore = defineStore(
    "instructor", () => {
        let cargar = ref(false)
        const addInstructores = async (info) => {
            try {
                cargar.value = true
                let res = await axios.post(`${urlBackend}/instructores`, info)
                return res
            } catch (error) {
                cargar.value = true
                console.log("hay un error en la post");
                return error
            } finally {
                cargar.value = false
            }
        }

        const getInstructores = async () => {
            try {
                cargar.value = true
                let res = await axios.get(`${urlBackend}/instructores`)
                return res
            } catch (error) {
                cargar.value = true
                console.log("hay un error en el get");
                return error
            } finally {
                cargar.value = false
            }
        }
        const editInstructores = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/instructores/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarInstructor = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/instructores/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addInstructores, getInstructores, editInstructores, activarInstructor, cargar
        }
    }
)
