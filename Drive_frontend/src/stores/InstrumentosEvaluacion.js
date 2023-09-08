import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useInstrumentosEvaluacionStore = defineStore(
    "InstrumentosEvaluacion", () => {
        const addInstrumentosEvaluacion = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/InstrumentosEvaluacion`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getInstrumentosEvalacion = async () => {
            try {
                let res = await axios.get(`${urlBackend}/InstrumentosEvaluacion`)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editInstrumentosEvaluacion = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/InstrumentosEvaluacion/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarInstrumentosEvaluacion = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/InstrumentosEvaluacion/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addInstrumentosEvaluacion, getInstrumentosEvalacion, editInstrumentosEvaluacion, activarInstrumentosEvaluacion, 
        }
    }
)