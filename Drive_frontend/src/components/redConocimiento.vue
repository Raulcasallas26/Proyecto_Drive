<template>
    <div class="card-container">
        <div>
            <q-table class="tabla" flat bordered title="Treats" :rows="red" :columns="columns" row-key="id" :filter="filter"
                :loading="loading">
                <template v-slot:top>
                    <q-btn style="background-color: green" :disable="loading" label="Agregar" @click="showModal = true" />
                    <div style="margin-left: 5%;" class="text-h4">Redes de Conocimiento</div>
                    <q-space />
                    <q-input borderless dense debounce="300" style="border-radius: 10px; border:grey solid 0.5px; padding: 5px;"
                color="primary" v-model="filter">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
                </template>

                <!-- columna para editar -->
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn class="q-mx-sm" color="primary" @click="abrirModalEdicion(props.row)">📝</q-btn>
                        <q-btn class="q-mx-sm" color="green" outline @click="activar(props)"
                            v-if="props.row.estado == false">✅</q-btn>
                        <q-btn class="q-mx-sm" color="red" outline @click="activar(props)" v-else>❌</q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>

        <!-- Modal para agregar centros -->
        <div>
            <q-dialog v-model="showModal">
                <q-card class="custom-modal">
                    <q-card-section>
                        <div class="text">Agregar Redes de Conocimineto</div>

                        <q-input v-model="codigo" label="Código" />
                        <q-input v-model="denominacion" label="Denominacion" />

                    </q-card-section>
                    <q-card-section>
                        <q-btn @click="showModal = false" label="Cancelar" />
                        <q-btn @click="agregarformacion()" color="primary" label="Agregar" />
                    </q-card-section>
                </q-card>
            </q-dialog>
        </div>

        <!-- Modal para editar programas 
      <div>
        <q-dialog v-model="showModalEdicion">
          <q-card class="custom-modal">
            <q-card-section>
              <div class="text">Editar Centro de Formación</div>
              <q-input v-model="nombre" label="Nombre" />
              <q-input v-model="codigo" label="Código" />
              <q-input v-model="ciudad" label="Ciudad" />
              <q-input v-model="direccion" label="direccion" />
              <div></div>
            </q-card-section>
            <q-card-section>
              <q-btn @click="showModalEdicion = false" label="Cancelar" />
              <q-btn
                @click="guardarCambios()"
                color="primary"
                label="Guardar Cambios"
              />
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>-->
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const showModal = ref(false);
const red = ref([]);
const codigo = ref("");
let r = ref("")
let denominacion = ref("");
import { useRedesConocimientoStore } from "../stores/RedesConocimiento.js";
const storeredes = useRedesConocimientoStore();
let columns = [
    { name: "codigo", align: "center", label: "Codigo", field: "codigo" },
    ,
    {
        name: "denominacion",
        label: "Denominacion",
        align: "center",
        field: "denominacion",
    },
    { name: "opciones", label: "Opciones", align: "center", field: "opciones" },
];

const loading = ref(false);
const filter = ref("");

async function obtenerredes() {
    let redes = await storeredes.getRedesConocimiento();
    console.log(redes);
    red.value = redes.data.RedesConocimiento;
    console.log(redes.data);
}
async function agregarformacion() {
    loading.value = true;
    let r = await storeredes.addRedesConocimiento({
        denominacion: denominacion.value,
        codigo: codigo.value,

    });
    console.log(r);
    loading.value = false;
    obtenerredes();
    limpiarFormulario();
    showModal.value = false;
}

function limpiarFormulario() {

    codigo.value = "";
    denominacion.value = "";
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
</style>
