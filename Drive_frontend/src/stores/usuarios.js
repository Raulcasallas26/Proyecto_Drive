import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
import {Notify} from "quasar"
export const useUsuariosStore = defineStore(
    "Usuarios", () => {
        const addUsuarios = async (info) => {
            try { 
                let res = await axios.post(`${urlBackend}/Usuarios`, info)
                Notify.create({
                    color:"positive",
                    message:"Registro exitoso",
                    icon:"check",
                    position:"top",
                    timeout:3000
                })
                return res
            } catch (error) {
                console.log(error.response.data.errors[0].msg);
                Notify.create({
                    color:"negative",
                    message:error.response.data.errors[0].msg,
                    icon:"check",
                    position:"top",
                    timeout:3000
                })
                return error
            }
        }

        const getUsuarios = async (token) => {
            console.log();
            try {
                let header = {headers:{"x-token":token}}
                let res = await axios.get(`${urlBackend}/Usuarios`,header)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editUsuarios = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/Usuarios/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarUsuarios = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/Usuarios/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addUsuarios, getUsuarios, editUsuarios, activarUsuarios, 
        }
    }
)