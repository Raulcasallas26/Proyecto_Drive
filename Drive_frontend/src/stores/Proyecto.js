import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useProyectosStore = defineStore(
    "Proyectos", () => {
        const addProyectos = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/Proyectos`, info)
                console.log("Estoy en el post de la tienda");
                console.log(res);
                return res
            } catch (error) {
                console.log("hay un error en la post Programas");
                return error
            }
        }

        const getProyectos = async (token) => {
            try {
                let header = {headers:{"x-token":token}} 
                let res = await axios.get(`${urlBackend}/Proyectos`,header)
                return res
            } catch (error) {
                console.log("hay un error en el get Programas");
                return error
            }
        }
        const editProyectos = async (id, info,header) => {
            try {
                let res = await axios.put(`${urlBackend}/Proyectos/${id}`, info,header)
                return res
            } catch (error) {
                console.log("hay un error en editProgramas");
                return error
            }
        }
        const activarProyectos = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/Proyectos/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarProgramas");
                return error
            }
        }
        return {
            addProyectos, getProyectos, editProyectos, activarProyectos, 
        }
    }
)