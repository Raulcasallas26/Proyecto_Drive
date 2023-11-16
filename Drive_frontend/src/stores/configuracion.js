import { defineStore } from 'pinia'
import axios from "axios";
import { urlBackend } from '../routes/direccion.js'
export const useconfiguracionStore = defineStore("Configuracion", () => {


  const getColor = async (token) => {
    try {
      let header = {headers:{"x-token":token}} 
      let res = await axios.get(`${urlBackend}/color`,header)
      return res; 
    } catch (error) {
      console.log("Error en la solicitud GET de color:", error);
      return error
    }
  };

  const actualizarColor = async (id,info) => {
    try {
      let res = await axios.put(`${urlBackend}/color/${id}`,  info );
      return res.data.color; 
    } catch (error) {
      console.log(
        "Error en la solicitud PUT de actualización de color:",
        error
      );
      return error
    }
  };
  const addColor = async (info) => {
    try {
      // Realiza una solicitud POST al servidor para crear un nuevo color
      const response = await axios.post(`${urlBackend}/color`,info);
      return response.data.color;
    } catch (error) {
      console.error("Error en la solicitud POST para crear un nuevo color:", error);
      return error
    }
  };

  return {
   
    getColor,
    actualizarColor,
    addColor

  };
});
