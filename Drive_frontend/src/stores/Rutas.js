import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion'
import {ref} from "vue"
export const useRutaStore = defineStore(
    "ruta", () => {
        // let cargar = ref(false)  
        const addRuta = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/rutas`, info)
                return res
            } catch (error) {
                console.log("hay un error en el post");
                return error
            }
        }

        const getRuta = async()=>{
            try {
                // cargar.value= true
                let res = await axios.get(`${urlBackend}/rutas`)
                return res
            } catch (error) {
                // cargar.value = true
                console.log("hay un error en el get");
                return error
            }
        }
        const editRuta = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/rutas/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }      }
        const activarRuta = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/rutas/estado/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en activarUsers");
                return error
            }
        }
        return {
            addRuta, getRuta, editRuta, activarRuta
        }
    }
)