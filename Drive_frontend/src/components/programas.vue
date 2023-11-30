<template>
  <div class="card-container">
    <div v-if="load == true" style="margin-top: 5px;">
      <q-linear-progress ark rounded indeterminate color="green" />
    </div>
    <div v-else>
      <q-table class="tabla" flat bordered title="Treats" :rows="proga" :columns="columns" row-key="id" :filter="filter"
        :loading="loading" table-header-class="" virtual-scroll :virtual-scroll-item-size="20"
        :virtual-scroll-sticky-size-start="20" :rows-per-page-options="[15]">>
        <template v-slot:top>
          <q-btn style="background-color: green; color: white" :disable="loading" label="Agregar" @click="alert = true" />
          <div style="margin-left: 5%" class="text-h4">Programas De Formacion</div>
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter"
            style="border-radius: 10px; border: grey solid 0.5px; padding: 5px">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-archivo="props">
          <q-td :props="props">
            <q-spinner-ios v-if="loading == true" color="green" size="2em" :thickness="10" />
            <p><strong><a :href="props.row.archivo" target="_blank"> Documento</a></strong> </p>
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
            <q-btn class="q-mx-sm" color="green" outline v-if="props.row.estado == false"
              @click="activar(props)">✅</q-btn>
            <q-btn class="q-mx-sm" color="red" outline v-else @click="activar(props)">❌</q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="alert" persistent>
      <q-spinner-ios v-if="loading == true" color="green" size="20em" :thickness="100" />
      <q-card v-else id="card">
        <div style="display: flex;">
          <q-card-section>
            <div class="text-h4" v-if="bd === false">Registrar Programa</div>
            <div class="text-h4" v-else>Editar Programa</div>
          </q-card-section>
          <div style="margin-left: auto;    margin-bottom: auto;">
            <q-btn @click="toggleX, limpiarFormulario()" class="close-button" icon="close" />
          </div>
        </div>
        <q-card-section class="q-pt-none" id="card">
          <q-card flat bordered class="my-card">
            <q-card-section class="q-pa-md">
              <div class="q-gutter-md">
                <q-input v-model="denominacion" label="Denominación" :rules="[(val) => !!val || 'Campo requerido']" />
              </div>
              <div class="q-gutter-md">
                <q-input v-model="version" label="Versión" :rules="[(val) => !!val || 'Campo requerido']" />
              </div>
              <div class="q-gutter-md">
                <q-select v-model="niveldeformacion" :options="opciones" label="Selecciona un nivel de formacion "
                  :rules="[(val) => !!val || 'Campo requerido']" />
              </div>
              <q-card-section>
                <input type="file" @change="subir_archivo">
              </q-card-section>
            </q-card-section>
            <q-card-section>
              <div role="alert" style="
                  border: 2px solid red;
                  border-radius: 20px;
                  text-align: center;
                  background-color: rgba(32, 15, 15, 0.304);
                " v-if="check !== ''">
                <div>
                  {{ check }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" @click="limpiarFormulario(), cerrar()" color="primary" v-close-popup />
          <q-btn flat label="Guardar" v-if="bd === false" @click="validarYGuardar()" color="primary" />
          <q-btn flat label="Editar Programa" v-else @click="validareditar()" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProgramasFormacionStore } from "../stores/programasformacion.js";
import { useLoginStore } from "../stores/login.js"
import { load } from "../routes/direccion.js"
const useProgramas = useProgramasFormacionStore();
const useLogin = useLoginStore()
let proga = ref([]);
let check = ref("");
let bd = ref(false);
let r = ref("");
let niveldeformacion = ref("");
let alert = ref(false);
let archivo = ref("");
let denominacion = ref("");
let version = ref("");
let indice = ref(null);


function subir_archivo(event) {
  archivo.value = event.target.files[0]
  console.log(archivo.value);
}

let columns = [
  { name: "denominacion", label: "Denominacion", align: "center", field: "denominacion", },
  { name: "version", label: "Version", align: "center", field: "version" },
  { name: "nivel de formacion", label: "Nivel de formacion", align: "center", field: "niveldeformacion" },
  { name: "archivo", label: "Documentos", align: "center", field: "archivo" },
  { name: "estado", label: "Estado", align: "center", field: "estado" },
  { name: "opciones", label: "Opciones", align: "center", field: "opciones" },
];
const filter = ref("");
const loading = ref(false);

async function obtenerformacion() {
  load.value = true
  let programas = await useProgramas.getProgramasFormacion(useLogin.token);
  console.log(programas);
  proga.value = programas.data.ProgramasFormacion;
  load.value = false
}
function mostrarAlerta(mensaje) {
  alert.value = true;
  check.value = mensaje;
}
async function validarYGuardar() {
  if (denominacion.value.trim() === "") {
    mostrarAlerta("La Denominacion es obligatoria");
  } else if (!version.value) {
    mostrarAlerta("La version es obligatoria");
  } else if (!niveldeformacion.value) {
    mostrarAlerta("el Nivel de formacion es oblogatorio");
  } else {
    guardar();
  }
}

async function guardar() {
  loading.value = true;
  try {
    let res = await useProgramas.addProgramasFormacion({
      denominacion: denominacion.value,
      version: version.value,
      niveldeformacion: niveldeformacion.value,
      archivo: archivo.value,
    });

    if (res.status === 201) {
      console.log(res);
      console.log("Se guardó un nuevo Programa");
      alert.value = false;
      obtenerformacion();
      limpiarFormulario();
      // Cierra la alerta
    } else {
      console.log(res);
      console.error("Error al guardar el programa");
      // Puedes mostrar un mensaje de error aquí si es necesario
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
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
  } else {
    r.value.estado = true;
    console.log(r.value.estado, "resultado del else condicion");
  }
  let est = await useProgramas.activarProgramasFormacion(r.value._id);
  console.log(est);
}
async function validareditar() {
  if (denominacion.value.trim() === "") {
    mostrarAlerta("La Denominacion es obligatoria");
  } else if (!version.value) {
    mostrarAlerta("La version es obligatoria");
  } else if (!niveldeformacion.value) {
    mostrarAlerta("el Nivel de formacion es oblogatorio");
  } else if (!archivo.value) {
    mostrarAlerta("el Diseño curricular es oblogatorio");
  } else {
    editarPrograma();
  }
}

async function editarPrograma() {
  loading.value = true;
  try {
    let res = await useProgramas.editProgramasFormacion(
      indice.value,
      denominacion.value,
      version.value,
      niveldeformacion.value,
      archivo.value,
    );
    if (res.status === 201) {
      console.log("Se guardó un nuevo usuario");
      alert.value = false;
      bd.value = false;
      obtenerformacion();
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


function edito(props) {
  alert.value = true;
  bd.value = true;
  r.value = props.row;
  indice.value = r.value._id;
  denominacion.value = r.value.denominacion;
  version.value = r.value.version;
  niveldeformacion.value = r.value.niveldeformacion;
  archivo.value = r.value.archivo;
}

function limpiarFormulario() {
  console.log("limpiando formulario");
  denominacion.value = "";
  version.value = "";
  opciones.value = "";
  niveldeformacion.value = "";
  archivo.value = "";
  check.value = ""
  alert.value = false
  bd.value = false
}

// Variable para almacenar el nombre del archivo seleccionado

const abrirSelectorDeArchivos = () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.style.display = "none";
  fileInput.addEventListener("change", handleFileSelection);
  document.body.appendChild(fileInput);
  fileInput.click();
};

const handleFileSelection = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    archivo.value = selectedFile.name;
    alert(`Archivo seleccionado: ${selectedFile.name}`);
  }
  event.target.remove(); // Elimina el input de tipo file después de su uso
};

function cerrar() {
  bd.value = false;
  alert.value = false;
}

// Función para limpiar el campo


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

#card {
  width: 35em;
  max-width: 100%;
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
