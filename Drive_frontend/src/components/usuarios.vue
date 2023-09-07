<template>
    <div class="q-pa-md">
        <div>
            <q-table flat bordered title="Treats" :rows="user" :columns="columns" row-key="id" :filter="filter"
                :loading="loading" table-header-class="" virtual-scroll :virtual-scroll-item-size="20"
                :virtual-scroll-sticky-size-start="20" :pagination="pagination" :rows-per-page-options="[0]"
                @virtual-scroll="onScroll">
                <template v-slot:top>
                    <q-btn style="background-color: green;" :disable="loading" label="Agregar" @click="agregar()" />
                    <q-btn v-if="rows.length !== 0" class="q-ml-sm" color="primary" :disable="loading" label="Remove row"
                        @click="removeRow" />
                    <q-space />
                    <q-input borderless dense debounce="300" color="primary" v-model="filter">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>
                <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                        <span class="text-green" v-if="props.row.estado == true">Activo</span>
                        <span class="text-red" v-else>Inactivo</span>
                    </q-td>
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn class="q-mx-sm" color="primary">📝</q-btn>
                        <q-btn class="q-mx-sm" color="green" outline v-if="props.row.estado == false">✅</q-btn>
                        <q-btn class="q-mx-sm" color="red" outline v-else>❌</q-btn>
                    </q-td>
                </template>

            </q-table>
        </div>
        <q-dialog v-model="alert">
            <q-card id="card">
                <q-card-section>
                    <div class="text-h6">Registro</div>
                </q-card-section>
                <q-card-section class="q-pt-none" id="card">
                    <q-card flat bordered class="my-card">
                        <q-card-section class="q-pa-md">
                            <div class="q-pa-md">
                                <div class="q-gutter-md">
                                    <q-select v-model="rol" :options="options_rol" label="Rol" />
                                </div>
                            </div>
                            <div class="q-gutter-md">
                                <q-input v-model="nombre" label="Nombre" />
                            </div>
                            <div class="q-gutter-md">
                                <q-input type="email" v-model="email" label="E-mail" />
                            </div>
                            <div class="q-gutter-md">
                                <q-input v-model="telefono" label="Telefono" />
                            </div>
                            <div class="q-gutter-md">
                                <q-input v-model="cedula" label="Cedula" />
                            </div>
                            <div class="q-gutter-md">
                                <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'"
                                    label="Ingresar password">
                                    <template v-slot:append>
                                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                            @click="isPwd = !isPwd" />
                                    </template>
                                </q-input>
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <div role="alert"
                                style="border: 2px solid red; border-radius: 20px; text-align: center; background-color: rgba(255, 0, 0, 0.304);"
                                v-if="check !== ''">
                                <div>
                                    {{ check }}
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cerrar" color="primary" v-close-popup />
                    <q-btn flat label="Guardar" @click="guardar()" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUsuariosStore } from "../stores/usuarios.js"
const useUsuario = useUsuariosStore();
let alert = ref(false)
let check = ref("")
let isPwd = ref(true);
let user = ref([])
let rol = ref("")
let nombre = ref("")
let estado = ref("")
let email = ref("")
let telefono = ref("")
let cedula = ref("")
let password = ref("")
const options_rol = ref([
    'Administrador', 'Gestor de Red', 'Instructor o Invitado'
])
let columns = [
    { name: 'nombre', align: 'center', label: 'Usuario', field: "nombre" },
    { name: 'email', label: 'E-mail', align: 'center', field: "email" },
    { name: 'telefono', label: 'Telefono', align: 'center', field: "telefono" },
    { name: 'estado', label: 'Estado', align: 'center', field: "estado" },
    { name: 'opciones', label: 'Opciones', align: 'center', field: "opciones" },
]
const originalRows = [
]
const loading = ref(false)
const filter = ref('')
const rowCount = ref(10)
const rows = ref([...originalRows])
async function guardar() {
    loading.value = true
    let r = await useUsuario.addUsuarios({
        rol: rol.value,
        nombre: nombre.value,
        email: email.value,
        telefono: telefono.value,
        cedula: cedula.value,
        password: password.value
    })
    console.log(r);
    loading.value = false
    listarUsuarios()
    limpiarFormulario()
}

function limpiarFormulario() {
    rol.value = ""
    nombre.value = ""
    email.value = ""
    telefono.value = ""
    cedula.value = ""
    password.value = ""
}

listarUsuarios()
async function listarUsuarios() {
    let usuarios = await useUsuario.getUsuarios()
    console.log("hola");
    console.log(usuarios);
    user.value = usuarios.data.Usuarios
}

function agregar() {
    alert.value = true
}
onMounted(() => {
    listarUsuarios()
})

</script>
<style scoped>
#card {
    width: 35em;
    max-width: 100%;
}
</style>