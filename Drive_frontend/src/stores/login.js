import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useLoginStore = defineStore("login", () => {

/*         const validar = async (cedula, password) => {
            try {
                const info = {
                    cedula,
                    password
                }
                let res = await axios.post(`${urlBackend}/login/U/U`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post de login"); 
                return error
            } finally {
            }
        } */

        const prueba = async ( cedula , password) =>{

            try{
                const info = {
                    cedula,
                    password
                }
                
                const res = await axios.post(`${urlBackend}/login` , info)
                
                return res
            }catch (error){
                console.log("error en la peticion inicio sesion");
                console.log(error);

            }
        }

        return {
            prueba
        }
    }
)
