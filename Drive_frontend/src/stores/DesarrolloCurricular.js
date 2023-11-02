import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useDesarrolloCurricularStore = defineStore(
    "DesarrolloCurricular", () => {
        const addDesarrolloCurricular = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/desarrolloCurricular`, info)
                Notify.create({
                    color: "positive",
                    message: "Registro del Desarrollo Curricular exitoso",
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return res
            } catch (error) {
                console.log("hay un error en la post DesarrolloCurricular");
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

        const getDesarrolloCurricular = async () => {
            try {
                let res = await axios.get(`${urlBackend}/desarrolloCurricular`)
                return res
            } catch (error) {
                console.log("hay un error en el get DesarrolloCurricular");
                return error
            }
        }
        const editDesarrolloCurricular = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/desarrolloCurricular/${id}`, info)
                Notify.create({
                    color: "positive",
                    message: "Edicion del desarrollo curricular exitoso",
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return res
            } catch (error) {
                console.log("hay un error en editDesarrolloCurricular");
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
        const activarDesarrolloCurricular = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/desarrolloCurricular/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarDesarrolloCurricular");
                return error
            }
        }
        return {
            addDesarrolloCurricular, getDesarrolloCurricular, editDesarrolloCurricular, activarDesarrolloCurricular, 
        }
    }
)