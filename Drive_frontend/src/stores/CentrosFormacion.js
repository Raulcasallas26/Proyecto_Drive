import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useCentrosFormacionStore = defineStore(
    "CentrosFormacion", () => { 
        const addCentrosFormacion = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/CentroFormacion`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        } 

        const getCentrosFormacion = async () => {
            try {
                let res = await axios.get(`${urlBackend}/CentroFormacion`)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editCentrosFormacion = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/CentroFormacion/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        } 
        const activarCentrosFormacion = async (id) => {
            try {
                const centro = await CentrosFormacionModel.findById(id);
        
                if (!centro) {
                    return { mensaje: "Centro de formación no encontrado" };
                }
        
                centro.estado = !centro.estado;
        
                await centro.save();
        
                const estadoMensaje = centro.estado ? "Activo" : "Inactivo";
        
                return { mensaje: `Estado de centro de formación modificado a ${estadoMensaje}`, centro };
            } catch (error) {
                return { mensaje: "Error al cambiar el estado del centro de formación", error: error.message };
            }
        }
        
        return {
            addCentrosFormacion, getCentrosFormacion, editCentrosFormacion, activarCentrosFormacion, 
        }
    }
)