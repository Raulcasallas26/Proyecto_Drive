import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
import { Notify } from "quasar";
export const useRolesUsuariosStore = defineStore( 
    "RolesUsuarios", () => {
        const addRolesUsuarios = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/RolesUsuarios`, info )
                Notify.create({
                    color:"positive",
                    message:"Registro exitoso",
                    icon:"check",
                    position:"top",
                    timeout:3000
                })
                return res 
            } catch (error) {
                console.log(error);
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

        const getRolesUsuarios = async (token) => {
            try {
                let header = {headers:{"x-token":token}} 
                let res = await axios.get(`${urlBackend}/RolesUsuarios`,header)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editRolesUsuarios = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/RolesUsuarios/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarRolesUsuarios = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/RolesUsuarios/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addRolesUsuarios, getRolesUsuarios, editRolesUsuarios, activarRolesUsuarios, 
        }
    }
)