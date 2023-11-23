import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
import { Notify } from "quasar"
export const useProyectosStore = defineStore(
    "Proyectos", () => {
        // const addProyectos = async (info) => {
        //     try {
        //         let res = await axios.post(`${urlBackend}/Proyectos`, info)
        //         console.log("Estoy en el post de la tienda");
        //         console.log(res);
        //         return res
        //     } catch (error) {
        //         console.log("hay un error en la post Proyecto");
        //         return error
        //     }
        // }

        const addProyectos = async (info, documento) => {
            try {
                const formData = new FormData();
                for (const key in info) {
                    formData.append(key, info[key])
                }
                formData.append('documento', documento)
                let res = await axios.post(`${urlBackend}/Proyectos`, formData, {
                    headers: { "content-Type": "multipart/form-data" }
                })
                Notify.create({
                    color: "positive",
                    message: "Registro del Proyecto exitoso",
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return res
            } catch (error) {
                console.log(error);
                console.log(error.response.data.errors[0].msg);
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

        // const getUsuarios = async (token) => {
        //     try {
        //         let header = { headers: { "x-token": token } }
        //         let res = await axios.get(`${urlBackend}/Usuarios`, header)
        //         return res
        //     } catch (error) {
        //         console.log("hay un error en el get");
        //         return error
        //     }
        // }


        const getProyectos = async (token) => {
            try {
                let header = {headers:{"x-token":token}} 
                let res = await axios.get(`${urlBackend}/Proyectos`,header)
                return res
            } catch (error) {
                console.log("hay un error en el get Proyecto");
                return error
            }
        }
        // const editProyectos = async (id, info,header) => {
        //     try {
        //         let res = await axios.put(`${urlBackend}/Proyectos/${id}`, info,header)
        //         return res
        //     } catch (error) {
        //         console.log("hay un error en editProyecto");
        //         return error
        //     }
        // }

        const editProyectos = async (id, nombre, descripcion, version, documento, Programa, fecha) => {
            try {
                const formData = new FormData();
                formData.append("nombre", nombre);
                formData.append("descripcion", descripcion);
                formData.append("version", version);
                formData.append("documento", documento);
                formData.append("Programa", Programa);
                formData.append("fecha", fecha);
                let res = await axios.put(`${urlBackend}/Proyectos/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data", },
                })
                Notify.create({
                    color: "positive",
                    message: "Edicion de usuario exitoso",
                    icon: "check",
                    position: "top",
                    timeout: 3000
                })
                return res
            } catch (error) {
                console.log("hay un error en edirUsers", error);
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

        const activarProyectos = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/Proyectos/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarProyecto");
                return error
            }
        }
        return {
            addProyectos, getProyectos, editProyectos, activarProyectos, 
        }
    }
)