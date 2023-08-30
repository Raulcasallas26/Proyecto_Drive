<template>
    <div class="q-pa-md">
        <q-table flat bordered title="Treats" :rows="rows" :columns="columns" row-key="id" :filter="filter"
            :loading="loading">

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
        </q-table>
        <table>
                    <thead>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>E-mail</th>
                        <th>Telefono</th>
                    </thead>
                    <q-spinner-grid color="teal" v-if="cargar === true" />
                    <tbody v-else>
                        <tr v-for="(r, i) in instru" :key="i">
                            <td>{{ r.nombres }}</td>
                            <td>
                                <span v-if="r.estado == true" style="color: green;">
                                    Activo
                                </span>
                                <span v-else style="color: red;">
                                    Inactivo
                                </span>
                            </td>
                            <td>{{ r.email }}</td>
                            <td>{{ r.telefono }}</td>
                        </tr>
                    </tbody>
                </table>
        <q-dialog v-model="alert">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Registro</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <q-card flat bordered class="my-card">
                        <q-card-section class="q-pa-md" style="width: 500px">
                            <div class="q-pa-md" style="max-width: 500px">
                                <div class="q-gutter-md">
                                    <q-select v-model="rol" :options="options_rol" label="Rol" />
                                </div>
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="nombre" label="Nombre" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="email" label="E-mail" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="telefono" label="Telefono" />
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
import { useInstructoresStore } from "../stores/instructores.js"
const useInstructor = useInstructoresStore();
let alert = ref (false)
let check = ref ("")
let instru = ref ("")
let rol = ref ("")
let nombre = ref ("")
let estado = ref ("")
let email = ref ("")
let telefono = ref ("")
const options_rol = ref([
    'Administrador', 'Gestor de Red', 'Instructor o Invitado'
])
let columns = [
    { name: 'nombre', align: 'center', label: 'Instructor', },
    { name: 'estado', label: 'Estado', align: 'center' },
    { name: 'email', label: 'E-mail', align: 'center' },
    { name: 'telefono', label: 'Telefono', align: 'center' },
]
const originalRows = [
]
const loading = ref(false)
const filter = ref('')
const rowCount = ref(10)
const rows = ref([...originalRows])
async function guardar() {
    loading.value = true
    let r = await useInstructor.addInstructores({
        rol : rol.value,
        nombres : nombre.value,
        email : email.value,
        telefono : telefono.value
    })
    console.log(r);
    loading.value = false
    listarInstructor()
    limpiarFormulario()
}

function limpiarFormulario() {
    rol.value = ""
    nombre.value = ""
    email.value = ""
    telefono.value = ""
}

listarInstructor()
async function listarInstructor() {
    let instructor = await useInstructor.getInstructores()
    console.log(instructor);
    instru.value = instructor.data.instructores
}

function agregar() {
    alert.value = true
}
onMounted(() => {
    listarInstructor()
})

</script>
<style scoped>
table {
    color: #000000;
    font-family: Helvetica, Arial, sans-serif;
    border-collapse: collapse;
    width: max-content;
    width: 100%;
}

td,
th {
    border: 1px solid rgb(113, 113, 113);
}

th {
    background: green;
    font-weight: bold;
    font-size: large;
    padding: 15px;
}

td {
    background: green;
    text-align: center;
    padding: 5px;
    font-size: medium;
}

tr:nth-child(even) td {
    background: #00a00032;
}

tr:nth-child(odd) td {
    background: #FEFEFE;
}

tr td:hover {
    background: rgb(255, 255, 255);
    color:green;
}
</style>