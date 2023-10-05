import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useProyectosStore = defineStore(
    "Proyectos", () => {
        const addProyectos = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/Proyectos`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getProyectos = async () => {
            try {
                let res = await axios.get(`${urlBackend}/Proyectos`)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editProyectos = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/Proyectos/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarProyectos = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/Proyectos/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addProyectos, getProyectos, editProyectos, activarProyectos, 
        }
    }
)