<template>
    <div class="card-container">
        <div>
            <q-table class="tabla" flat bordered title="Treats" :rows="red" :columns="columns" row-key="id" :filter="filter"
                :loading="loading" able-header-class="" virtual-scroll :virtual-scroll-item-size="10"
                :virtual-scroll-sticky-size-start="10" :pagination="pagination" :rows-per-page-options="[15]"
                @virtual-scroll="onScroll">
                <template v-slot:top>
                    <q-btn style="background-color: green" :disable="loading" label="Agregar" @click="agregar()" />
                    <div style="margin-left: 5%;" class="text-h4">Redes de Conocimiento</div>
                    <q-space />
                    <q-input borderless dense debounce="300"
                        style="border-radius: 10px; border:grey solid 0.5px; padding: 5px;" color="primary"
                        v-model="filter">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>

                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn class="q-mx-sm" color="primary" outline @click="edito(props)">📝</q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
        <div>
            <q-dialog v-model="alert" persistent>
                <q-card id="card" style="width: 35%;">
                    <div style="display: flex;">
                        <q-card-section>
                            <div class="text-h4">Registro</div>
                        </q-card-section>
                        <div style="margin-left: auto;    margin-bottom: auto;">
                            <q-btn @click="toggleX, limpiarFormulario()" class="close-button" icon="close" />
                        </div>
                    </div>
                    <q-card-section>
                        <div class="text-h4">Registro</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none" id="card">
                        <q-card flat bordered class="my-card">
                            <q-card-section class="q-pa-md">
                                <div class="q-gutter-md">
                                    <q-input v-model="codigo" type="text" label="Codigo" />
                                </div>
                                <div class="q-gutter-md">
                                    <q-input v-model="denominacion" type="text" label="Denominacion" />
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
                        <q-btn flat label="Cerrar" @click="limpiarFormulario()" color="primary" v-close-popup />
                        <q-btn flat label="Guardar" v-if="bd === false" @click="guardar()" color="primary" v-close-popup />
                        <q-btn flat label="Editar Usuario" v-else @click="editarRed()" color="primary" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
let red = ref([]);
let alert = ref(false)
let check = ref("")
let r = ref("")
let bd = ref(false)
let indice = ref(null)
let codigo = ref("");
let denominacion = ref("");
import { useRedesConocimientoStore } from "../stores/RedesConocimiento.js";
const useRedes = useRedesConocimientoStore();
let columns = [
    { name: "codigo", align: "center", label: "Codigo", field: "codigo" },
    { name: "denominacion", label: "Denominacion", align: "center", field: "denominacion", },
    { name: "opciones", label: "⚫⚫⚫", align: "center", field: "opciones" },
];

const loading = ref(false);
const filter = ref("");

async function obtenerredes() {
    let redes = await useRedes.getRedesConocimiento();
    console.log(redes);
    red.value = redes.data.RedesConocimiento;
    console.log(redes.data);
}

async function guardar() {
    loading.value = true;
    let r = await useRedes.addRedesConocimiento({
        denominacion: denominacion.value,
        codigo: codigo.value,

    });
    console.log(r);
    loading.value = false;
    obtenerredes();
    limpiarFormulario();
    alert.value = false;
}

async function editarRed() {
    loading.value = true
    console.log(indice.value);
    let res = await useRedes.editRedesConocimiento(indice.value, {
        denominacion: denominacion.value,
        codigo: codigo.value,
    })
    console.log(indice.value);
    console.log(res);
    bd.value = false
    loading.value = false
    obtenerredes()
    limpiarFormulario()
}

function edito(props) {
    agregar()
    bd.value = true
    r.value = props.row
    indice.value = r.value._id
    console.log(indice.value);
    denominacion.value = r.value.denominacion
    codigo.value = r.value.codigo
}

function limpiarFormulario() {
    console.log("limpie el formulario");
    denominacion.value = "";
    codigo.value = "";
    alert.value = false
    bd.value = false
}
function agregar() {
    alert.value = true
}

onMounted(async () => {
    await obtenerredes();

});
</script>
<style scoped>
.text {
    font-size: 400%;
    color: green;
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
}</style>
