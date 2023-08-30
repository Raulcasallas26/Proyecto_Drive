<template>
    <q-layout view="lHh lpR lFf">
        <div class="row">
            <div class="col-5" id="imagen">
                <img src="https://fulbright.edu.co/wp-content/uploads/2021/09/BARE-5.jpeg" alt="Cargando imagen" id="img">
            </div>
            <div class="col-7">
                <q-card id="card" flat bordered class="my-card">
                    <q-card-section>
                        <h5 style="display: flex; justify-content: center;">Iniciar sesion</h5>
                    </q-card-section>
                    <q-card-section class="q-pa-md">
                        <div role="alert"
                            style="border: 2px solid red; border-radius: 20px; text-align: center; background-color: rgba(255, 0, 0, 0.304);"
                            v-if="check !== ''">
                            <div>
                                {{ check }}
                            </div>
                        </div>
                        <div class="q-pa-md">
                            <div class="q-gutter-md">
                                <q-select :options="options_rol" v-model="rol" label="Rol" />
                            </div>
                        </div>
                        <div class="q-gutter-md">
                            <q-input label="Cedula" v-model="cedula" />
                        </div>
                        <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Ingresar password">
                            <template v-slot:append>
                                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                    @click="isPwd = !isPwd" />
                            </template>
                        </q-input>

                    </q-card-section>

                    <q-btn v-if="bd === true" style="background-color: green;display: flex; justify-content: center;"
                        @click="Ingresar()">Iniciar</q-btn>
                    <q-btn v-else style="background-color: green;display: flex; justify-content: center;" to="/home">Abrir cuenta</q-btn>
                    <q-card-section>

                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue'

let leftDrawerOpen = ref(false)
let rightDrawerOpen = ref(false)
let isPwd = ref(true)
let rol = ref("")
let cedula = ref("")
let password = ref("")
let check = ref("")
let bd = ref(true)
const options_rol = ref([
    'Administrador', 'Gestor de Red', 'Instructor o Invitado'
])

function Ingresar() {

    console.log("hola");
    if (rol.value === "") {
        check.value = "Debes seleccionar tu rol"
    } else if (cedula.value.trim() === "") {
        check.value = "Debes ingresar tus datos"
    } else if (password.value.trim() === "") {
        check.value = "debes ingresar tus datos"
    } else if (cedula.value !== "123456") {
        check.value = "La informacion de los campos es incorrecta"
    } else if (password.value !== "proyecto123") {
        check.value = "La informacion de los campos es incorrecta"
    } else {
        bd.value = false
        check.value = ""
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Bienvenido",
            showConfirmButton: false,
            timer: 3000,
        });
    }
}



</script>
<style scoped>
.imagen {
    display: flex;
    height: 100vh;
    margin: 0;
    padding: 0;
    border: 1px solid #ccc;
    overflow: hidden;
    background-color: black;
}

#card {
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 10%;
    display: block;
    align-items: center;
    justify-content: center;
    border: 3px solid rgba(29, 88, 32, 0.35);
    border-radius: 10px;
}

/* #card:hover{
    border: 10px solid rgba(30, 118, 34, 0.668);
    border-radius: 1px;
    border-top-right-radius: 10% 30%;
} */


#img {
    max-width: 100%;
    max-height: 100%;
    height: 100vh;
    display: flex;
    margin-bottom: 0;
    border-radius: 2px;
    border: 0.5px solid #999;
    object-fit: cover;
    object-position: center;

}
</style>