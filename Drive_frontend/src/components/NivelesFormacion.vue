<template>
    <div class="card-container">
        <div>
            <q-table class="tabla" flat bordered title="Treats" :rows="formacion" :columns="columns" row-key="id"
                :filter="filter" :loading="loading" table-header-class="" virtual-scroll :virtual-scroll-item-size="20"
                :virtual-scroll-sticky-size-start="20" :rows-per-page-options="[15]">>
                <template v-slot:top>
                    <q-btn style="background-color: green; color: white" :disable="loading" label="Agregar"
                        @click="alert = true" />
                    <div style="margin-left: 5%" class="text-h4">Niveles de Formacion</div>
                    <q-space />
                    <q-input borderless dense debounce="300" color="primary" v-model="filter"
                        style="border-radius: 10px; border: grey solid 0.5px; padding: 5px">
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
                        <q-spinner-ios v-if="loading == true" color="green" size="2em" :thickness="10" />
                        <q-btn v-else class="q-mx-sm" color="primary" outline @click="edito(props)">📝</q-btn>
                        <q-btn class="q-mx-sm" color="green" outline v-if="props.row.estado == false"
                            @click="activar(props)">✅</q-btn>
                        <q-btn class="q-mx-sm" color="red" outline v-else @click="activar(props)">❌</q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>

        <q-dialog v-model="alert">
            <q-spinner-ios v-if="loading == true" color="green" size="20em" :thickness="100" />
            <q-card v-else id="card">
                <q-card-section>
                    <div class="text-h4" v-if="bd === false">Registro de Nivel de Formacion</div>
                    <div class="text-h4" v-else>Edicion de Nivel de Formacion</div>
                </q-card-section>
                <q-card-section class="q-pt-none" id="card">
                    <q-card flat bordered class="my-card">
                        <q-card-section class="q-pa-md">
                            <!-- <div class="q-gutter-md">
                                <q-input v-model="codigo" label="Código" :rules="[(val) => !!val || 'Campo requerido']" />
                            </div> -->
                            <div class="q-gutter-md">
                                <q-select v-model="denominacion" :options="opciones"
                                    label="Selecciona un nivel de formacion "
                                    :rules="[(val) => !!val || 'Campo requerido']" />
                            </div>

                        </q-card-section>
                        <q-card-section>
                            <div role="alert" style="
                    border: 2px solid red;
                    border-radius: 20px;
                    text-align: center;
                    background-color: rgba(255, 0, 0, 0.304);" v-if="check !== ''">
                                <div>
                                    {{ check }}
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cerrar" @click="limpiarFormulario()" color="primary" v-close-popup />
                    <q-btn flat label="Guardar" v-if="bd === false" @click="validarYGuardar()" color="primary" />
                    <q-btn flat label="Editar Nivel de forcacion" v-else @click="validareditar()" color="primary" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNivelesFormacionStore } from "../stores/Nivel_Formacion.js";
const useNivel = useNivelesFormacionStore();
import { useLoginStore } from "../stores/login.js"
const useLogin = useLoginStore()
let formacion = ref([]);
let check = ref("");
let bd = ref(false);
let r = ref("");
let alert = ref(false);
let denominacion = ref("");
let codigo = ref("");
let indice = ref(null);
let opciones = [
    "Auxiliar",
    "Operario",
    "Técnico",
    "Profundización Técnica",
    "Tecnólogo",
    "Especialización Tecnológica",
];

let columns = [
    { name: "denominacion", label: "Denominacion", align: "center", field: "denominacion", },
    { name: "estado", label: "Estado", align: "center", field: "estado" },
    { name: "opciones", label: "Opciones", align: "center", field: "opciones" },
];
const filter = ref("");
const loading = ref(false);

async function obtenerformacion() {
    let Niveles = await useNivel.getNivelesFormacion(useLogin.token);
    console.log(Niveles);
    formacion.value = Niveles.data.Nivel;
}

async function validarYGuardar() {
    if (denominacion.value.trim() === "") {
        mostrarAlerta("La Denominacion es obligatoria");
    } else {
        alert.value = false;
        guardar();
    }
}
async function guardar() {
    loading.value = true;
    let res = await useNivel.addNivelesFormacion({
        denominacion: denominacion.value,
    });
    console.log(res);
    console.log("se guardo un nuevo programa");
    loading.value = false;
    obtenerformacion();
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
    let est = await useNivel.activarNivelesFormacion(r.value._id);
    console.log(est);
}
async function validareditar() {
    if (denominacion.value.trim() === "") {
        mostrarAlerta("La Denominacion es obligatoria");
    } else {
        alert.value = false;
        editarPrograma();
    }
}
async function editarPrograma() {
    loading.value = true;
    console.log(indice.value);
    let res = await useNivel.editNivelesFormacion(indice.value, {
        denominacion: denominacion.value,
    });
    console.log(indice.value);
    console.log(res);
    bd.value = false;
    loading.value = false;
    obtenerformacion();
    limpiarFormulario();
}

function edito(props) {
    alert.value = true;
    bd.value = true;
    r.value = props.row;
    indice.value = r.value._id;
    console.log(indice.value);
    denominacion.value = r.value.denominacion;
}

function limpiarFormulario() {
    denominacion.value = "";
    bd.value = false
    check.value = ""
}


onMounted(() => {
    obtenerformacion();
    //obtenerOpcionesDesdeBaseDeDatos();
});
</script>

<style scoped>
.tabla {
    margin: 1%;
    border-color: rgba(0, 0, 0, 0.367);
}

.q-table__body td {
    font-weight: bold;

    /* Agrega otros estilos según tus necesidades */
}

.text {
    font-size: 200%;
}

.custom-modal {
    margin-top: -50%;
    height: 90%;
    width: 50%;
    margin: 10%;
    top: -20%;
}

.input {
    width: 107%;
    margin-left: -4%;
}
</style>