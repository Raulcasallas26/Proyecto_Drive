<!-- <template>
    <div>
        <div class="container">
            <div v-if="errores.length > 0" style="background-color: red; text-align: center;">
                <div v-for="i in errores" :key="i">
                    <span>{{ i.msg }}</span>
                </div>
            </div>
            <div class="avatar">
                <img src="avatar.png" alt="Avatar" />
            </div>
            <h3>Login</h3>
            <form id="admin-login-form">
                <p>
                    <i class="input-icon fas fa-user"></i> Usuario
                    <input type="text" class="input-with-icon" v-model="cedula" />
                </p>
                <p>
                    <i class="input-icon fas fa-lock"></i> Contraseña
                    <input type="password" class="input-with-icon" v-model="password" />
                </p>
                <p>
                    <button class="log" @click="iniciarSesion()">Ingresar</button>
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useLoginStore } from "../stores/login.js"

let useLogin = useLoginStore()
console.log(useLogin);
let router = useRouter();
let ruta = ref("")
let cedula = ref("");
let password = ref("");
let errores = ref([])

function iniciarSesion() {
    console.log("entro a iniciar sesion");
    useLogin.validar(cedula.value, password.value).then((res) => {
        let tok = res.data.tockent;
        sessionStorage.setItem("token", tok);
        console.log(response.data);

        if (res.data.status == 200) {
            console.log("sesion exitosa");
            router.push("/home");
        } else if (res.data.status == 500) {

            alerta_v.value = "Error al iniciar sesion"
            setTimeout(() => {
                alerta_v.value = ""
            }, 3000);
        }
    })

}
</script>
<style scoped>
.container {
    width: 380px;
    height: auto;
    margin: 20px auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f7f7f7;
    text-align: center;
}

.avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px solid black;
    overflow: hidden;
    margin: 0 auto 20px;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

h2 {
    text-align: center;
}

input {
    width: 100%;
    height: 35px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.log {
    width: 100%;
    padding: 10px;
    background-color: #2b7ce6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>



 -->






























<template>
    <q-layout view="lHh lpR lFf">
        <div class="row">
            <div class="col-5" id="imagen">
                <q-loading :showing="isLoading"></q-loading>
                <img :src="currentImage" alt="Cargando imagen..." id="img">
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
                    <div style="display: flex;  justify-content: center;">
                        <q-btn v-if="bd === true" style="background-color: green;display: flex; justify-content: center;"
                            @click="validar()">Iniciar</q-btn>
                    </div>
                    <q-card-section>

                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoginStore } from '../stores/login.js';
import { useRouter } from "vue-router";
const useLogin = useLoginStore();
let router = useRouter();
let isPwd = ref(true)
let rol = ref("")
let cedula = ref("")
let password = ref("")
let check = ref("")
let bd = ref(true)
const options_rol = ref([
    'Administrador', 'Gestor de Red', 'Instructor o Invitado'
])

async function validar() {
    let r = await useLogin.validar(cedula.value, password.value).then((res) =>{
        console.log(r);
        if (res.data.status == 200) {
            console.log("sesion exitosa");
            router.push("/home");
        } else if (res.data.status == 500) {

            check.value = "Error al iniciar sesion"
            setTimeout(() => {
                check.value = ""
            }, 3000);
        }
    })
}
// function Ingresar() {
//     console.log("hola");
//     if (rol.value === "") {
//         check.value = "Debes seleccionar tu rol"
//     } else if (cedula.value.trim() === "") {
//         check.value = "Debes ingresar tus datos"
//     } else if (password.value.trim() === "") {
//         check.value = "debes ingresar tus datos"
//     } else if (cedula.value !== "123456") {
//         check.value = "La informacion de los campos es incorrecta"
//     } else if (password.value !== "123") {
//         check.value = "La informacion de los campos es incorrecta"
//     } else {
//         bd.value = false
//         check.value = ""
//         Swal.fire({
//             position: "center",
//             icon: "success",
//             title: "Bienvenido",
//             showConfirmButton: false,
//             timer: 3000,
//         });
//     }
// }

const images = [
    'https://fulbright.edu.co/wp-content/uploads/2021/09/BARE-5.jpeg',
    'https://agenciapublicadeempleo.sena.edu.co/imgLayout/Boletines%20de%20prensa/Instructor%20SENA-min%20(1).jpg',
    'https://www.portafolio.co/files/article_multimedia/uploads/2019/03/13/5c89a35b58374.jpeg',
    'https://www.culturarecreacionydeporte.gov.co/sites/default/files/styles/1300/public/noticias/imagen/2023-04/sena-scrd_001.jpg?itok=KUwK_eI7',
    // Agrega más URLs de imágenes aquí
];
const currentImageIndex = ref(0);
const currentImage = ref(null);

const changeImage = () => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
    currentImage.value = images[currentImageIndex.value];
};

let timer;

onMounted(() => {
    // Retrasamos el inicio del reloj (timer) para dar tiempo a que las imágenes se carguen
    setTimeout(() => {
        changeImage(); // Cambia la imagen inicial
        timer = setInterval(changeImage, 10000); // Cambia de imagen cada 10 segundos
    }, 2000); // Retraso de 2 segundos para permitir la carga de la primera imagen

    return () => {
        clearInterval(timer); // Limpiamos el timer cuando el componente se desmonta
    };
});

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