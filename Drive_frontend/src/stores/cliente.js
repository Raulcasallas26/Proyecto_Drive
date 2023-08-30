import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion'
import {ref} from "vue"
export const useClienteStore = defineStore(
    "clientes", () => {
        let cargar = ref(false) 
        let bd = ref("clientes") 
        const addCliente = async (info) => {
            try {
                cargar.value = true
                let res = await axios.post(`${urlBackend}/${bd}`, info)
                return res
            } catch (error) {
                cargar.value = true
                console.log("hay un error en la post");
                return error
            }finally{
                cargar.value = false 
            } 
        }

        const getCliente = async()=>{
            try {
                cargar.value= true
                let res = await axios.get(`${urlBackend}/${bd}`) 
                return res
            } catch (error) {
                cargar.value = true
                console.log("hay un error en el get");
                return error
            } finally{
                cargar.value = false
            }
        }
        const editCliente = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/${bd}/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirCliente");
                return error
            }      }
        return {
            addCliente, getCliente, editCliente,cargar
        }
    }
)
