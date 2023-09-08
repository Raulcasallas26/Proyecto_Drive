import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useProgramasFormacionStore = defineStore(
    "ProgramasFormacion", () => {
        const addProgramasFormacion = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/ProgramasFormacion`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getProgramasFormacion = async () => {
            try {
                let res = await axios.get(`${urlBackend}/ProgramasFormacion`)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editProgramasFormacion = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/ProgramasFormacion/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarProgramasFormacion = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/ProgramasFormacion/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addProgramasFormacion, getProgramasFormacion, editProgramasFormacion, activarProgramasFormacion, 
        }
    }
)
