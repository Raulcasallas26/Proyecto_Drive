import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useInstrumentosEvaluacionStore = defineStore(
    "InstrumentosEvaluacion", () => {
        const addInstrumentosEvaluacion = async (info) => {
            console.log("hola estoy en addIntrumentos");
            try {
                let res = await axios.post(`${urlBackend}/InstrumentosEvaluacion`, info)
                Notify.create({
                    color: "positive",
                    message: "Registro del Instrumento de Evaluacion exitoso",
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return res
            } catch (error) {
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

        const getInstrumentosEvalacion = async (token) => {
            try {
                let header = {headers:{"x-token":token}} 
                let res = await axios.get(`${urlBackend}/InstrumentosEvaluacion`,header)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editInstrumentosEvaluacion = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/InstrumentosEvaluacion/${id}`, info)
                Notify.create({
                    color: "positive",
                    message: "Edicion del instrumento de evaluacion exitoso",
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