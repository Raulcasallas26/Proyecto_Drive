import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useCentrosFormacionStore = defineStore(
    "CentrosFormacion", () => {
        const addCentrosFormacion = async (info) => {
            try {

                let res = await axios.post(`${urlBackend}/CentrosFormmacion`, info);
                return res;
            } catch (error) {
                console.log("hay un error en la post");
                return error;
            }
        }

        const getCentrosFormacion = async (token) => {
            try {
                let header = { headers: { "x-token": token } }
                let res = await axios.get(`${urlBackend}/CentrosFormmacion`, header)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editCentrosFormacion = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/CentrosFormmacion/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarCentrosFormacion = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/CentrosFormmacion/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addCentrosFormacion, getCentrosFormacion, editCentrosFormacion, activarCentrosFormacion
        }
    }
)