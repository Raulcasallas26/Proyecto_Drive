import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
import { Notify } from "quasar"
export const useProgramasFormacionStore = defineStore(
    "ProgramasFormacion", () => {
        const addProgramasFormacion = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/ProgramasFormacion`, info)
                Notify.create({
                    color: "positive",
                    message: "Registro de programa exitoso",
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return res
            } catch (error) {
                console.log(error);
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

        const getProgramasFormacion = async (token) => {
            try {
                let header = { headers: { "x-token": token } }
                let res = await axios.get(`${urlBackend}/ProgramasFormacion`, header)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editProgramasFormacion = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/ProgramasFormacion/${id}`, info)
                Notify.create({
                    color: "positive",
                    message: "Edicion de programa exitoso",
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
