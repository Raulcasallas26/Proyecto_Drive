import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useDesarrolloCurricularStore = defineStore(
    "DesarrolloCurricular", () => {
        const addDesarrolloCurricular = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/desarrolloCurricular`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post DesarrolloCurricular");
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
                return res
            } catch (error) {
                console.log("hay un error en editDesarrolloCurricular");
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