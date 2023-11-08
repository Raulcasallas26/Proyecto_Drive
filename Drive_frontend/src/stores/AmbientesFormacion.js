import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
import { Notify } from "quasar"
export const useAmbientesFormacionStore = defineStore(
    "AmbientesFormacion", () => {
        const addAmbientesFormacion = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/AmbientesFormacion`, info)
                Notify.create({
                    color: "positive",
                    message: "Registro de Ambiente exitoso",
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return res
            } catch (error) {
                console.log("hay un error en la post");
                console.log(error);
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

        const getAmbientesFormacion = async (token) => {
            try {
                let header = {headers:{"x-token":token}} 
                let res = await axios.get(`${urlBackend}/AmbientesFormacion`,header)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editAmbientesFormacion = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/AmbientesFormacion/${id}`, info)
                Notify.create({
                    color: "positive",
                    message: "Edicion de Ambiente exitoso",
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
        const activarAmbientesFormacion = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/AmbientesFormacion/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addAmbientesFormacion, getAmbientesFormacion, editAmbientesFormacion, activarAmbientesFormacion, 
        }
    }
)
