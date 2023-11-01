import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useMaterialesApoyoStore = defineStore(
    "MaterialesApoyo", () => {
        const addMaterialesApoyo = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/MaterialesApoyo`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getMaterialesApoyo = async (token) => {
            try {
                let header = {headers:{"x-token":token}} 
                let res = await axios.get(`${urlBackend}/MaterialesApoyo`,header)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editMaterialesApoyo = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/MaterialesApoyo/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarMaterialesApoyo = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/MaterialesApoyo/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addMaterialesApoyo, getMaterialesApoyo, editMaterialesApoyo, activarMaterialesApoyo, 
        }
    }
)