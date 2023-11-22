import { defineStore } from 'pinia';
import axios from "axios";
import { urlBackend } from '../routes/direccion.js'
import { Notify } from "quasar"
export const useNivelesFormacionStore = defineStore('NivelesFormacion', () => {
    const addNivelesFormacion = async (info) => {
        try {
            const res = await axios.post(`${ urlBackend }/nivelesforma`, info);
            Notify.create({
                color: "positive",
                message: "Registro del nivel de formacion exitoso",
                icon: "check",
                position: "top",
                timeout: 3000
            })
            return res;
        } catch (error) {
            console.log('Error en la petición POST');
            console.log(error);
            console.log(error.response.data.errors[0].msg);
            Notify.create({
                color: "negative",
                message: error.response.data.errors[0].msg,
                icon: "check",
                position: "top",
                timeout: 3000
            })
            return error;
        }
    };

    const getNivelesFormacion = async (token) => {
        try {
            let header = { headers: { "x-token": token } }
            const res = await axios.get(`${ urlBackend }/nivelesforma`, header);
            return res;
        } catch (error) {
            console.log('Error en la petición GET');
            return error;
        }
    };

    const editNivelesFormacion = async (id, info) => {
        try {
            const res = await axios.put(`${ urlBackend }/nivelesforma/${ id }`, info);
            Notify.create({
                color: "positive",
                message: "Edicion del nivel de formacion exitoso",
                icon: "check",
                position: "top",
                timeout: 3000
            })
            return res;
        } catch (error) {
            console.log('Error en la petición PUT');
            Notify.create({
                color: "negative",
                message: error.response.data.errors[0].msg,
                icon: "check",
                position: "top",
                timeout: 3000
            })
            return error;
        }
    };
``
    const activarNivelesFormacion = async (id) => {
        try {
            const res = await axios.put(`${ urlBackend }/nivelesforma/estado/${ id }`);
            return res.data;
        } catch (error) {
            console.log('Error en la petición PUT');
            return error;
        }
    };

    return {
        addNivelesFormacion,
        getNivelesFormacion,
        editNivelesFormacion,
        activarNivelesFormacion,
    };
});