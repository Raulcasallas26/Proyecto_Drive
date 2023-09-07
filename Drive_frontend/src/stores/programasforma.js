import { defineStore } from "pinia";
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
export const useProgramasStore = defineStore(
  "programas", ()=>{
    const getPrograma = async (req, res)=>{ 
        try {
            let res = await axios.get(`${urlBackend}/ProgramasFormacion`)
            return res
        } catch (error) {
            res.status(500).json({mjs:"Error al obtener los programas", error})
        } 
    }  
    const agregarPrograma = async (nuevoPrograma) => {
        try {
          const response = await axios.post(`${urlBackend}/ProgramasFormacion`, nuevoPrograma);
          return response; // Devuelve los datos del nuevo programa agregado si es necesario
        } catch (error) {
          throw new Error("No se pudo agregar el programa");
        }
      };
    return{
        getPrograma, agregarPrograma 
    } 

})
