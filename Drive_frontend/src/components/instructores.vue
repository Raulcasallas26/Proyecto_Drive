<template >
    <div class="q-pa-md">
        <div v-if="load == true">
            <q-linear-progress ark rounded indeterminate color="green" />
        </div>
        <div v-else>
            <q-table flat bordered title="Treats" :rows="user" :columns="columns" row-key="id" :filter="filter"
                :loading="loading" table-header-class="" virtual-scroll :virtual-scroll-item-size="10"
                :virtual-scroll-sticky-size-start="10" :rows-per-page-options="[15]">
                <template v-slot:top>
                    <q-btn style="background-color: green; color: white" :disable="loading" label="Agregar"
                        @click="agregar()" />
                    <div style="margin-left: 5%" class="text-h4">Instructores</div>
                    <q-space />
                    <q-input borderless dense debounce="300" color="primary" v-model="filter"
                        style="border-radius: 10px; border: grey solid 0.5px; padding: 5px">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>
                <template v-slot:body-cell-perfil="props">
                    <q-td :props="props">
                        <q-avatar @click="detalles(props)">
                            <img src="../img/perfil.png">
                        </q-avatar>
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
                        <q-btn class="q-mx-sm" outline @click="detalles(props)">👁‍🗨</q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
        <q-dialog v-model="alert" persistent>
            <q-spinner-ios v-if="loading == true" color="green" size="20em" :thickness="100" />
            <q-card v-else id="card">
                <div style="display: flex;">
                    <q-card-section>
                        <div class="text-h4" v-if="bd === false"> Registro Instructores</div>
                        <div class="text-h4" v-else> Editar Instructores</div>
                    </q-card-section>
                    <div style="margin-left: auto;    margin-bottom: auto;">
                        <q-btn @click="toggleX, limpiarFormulario()" class="close-button" icon="close" v-close-popup />
                    </div>
                </div>

                <q-card-section class="q-pt-none" id="card">
                    <q-card flat bordered class="my-card">
                        <q-card-section class="q-pa-md">
                            <div class="q-gutter-md">
                                <q-input v-model="nombre" label="Nombre" :rules="[(val) => !!val || 'Campo requerido']" />
                            </div>
                            <div class="q-gutter-md">
                                <q-input v-model="apellido" label="Apellido"
                                    :rules="[(val) => !!val || 'Campo requerido']" />
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
                            <div class="q-gutter-md items-start">
                                <span>curriculum</span><br>
                                <input type="file" @change="subir_curriculum">
                                <!-- <q-input @change="subir_curriculum" label="Curriculum" type="file" /> -->
                            </div>
                            <div class="q-gutter-md">
                                <q-input v-model.number="cedula" type="number" label="Cedula"
                                    :rules="[(val) => !!val || 'Campo requerido']" />
                            </div>
                            <div class="q-gutter-md" v-if="bd === true">
                                <q-input v-model="perfilProfesional" label="Perfil Profecional"
                                    :rules="[(val) => !!val || 'Campo requerido']" />
                            </div>
                            <div class="q-gutter-md" v-if="bd === true">
                                <q-input v-model="RedConocimiento" label="Ret de Conocimiento"
                                    :rules="[(val) => !!val || 'Campo requerido']" />
                            </div>
                            <div class="q-gutter-md" v-if="bd !== true">
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


        <q-dialog v-model="detalle">
            <q-card id="card" style="background-color: rgba(255, 255, 255, 0.959);">
                <div style="display: flex;">
                    <q-card-section>
                        <div class="text-h4">Detalles de {{ nombre }}</div>
                    </q-card-section>
                    <div style="margin-left: auto;    margin-bottom: auto;">
                        <q-btn @click="toggleX, limpiarFormulario()" class="close-button" icon="close" v-close-popup />
                    </div>
                </div>

                <q-card-section class="q-pt-none" id="card">
                    <q-card flat bordered class="my-card" style="border-radius: 10px;">
                        <q-card-section class="q-pa-md">
                            <p><strong style="font-size:large; ">Rol:</strong> {{ r.RolUsuario }}</p>
                            <p><strong style="font-size:large; ">Cedula:</strong> {{ r.cedula }}</p>
                            <p><strong style="font-size:large; ">E-mail:</strong> {{ r.email }}</p>
                            <p><strong style="font-size:large; ">Nombre:</strong> {{ r.nombre }}</p>
                            <p><strong style="font-size:large; ">Apellido:</strong> {{ r.apellido }}</p>
                            <p><strong style="font-size:large; ">Telefono:</strong> {{ r.telefono }}</p>
                            <p><strong style="font-size:large; ">Curriculum:</strong> <a :href="r.curriculum"
                                    target="_blank">Curriculum</a> </p>
                            <p><strong style="font-size:large; ">Perfil Profecional:</strong> {{ r.perfilProfesional }}</p>
                            <p><strong style="font-size:large; ">Red de Conocimiento:</strong> {{ r.RedConocimiento }}</p>
                        </q-card-section>
                        <q-card-section>
                        </q-card-section>
                    </q-card>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cerrar" @click="limpiarFormulario()" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Notify } from "quasar"
import { useUsuariosStore } from "../stores/usuarios.js";
import { useLoginStore } from "../stores/login.js"
import { useRolesUsuariosStore } from "../stores/RolesUsuarios.js";
import { load } from "../routes/direccion.js"
const useUsuario = useUsuariosStore();
const useRoles = useRolesUsuariosStore()
const useLogin = useLoginStore()
let alert = ref(false);
let detalle = ref(false)
let bd = ref(false);
let check = ref("");
let isPwd = ref(true);
let user = ref([]);
let Rol = ref([])
let nombre = ref("");
let apellido = ref("");
let email = ref("");
let telefono = ref("");
let cedula = ref("");
let password = ref("");
let perfilProfesional = ref("");
let curriculum = ref("");
let RolUsuario = ref("");
let RedConocimiento = ref("");
let loading = ref(false);
let indice = ref(null);
let r = ref(""); 
let opciones = ref([])

RolUsuario.value = "Instructor"
const emailValido = ref(true); // Inicialmente se asume que el correo es válido

function subir_curriculum(event) {
    curriculum.value = event.target.files[0]
    console.log(curriculum.value);
}

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
// pinta la tabla principal
let columns = [
    { name: "perfil", align: "center", label: "Perfil", field: "Perfil" },
    { name: "nombre", align: "center", label: "Nombre", field: "nombre" },
    { name: "apellido", align: "center", label: "Apellido", field: "apellido" },
    { name: "email", label: "E-mail", align: "center", field: "email" },
    { name: "estado", label: "Estado", align: "center", field: "estado" },
    { name: "opciones", label: "Opciones", align: "center", field: "opciones" },
];


const originalRows = [];
const filter = ref("");

async function listarUsuarios() {
    load.value = true;
    let usuarios = await useUsuario.getUsuarios(useLogin.token);
    console.log(usuarios);

    // Filtrar usuarios por rol
    let usuariosFiltrados = usuarios.data.Usuarios.filter(usuario => usuario.RolUsuario === "Instructor");

    user.value = usuariosFiltrados;
    load.value = false;
}

async function listarRoles() {
    load.value = true
    let Roles = await useRoles.getRolesUsuarios(useLogin.token);
    console.log(Roles);
    Rol.value = Roles.data.RolesUsuario;
    opciones.value = Rol.value.map(item => ({
        value: item.denominacion,
        label: item.denominacion,
    }))
    load.value = false
}

function mostrarAlerta(mensaje) {
    alert.value = true;
    check.value = mensaje;
}
async function validarYGuardar() {
    validarEmail()
    if (nombre.value.trim() === "") {
        mostrarAlerta("El Nombre es obligatorio");
    } else if (apellido.value.trim() === "") {
        mostrarAlerta("El Apellido es obligatorio");
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
        guardar()
    }


}
async function guardar() {
    loading.value = true;
    try {
        const response = await useUsuario.addUsuarios({
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            cedula: cedula.value,
            curriculum:curriculum.value,
            telefono: telefono.value,
            RolUsuario: RolUsuario.value,
            password: password.value,
        });

        if (response.status === 201) {
            console.log("Se guardó un nuevo usuario");
            alert.value = false;
            listarUsuarios();
            limpiarFormulario();
            // Cierra la alerta
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
    validarEmail()
    if (nombre.value.trim() === "") {
        mostrarAlerta("El Nombre es obligatorio");
    } else if (apellido.value.trim() === "") {
        mostrarAlerta("El Apellido es obligatorio");
    } else if (email.value.trim() === "") {
        mostrarAlerta("El Correo Electrónico es obligatorio");
    } else if (emailValido.value === true) {
        mostrarAlerta("Escriba correctamente el su E-mail");
    } else if (!telefono.value) {
        mostrarAlerta("El Teléfono es obligatorio");
    } else if (!RolUsuario.value) {
        mostrarAlerta("Rol del usrario es obligatorio");
    } else if (!cedula.value) {
        mostrarAlerta("La Cédula es obligatoria");
    } else if (!perfilProfesional.value) {
        mostrarAlerta("El perfil profecional del usuario es obligatorio")
    } else if (!curriculum.value) {
        mostrarAlerta("El curriculum es obligatorio");
    } else if (!RedConocimiento.value) {
        mostrarAlerta("La Red de conocimineto es obligatorio");
    } else {
        // Todos los campos están completos y válidos, guarda los datos
        console.log("paso validacion");
        editarUser()
        // Cierra el modal
    }

}

function detalles(props) {
    r.value = props.row;
    detalle.value = true;
    email.value = r.value.email;
    cedula.value = r.value.cedula;
    nombre.value = r.value.nombre;
    apellido.value = r.value.apellido;
    telefono.value = r.value.telefono;
}

function edito(props) {
    r.value = props.row;
    bd.value = true;
    alert.value = true;
    indice.value = r.value._id;
    nombre.value = r.value.nombre;
    apellido.value = r.value.apellido;
    cedula.value = r.value.cedula;
    telefono.value = r.value.telefono;
    email.value = r.value.email;
    password.value = r.value.password
    perfilProfesional.value = r.value.perfilProfesional
    curriculum.value = r.value.curriculum
    RolUsuario.value = r.value.RolUsuario
    RedConocimiento.value = r.value.RedConocimiento
}

async function editarUser() {
    loading.value = true;
    try {
        console.log("hola estoy editando");
        let r = await useUsuario.editUsuarios(
            indice.value,
            nombre.value,
            apellido.value,
            cedula.value,
            telefono.value,
            email.value,
            password.value,
            perfilProfesional.value,
            curriculum.value,
            RolUsuario.value,
            RedConocimiento.value,

        );
        console.log("se insertaron los datos");
        console.log(r.status, r);
        if (r.status === 201) {
            console.log(r);
            console.log("Se edito el usuario con exito");
            listarUsuarios();
            limpiarFormulario();
            alert.value = false; // Cierra la alerta
        } else {
            console.error("Error al editar el usuario");
            // Puedes mostrar un mensaje de error aquí si es necesario
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        console.log(error);
        // Puedes manejar errores de red u otros errores aquí si es necesario
    } finally {
        loading.value = false;
    }
}

async function activar(props) {
    r.value = props.row;
    if (r.value.estado === true) {
        r.value.estado = false;
        console.log(r.value.estado, "resultado del if condicion");
        Notify.create({
            color: "negative",
            message: "El Instructor fue Desactivado",
            icon: "check",
            position: "top",
            timeout: 3000
        })
    } else {
        r.value.estado = true;
        console.log(r.value.estado, "resultado del else condicion");
        Notify.create({
            color: "positive",
            message: "El Instructor fue Activado",
            icon: "check",
            position: "top",
            timeout: 3000
        })
    }
    let est = await useUsuario.activarUsuarios(r.value._id);
    console.log(est);
}

function limpiarFormulario() {
    nombre.value = "";
    apellido.value = "";
    email.value = "";
    telefono.value = "";
    cedula.value = "";
    password.value = "";
    RolUsuario.value = "";
    bd.value = false;
    check.value = ""
}

listarUsuarios();


function agregar() {
    alert.value = true;
}


onMounted(() => {
    listarUsuarios();
    listarRoles();
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