<template>
    <div class="q-pa-md">
        <div>
            <q-table flat bordered title="Treats" :rows="user" :columns="columns" row-key="id" :filter="filter"
                :loading="loading" table-header-class="" virtual-scroll :virtual-scroll-item-size="10"
                :virtual-scroll-sticky-size-start="10"  :rows-per-page-options="[15]"
                @virtual-scroll="onScroll">
                <template v-slot:top>
                    <q-btn style="background-color: green; color: white" :disable="loading" label="Agregar"
                        @click="agregar()" />
                    <div style="margin-left: 5%" class="text-h4">Usuarios</div>
                    <q-space />
                    <q-input borderless dense debounce="300" color="primary" v-model="filter"
                        style="border-radius: 10px; border: grey solid 0.5px; padding: 5px">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>
                <template v-slot:body-cell-nombre="props">
                    <q-td :props="props">
                        <q-avatar>
                            <img src="../img/perfil.png">
                        </q-avatar>
                        {{ props.row.nombre }}
                    </q-td>
                </template>
                <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                        <span class="text-green" v-if="props.row.estado == true">Activo</span>
                        <span class="text-red" v-else>Inactivo</span>
                    </q-td>
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-spinner-ios v-if="loading == true" color="green" size="2em" :thickness="10" />
                        <q-btn v-else class="q-mx-sm" color="primary" outline @click="edito(props)">📝</q-btn>
                        <q-btn class="q-mx-sm" color="green" outline @click="activar(props)"
                            v-if="props.row.estado == false">✅</q-btn>
                        <q-btn class="q-mx-sm" color="red" outline @click="activar(props)" v-else>❌</q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
        <q-dialog v-model="alert" persistent>
            <q-card id="card">
                <div style="display: flex;">
                    <q-card-section>
                        <div class="text-h4">Registro de Usiarios</div>
                    </q-card-section>
                    <div style="margin-left: auto;    margin-bottom: auto;">
                        <q-btn @click="toggleX, limpiarFormulario()" class="close-button" icon="close" />
                    </div>
                </div>

                <q-card-section class="q-pt-none" id="card">
                    <q-card flat bordered class="my-card">
                        <q-card-section class="q-pa-md">
                            <div class="q-gutter-md">
                                <q-input v-model="nombre" label="Nombre" :rules="[(val) => !!val || 'Campo requerido']" />
                            </div>
                            <div class="q-gutter-md">
                                <q-input v-model="email" type="email" suffix="Example@soy.sena.edu.co" label="E-mail"
                                    :rules="[validarEmail]">
                                    <template v-slot:append>
                                        <q-icon name="mail" />
                                    </template>
                                </q-input>
                            </div>
                            <div class="q-gutter-md">
                                <q-input v-model.number="telefono" type="number" label="Telefono"
                                    :rules="[(val) => !!val || 'Campo requerido']" />
                            </div>
                            <div class="q-gutter-md">
                                <q-input v-model.number="cedula" type="number" label="Cedula"
                                    :rules="[(val) => !!val || 'Campo requerido']" />
                            </div>
                            <div class="q-gutter-md" v-if="bd === false">
                                <q-input v-model="password" :type="isPwd ? 'password' : 'text'" label="Ingresar password"
                                    :rules="[(val) => !!val || 'Campo requerido']">
                                    <template v-slot:append>
                                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                            @click="isPwd = !isPwd" />
                                    </template>
                                </q-input>
                            </div>
                            <div></div>
                        </q-card-section>
                        <q-card-section>
                            <div role="alert"
                                style=" border: 2px solid red; border-radius: 20px;  text-align: center;  background-color: rgba(255, 0, 0, 0.304);"
                                v-if="check !== ''">
                                <div>
                                    {{ check }}
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cerrar" @click="limpiarFormulario()" color="primary" v-close-popup />
                    <q-btn flat label="Guardar" v-if="bd === false" @click="validarYGuardar" color="primary" />
                    <q-btn flat label="Editar Usuario" v-else @click="validaredit" color="primary" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useUsuariosStore } from "../stores/usuarios.js";
const useUsuario = useUsuariosStore();
let alert = ref(false);
let bd = ref(false);
let check = ref("");
let isPwd = ref(true);
let user = ref([]);
let nombre = ref("");
let email = ref("");
let telefono = ref("");
let cedula = ref("");
let password = ref("");
let loading = ref(false);
let indice = ref(null);
let r = ref("");

const emailValido = ref(true); // Inicialmente se asume que el correo es válido

const validarEmail = (val) => {
    // Expresión regular para validar una dirección de correo electrónico
    const patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Utiliza la expresión regular para verificar el formato
    if (!patron.test(val)) {
        emailValido.value = false;
        return "Revisa la sintaxis de tu correo";
    } else {
        emailValido.value = true;
        return true;
    }
};

let columns = [
    { name: "nombre", align: "center", label: "Usuario", field: "nombre" },
    { name: "email", label: "E-mail", align: "center", field: "email" },
    { name: "telefono", label: "Telefono", align: "center", field: "telefono" },
    { name: "estado", label: "Estado", align: "center", field: "estado" },
    { name: "opciones", label: "Opciones", align: "center", field: "opciones" },
];
const originalRows = [];
const filter = ref("");

function mostrarAlerta(mensaje) {
    alert.value = true;
    check.value = mensaje;
}
async function validarYGuardar() {
    validarEmail()
    if (nombre.value.trim() === "") {
        mostrarAlerta("El Nombre es obligatorio");
    } else if (email.value.trim() === "") {
        mostrarAlerta("El Correo Electrónico es obligatorio");
    } else if (emailValido.value === true) {
        mostrarAlerta("Escriba correctamente el su E-mail");
    } else if (!telefono.value) {
        mostrarAlerta("El Teléfono es obligatorio");
    } else if (!cedula.value) {
        mostrarAlerta("La Cédula es obligatoria");
        console.log(cedula.value);
    } else if (password.value.trim() === "") {
        mostrarAlerta("La Contraseña es obligatoria");
    } else {
        alert.value = false;
        guardar()

    }


}
async function guardar() {
    loading.value = true;
    try {
        const response = await useUsuario.addUsuarios({
            nombre: nombre.value,
            email: email.value,
            telefono: telefono.value,
            cedula: cedula.value,
            password: password.value,
        });

        if (response.status === 200) {
            console.log("Se guardó un nuevo usuario");
            listarUsuarios();
            limpiarFormulario();
            alert.value = false; // Cierra la alerta
        } else {
            console.error("Error al guardar el usuario");
            // Puedes mostrar un mensaje de error aquí si es necesario
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        // Puedes manejar errores de red u otros errores aquí si es necesario
    } finally {
        loading.value = false;
    }
}
async function validaredit() {

    if (!nombre.value) {
        mostrarAlerta("El nombre es obligatorio");
    } else if (!email.value) {
        mostrarAlerta("El correo electrónico es obligatorio");
    } else if (!telefono.value) {
        mostrarAlerta("El teléfono es obligatorio");
    } else if (!cedula.value) {
        mostrarAlerta("La cédula es obligatoria");
        console.log(cedula.value);
    } else {
        // Todos los campos están completos y válidos, guarda los datos
        console.log("paso validacion");
        await editarUser()
        // Cierra el modal
    }

}

function edito(props) {
    r.value = props.row;
    bd.value = true;
    alert.value = true;
    indice.value = r.value._id;
    nombre.value = r.value.nombre;
    email.value = r.value.email;
    telefono.value = r.value.telefono;
    cedula.value = r.value.cedula;
}

async function editarUser() {
    loading.value = true;
    console.log("hola estoy editando");
    let r = await useUsuario.editUsuarios(indice.value, {
        nombre: nombre.value,
        email: email.value,
        telefono: telefono.value,
        cedula: cedula.value,
    });
    console.log(r);
    bd.value = false;
    loading.value = false;
    console.log("limpiando datos");
    listarUsuarios();
    limpiarFormulario();
}

async function activar(props) {
    r.value = props.row;
    if (r.value.estado === true) {
        r.value.estado = false;
        console.log(r.value.estado, "resultado del if condicion");
    } else {
        r.value.estado = true;
        console.log(r.value.estado, "resultado del else condicion");
    }
    let est = await useUsuario.activarUsuarios(r.value._id);
    console.log(est);
}

function limpiarFormulario() {
    console.log("limpiar datos");
    nombre.value = "";
    email.value = "";
    telefono.value = "";
    cedula.value = "";
    password.value = "";
    alert.value = false;
    bd.value = false;
}

listarUsuarios();
async function listarUsuarios() {
    let usuarios = await useUsuario.getUsuarios();
    console.log(usuarios);
    user.value = usuarios.data.Usuarios;
}

function agregar() {
    alert.value = true;

}
onMounted(() => {
    listarUsuarios();
    limpiarFormulario();
});
</script>
<style scoped>
#card {
    width: 35em;
    max-width: 100%;
}

.btng {
    background-color: rgba(0, 0, 0, 0);
    border-color: rgba(0, 0, 0, 0);
}

/* Define la animación de entrada para la "X" */
@keyframes fadeInX {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Define la animación de salida para la "X" */
@keyframes fadeOutX {
    from {
        opacity: 1;
        transform: translateX(0);
    }

    to {
        opacity: 0;
        transform: translateX(-20px);
    }
}

/* Aplica las transiciones y animaciones */
.close-button {
    animation-duration: 0.3s;
    /* Duración de la animación */
    animation-timing-function: ease;
    /* Función de temporización (puedes ajustarla) */
}

/* Inicialmente, la "X" estará invisible */
.close-button:before {
    opacity: 0;
}

/* Cuando la "X" está activa, aplica la animación de entrada */
.close-button.active:before {
    animation-name: fadeInX;
    opacity: 1;
}

/* Cuando la "X" está inactiva, aplica la animación de salida */
.close-button:not(.active):before {
    animation-name: fadeOutX;
    opacity: 0;
}
</style>