import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
import { Notify } from "quasar"
export const useProgramasFormacionStore = defineStore(
    "ProgramasFormacion", () => {
        const addProgramasFormacion = async (info, archivo) => {
            try {
                const formData = new FormData()
                for (const key in info) {
                    formData.append(key, info[key])
                }
                formData.append('archivo', archivo)
                let res = await axios.post(`${urlBackend}/ProgramasFormacion`, formData,{
                    headers: {"Content-Type":"multipart/form_data"}
                })
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
        const editProgramasFormacion = async (id, denominacion, version, niveldeformacion, archivo ) => {
            try {
                const formData = new FormData();
                formData.append("denominacion", denominacion);
                formData.append("version", version);
                formData.append("niveldeformacion", niveldeformacion);
                formData.append("archivo",archivo);
                let res = await axios.put(`${urlBackend}/ProgramasFormacion/${id}`, formData, {
                    headers:{"Content-Type":"multipart/form-data", },
                })
                Notify.create({
                    color: "positive",
                    message: "Edicion de programa exitoso",
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return res
            } catch (error) {
                console.log("hay un error en edirUsers", error);
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
