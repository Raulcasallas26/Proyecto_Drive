import { defineStore } from "pinia";
import axios from "axios";
import { urlBackend } from '../routes/direccion.js';
export const useAmbienteStore = defineStore("ambiente", ()=>{


  const getAmbiente = async () => { 
    try {
      return axios.get(`${urlBackend}/ambiente`)
  } catch (error) {
      throw new Error("No se pudieron obtener los ambiente");
  } 
  };
 
  const agregarAmbiente = async (nuevoAmbiente) => {
    try {
      const response = await axios.post(`${urlBackend}/ambiente`, nuevoAmbiente);
      return response.data; // Devuelve los datos del nuevo ambiente agregado si es necesario
    } catch (error) {
      throw new Error("No se pudo agregar el ambiente");
    }
  };

  return {
    
    getAmbiente,
    agregarAmbiente,
  };
});
