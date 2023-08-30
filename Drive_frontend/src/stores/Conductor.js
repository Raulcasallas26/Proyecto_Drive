import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion'
export const useConductorStore = defineStore(
    "conductor", () => {
        const addConductor = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/conduc`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getConductor = async()=>{
            try {
                let res = await axios.get(`${urlBackend}/conduc`)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editConductor = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/conduc/${id}`, info)
                return res
            } catch (error) {
                console.log(error);
                return error 
            }
        }
        return {
            addConductor, getConductor,editConductor
        }
    }
)