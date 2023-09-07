import { defineStore } from "pinia";
import axios from "axios";
import { urlBackend } from '../routes/direccion.js';
export const useAmbienteStore = defineStore(
  "ambiente", ()=>{
  const getAmbiente = async () => { 
    try {
      let res = await axios.get(`${urlBackend}/AmbientesFormacion`) 
      return res
  } catch (error) {
      throw new Error("No se pudieron obtener los ambiente");
  } 
  };
 
  const agregarAmbiente = async (nuevoAmbiente) => {
    try {
      const response = await axios.post(`${urlBackend}/AmbientesFormacion`, nuevoAmbiente);
      return response; // Devuelve los datos del nuevo ambiente agregado si es necesario
    } catch (error) {
      throw new Error("No se pudo agregar el ambiente");
    }
  };

  return {
    
    getAmbiente,
    agregarAmbiente,
  };
});