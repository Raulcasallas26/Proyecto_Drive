import { defineStore } from "pinia";
import axios from "axios"

export const useVehiculoStore = defineStore("vehiculo", ()=>{

    const getVehiculos = async ()=>{ 
        try {
            return axios.get("https://coofronteras.onrender.com/vehiculo")
        } catch (error) {
            throw new Error("No se pudieron obtener los vehículos");
        } 
    }  
    return{
        getVehiculos
    }

})
