import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion'
export const useBusStore = defineStore(
    "bus", () => {
        const addBuses = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/buses`, info)
                return res
            } catch (error) {
                console.log("hay un error en la coneccion");
                return error
            }
        }

        const getBuses = async()=>{
            try {
                let res = await axios.get(`${urlBackend}/buses`)
                return res
            } catch (error) {
                console.log("hay un error en el get buses");
                return error
            }
        }
        const editBus = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/buses/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en editarbus");
                return error
            }
        }
        return {
            addBuses, getBuses,editBus
        }
    }
)