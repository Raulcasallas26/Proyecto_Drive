import { defineStore } from 'pinia';
import axios from "axios";
import { urlBackend } from '../routes/direccion.js';
import { ref } from "vue"
export const useMaterialesformaStore = defineStore(
    "MaterialesApoyo", () => {
        const postMaterialesforma = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/materialesforma`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getMaterialesforma = async (token) => {

            try {
                let header = { headers: { "x-token": token } }
                let res = await axios.get(`${urlBackend}/materialesforma`, header)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editMaterialesforma = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/materialesforma/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        /* const activarMaterialesApoyo = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/MaterialesApoyo/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        } */
        return {
            postMaterialesforma, getMaterialesforma, editMaterialesforma, /* activarMaterialesApoyo, */
        }
    }
)