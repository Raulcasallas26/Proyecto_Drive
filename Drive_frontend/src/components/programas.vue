<template>
  <div class="card-container">
    <div>
      <q-table class="tabla" flat bordered title="Treats" :rows="proga" :columns="columns" row-key="id" :filter="filter"
        :loading="loading" table-header-class="" virtual-scroll :virtual-scroll-item-size="20"
        :virtual-scroll-sticky-size-start="20" :pagination="pagination" :rows-per-page-options="[15]"
        @virtual-scroll="onScroll">>
        <template v-slot:top>
          <q-btn style="background-color: green; color: white;" :disable="loading" label="Agregar"
            @click="alert = true" />
          <div style="margin-left: 5%;" class="text-h4">Programas</div>
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter"
            style="border-radius: 10px; border:grey solid 0.5px; padding: 5px;">
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
            <q-btn class="q-mx-sm" color="green" outline v-if="props.row.estado == false" @click="activar(props)">✅</q-btn>
            <q-btn class="q-mx-sm" color="red" outline v-else @click="activar(props)">❌</q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="alert">
      <q-card id="card" style="width: 35%;">
        <q-card-section>
          <div class="text-h4">Registro</div>
        </q-card-section>
        <q-card-section class="q-pt-none" id="card">
          <q-card flat bordered class="my-card">
            <q-card-section class="q-pa-md">
              <div class="q-gutter-md">
                <q-input v-model="codigo" label="Código" />
              </div>
              <div class="q-gutter-md">
                <q-input v-model="denominacion" label="Denominación" />
              </div>
              <div class="q-gutter-md">
                <q-input v-model="version" label="Versión" />
              </div>
              <div class="q-gutter-md">
                <q-select v-model="niveldeformacion" :options="opciones" label="Selecciona una opción" />
              </div>
              <div>
                <q-select v-model="redDeConocimientoSeleccionada" :options="opcionesRedDeConocimiento"
                  label="Red de Conocimiento" />
              </div>
              <q-card-section>
                <q-input class="input" v-model="archivoOEnlace" label="Archivo o enlace del diseño curricular"
                  dense clearable prepend-icon="attach_file" @clear="limpiarCampo">
                  <template v-slot:append>
                    <q-icon name="attach_file" style="cursor: pointer" @click="abrirSelectorDeArchivos" />
                  </template>
                </q-input>
              </q-card-section>
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
          <q-btn flat label="Cerrar" @click="limpiarFormulario(), cerrar()" color="primary" v-close-popup />
          <q-btn flat label="Guardar" v-if="bd === false" @click="guardar()" color="primary" v-close-popup />
          <q-btn flat label="Editar Usuario" v-else @click="editarPrograma()" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProgramasFormacionStore } from "../stores/programasformacion.js";

const useProgramas = useProgramasFormacionStore();
let proga = ref([]);
let check = ref("");
let bd = ref(false);
let r = ref("")
let alert = ref(false);
let denominacion = ref("");
let codigo = ref("");
let version = ref("");
let indice = ref(null)
let opciones = [
  "auxiliar",
  "operario",
  "técnico",
  "profundización técnica",
  "tecnólogo",
  "especialización tecnológica",
];

let columns = [
  { name: "codigo", align: "center", label: "Codigo", field: "codigo" },
  { name: "denominacion", label: "Denominacion", align: "center", field: "denominacion", },
  { name: "version", label: "Version", align: "center", field: "version" },
  { name: "estado", label: "Estado", align: "center", field: "estado" },
  { name: "opciones", label: "Opciones", align: "center", field: "opciones" },
];
const filter = ref("");
const loading = ref(false);

async function obtenerformacion() {
  let programas = await useProgramas.getProgramasFormacion();
  console.log(programas);
  proga.value = programas.data.ProgramasFormacion;
}

async function guardar() {
  loading.value = true
  let res = await useProgramas.addProgramasFormacion({
    denominacion: denominacion.value,
    codigo: codigo.value,
    version: version.value
  })
  console.log(res);
  console.log("se guardo un nuevo programa");
  loading.value = false
  obtenerformacion()
  limpiarFormulario()
}

async function activar(props) {
  r.value = props.row
    if (r.value.estado === true) {
        r.value.estado = false
        console.log(r.value.estado, "resultado del if condicion");
    } else {
        r.value.estado = true
        console.log(r.value.estado, "resultado del else condicion");
    }
    let est = await useProgramas.activarProgramasFormacion(r.value._id)
    console.log(est);
}

async function editarPrograma() {
  loading.value = true
  console.log(indice.value);
  let res = await useProgramas.editProgramasFormacion(indice.value, {
    denominacion: denominacion.value,
    codigo: codigo.value,
    version: version.value,
  })
  console.log(indice.value);
  console.log(res);
  bd.value = false
  loading.value = false
  obtenerformacion()
  limpiarFormulario()
}

function edito(props) {
  alert.value = true
  bd.value = true
  r.value = props.row
  indice.value = r.value._id
  console.log(indice.value);
  denominacion.value = r.value.denominacion
  codigo.value = r.value.codigo
  version.value = r.value.version
}

function limpiarFormulario() {
  denominacion.value = "";
  codigo.value = "";
  version.value = "";
  opciones.value = ""
}
const niveldeformacion = ref(null);

const archivoOEnlace = ref(""); // Variable para almacenar el nombre del archivo seleccionado

const abrirSelectorDeArchivos = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style.display = 'none';
  fileInput.addEventListener('change', handleFileSelection);
  document.body.appendChild(fileInput);
  fileInput.click();
};

const handleFileSelection = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    archivoOEnlace.value = selectedFile.name;
    alert(`Archivo seleccionado: ${selectedFile.name}`);
  }
  event.target.remove(); // Elimina el input de tipo file después de su uso
};

function cerrar() {
  bd.value = false
  alert.value = false
}

// Función para limpiar el campo
const limpiarCampo = () => {
  archivoOEnlace.value = "";
};

//fin
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