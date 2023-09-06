import { defineStore } from "pinia";
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
export const useProgramasStore = defineStore("programas", ()=>{

    const getPrograma = async ()=>{ 
        try {
            return axios.get(`${urlBackend}/formacion`)
        } catch (error) {
            throw new Error("No se pudieron obtener los Programas");
        } 
    }  
    const agregarPrograma = async (nuevoPrograma) => {
        try {
          const response = await axios.post(`${urlBackend}/formacion`, nuevoPrograma);
          return response.data; // Devuelve los datos del nuevo programa agregado si es necesario
        } catch (error) {
          throw new Error("No se pudo agregar el programa");
        }
      };
    return{
        getPrograma, agregarPrograma 
    } 

})
