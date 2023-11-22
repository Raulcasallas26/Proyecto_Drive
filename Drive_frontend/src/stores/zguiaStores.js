import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
import { Notify } from "quasar"
export const useUsuariosStore = defineStore(
    "Usuarios", () => {
        const addUsuarios = async (info, curriculum) => {
            try {
                const formData = new FormData();
                for (const key in info) {
                    formData.append(key, info[key])
                }
                formData.append('curriculum', curriculum)
                let res = await axios.post(`${urlBackend}/Usuarios`, formData, {
                    headers: { "content-Type": "multipart/form-data" }
                })
                Notify.create({
                    color: "positive",
                    message: "Registro de usuario exitoso",
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

        const getUsuarios = async (token) => {
            try {
                let header = { headers: { "x-token": token } }
                let res = await axios.get(`${urlBackend}/Usuarios`, header)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }



        const editUsuarios = async (id, nombre, apellidos, cedula, telefono, email, password, perfilProfesional, curriculum, RolUsuario, RedConocimiento) => {
            try {
                const formData = new FormData();
                formData.append("nombre", nombre);
                formData.append("apellidos", apellidos);
                formData.append("cedula", cedula);
                formData.append("telefono", telefono);
                formData.append("email", email);
                formData.append("password", password);
                formData.append("perfilProfesional", perfilProfesional);
                formData.append("curriculum", curriculum);
                formData.append("RolUsuario", RolUsuario);
                formData.append("RedConocimiento", RedConocimiento);
                let res = await axios.put(`${urlBackend}/Usuarios/${id}`, formData, {
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