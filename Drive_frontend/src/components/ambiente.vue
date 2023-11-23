<template>
  <div class="card-container">
    <div v-if="load == true" style="margin-top: 5px;">
      <q-linear-progress ark rounded indeterminate color="green" />
    </div>
    <div v-else class="body" style="position: relative">
      <q-btn style="background-color: green; color: white; " :disable="loading" label="Agregar" @click="agregar()" />
      <div style="margin-left: 5%" class="text-h4">Ambientes de formacion</div>
      <q-space />
      <q-input borderless dense debounce="300" style="border-radius: 10px; border: grey solid 0.5px; padding: 5px"
        color="primary" v-model="filter">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div>
      <!-- Itera a través de los ambientes y muestra cada uno en un card -->
      <div v-for="(ambiente, index) in ambientess" :key="index">
        <div class="card">
          <div class="top-half">
            <div class="info" @click="toggleDetails(index)">
              <p><strong>Código:</strong> {{ ambiente.codigo }}</p>
              <p><strong>Nombre:</strong> {{ ambiente.nombre }}</p>
              <p><strong>Tipo:</strong> {{ ambiente.tipo }}</p>
              <strong>Estado: </strong>
              <span class="text-green" v-if="ambiente.estado === true">
                Activo</span>
              <span class="text-orange" v-else> Ocuapado</span>
            </div>
            <div class="buttons">
              <button @click="toggleDetails(index)" class="rotate-button">
                <div class="arrow-icon" :class="{ rotate: isRotated[index] }">
                  <img src="https://cdn-icons-png.flaticon.com/512/32/32195.png" alt="Arrow" class="arrow-icon" />
                </div>
              </button>
              <button class="editar" @click="edito(index)">
                <img src="https://cdn-icons-png.flaticon.com/512/650/650143.png" alt="Editar" class="arrow-icon" />
              </button>
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end">
            <q-btn id="boton-estado" class="q-pa-r" color="green" outline @click="activar(ambiente)"
              v-if="ambiente.estado === false">✅Activar
            </q-btn>
            <q-btn class="q-pa-r" color="orange" outline @click="activar(ambiente)" v-else>⚠ Ocupar</q-btn>
          </div>
          <q-slide-transition appear>
            <div v-show="cardStates[index]">
              <button @click="toggleDetails(index)" class="rotate-button">
                <div class="arrow-icon" :class="{ rotate: isRotated[index] }">
                  <img src="https://cdn-icons-png.flaticon.com/512/32/32195.png" alt="Arrow" class="arrow-icon" />
                </div>
              </button>
              <div class="bottom-half">
                <div class="info">
                  <p style="column-gap: 30px; ">
                    <strong>Descripción:</strong> {{ ambiente.descripcion }}
                  </p>
                  <p><strong>Documentos:</strong> {{ ambiente.documentos }}</p>
                  <p>
                    <strong>ID Centro de Formación:</strong>
                    {{ ambiente.idCentroDeFormacion }}
                  </p>
                </div>
                
              </div>
            </div>
          </q-slide-transition>
        </div>
      </div>
    </div>

    <q-dialog v-model="modal" persistent>
      <q-card id="card">
        <div style="display: flex;">
          <q-card-section>
            <div class="text-h4">Registro de Ambientes</div>
          </q-card-section>
          <div style="margin-left: auto;    margin-bottom: auto;">
            <q-btn @click="toggleX, limpiarFormulario()" class="close-button" icon="close" />
          </div>
        </div>

        <q-card-section class="q-pt-none" id="card">
          <q-card flat bordered class="my-card">
            <q-card-section class="q-pa-md">
              <div class="q-gutter-md">
                <q-input v-model="codigo" label="Codigo" :rules="[(val) => !!val || 'Campo requerido']" />
              </div>
              <div class="q-gutter-md">
                <q-input v-model="Nombre" label="Nombre" :rules="[(val) => !!val || 'Campo requerido']" />
              </div>
              <div class="q-gutter-md">
                <q-input v-model="Tipo" label="Tipo" :rules="[(val) => !!val || 'Campo requerido']" />
              </div>
              <div class="q-gutter-md">
                <q-input v-model="Descripcion" label="Descripcion" :rules="[(val) => !!val || 'Campo requerido']" />
              </div>
              <div class="q-gutter-md">
                <q-select :rules="[(val) => !!val || 'Campo requerido']" v-model="IdCentroFormacion" :options="opciones"
                  label="Selecciona una Id de Centro de Formacion" />
              </div>
              <div class="q-gutter-md">
                <q-input class="input" v-model="archivoOEnlace" label="Archivo o el documento "
                  :rules="[(val) => !!val || 'Campo requerido']" dense clearable prepend-icon="attach_file"
                  @clear="limpiarCampo">
                  <template v-slot:append>
                    <q-icon name="attach_file" style="cursor: pointer" @click="abrirSelectorDeArchivos" />
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
          <q-btn flat label="Editar Ambiente" v-else @click="validaredit" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAmbientesFormacionStore } from "../stores/AmbientesFormacion.js";
import { useLoginStore } from "../stores/login.js"
import { load } from "../routes/direccion.js"
const useambiente = useAmbientesFormacionStore();
const useLogin = useLoginStore()
let ambientess = ref([]);
let modal = ref(false);
let filter = ref("")
let codigo = ref("");
let Nombre = ref("");
let check = ref("");
let Tipo = ref("");
let bd = ref(false)
let Descripcion = ref("");
let IdCentroFormacion = ref("");
let archivoOEnlace = ref("");
const loading = ref(false);

function mostrarAlerta(mensaje) {
  alert.value = true;
  check.value = mensaje;
}
async function validarYGuardar() {
  if (codigo.value.trim() === "") {
    mostrarAlerta("El Codigo es obligatorio");
  } else if (Nombre.value.trim() === "") {
    mostrarAlerta("El Nombre es obligatorio");
  } else if (Tipo.value.trim() === "") {
    mostrarAlerta("El Tipo es obligatorio");
  } else if (Descripcion.value.trim() === "") {
    mostrarAlerta("La Descripcion es obligatoria");
  } else if (!IdCentroFormacion.value) {
    mostrarAlerta("El Id Del Centro Formacion es obligatoria");
  } else if (archivoOEnlace.value.trim() === "") {
    mostrarAlerta("el archivo es obligatorio");
  } else {
    agregarAmbiente();
  }
}
async function agregarAmbiente() {
  loading.value = true;
  let r = await useambiente.addAmbientesFormacion({
    nombre: Nombre.value,
    codigo: codigo.value,
    tipo: Tipo.value,
    descripcion: Descripcion.value,
    idCentroDeFormacion: IdCentroFormacion.value,
    documentos: archivoOEnlace.value,
  });
  getAmbientesformacion();
  loading.value = false
}

function limpiarFormulario() {
  modal.value = false
}

async function activar(ambiente) {
  console.log("hola");
  console.log(ambiente.estado);
  let r = ambiente;
  if (r.estado === true) {
    r.estado = false;
    console.log(r.estado, "resultado del if");
  } else {
    r.estado = true;
    console.log(r.estado, "resultado del else");
  }
  let est = await useambiente.activarAmbientesFormacion(r._id);
  console.log(est);
}

async function getAmbientesformacion() {
  load.value = true
  console.log(useLogin.token);
  let Formacion = await useambiente.getAmbientesFormacion(useLogin.token);
  ambientess.value = Formacion.data.AmbientesFormacion;
  load.value = false
}

const cardStates = ref({});
const isRotated = ref({});
const toggleDetails = (index) => {
  // Cambia el estado de la card en el índice específico
  cardStates.value[index] = !cardStates.value[index];
  isRotated.value[index] = !isRotated.value[index];
};

const opciones = [
  "001 Centro Agroturistico sede san gil",
  "002 Centro Agroturistico sede socorro",
];

const abrirSelectorDeArchivos = () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.style.display = "none";
  fileInput.addEventListener("change", handleFileSelection);
  document.body.appendChild(fileInput);
  fileInput.click();
};

// Función para manejar la selección de archivos
const handleFileSelection = (event) => {
  const selectedFile = event.target.files[0];
  const selectedFileName = selectedFile ? selectedFile.name : "";

  // Asignar el nombre del archivo al campo archivoOEnlace
  archivoOEnlace.value = selectedFileName;

  // Buscar la opción que corresponde al nombre del archivo
  const selectedOption = opciones.find((option) =>
    option.includes(selectedFileName)
  );

  if (selectedOption) {
    // Enviar el texto correspondiente a la opción seleccionada
    const textoDeOpcion = selectedOption;
    // Aquí puedes hacer lo que necesites con textoDeOpcion
    alert(`Texto de la opción seleccionada: ${textoDeOpcion}`);
  } else {
    // Manejar el caso en que no se encuentre una opción correspondiente
    alert("No se encontró una opción correspondiente al archivo seleccionado.");
  }

  event.target.remove(); // Elimina el input de tipo file después de su uso
};

let idAmbienteEditando = ref(null);

// Función para abrir el modal de edición con los datos del ambiente seleccionado
const edito = (index) => {
  bd.value = true
  idAmbienteEditando.value = index;
  const ambienteSeleccionado = ambientess.value[index];
  codigo.value = ambienteSeleccionado.codigo;
  Nombre.value = ambienteSeleccionado.nombre;
  Tipo.value = ambienteSeleccionado.tipo;
  Descripcion.value = ambienteSeleccionado.descripcion;
  IdCentroFormacion.value = ambienteSeleccionado.idCentroDeFormacion;
  archivoOEnlace.value = ambienteSeleccionado.documentos;
  modal.value = true;
};
async function validaredit() {
  if (codigo.value.trim() === "") {
    mostrarAlerta("El Codigo es obligatorio");
  } else if (Nombre.value.trim() === "") {
    mostrarAlerta("El Nombre es obligatorio");
  } else if (Tipo.value.trim() === "") {
    mostrarAlerta("El Tipo es obligatorio");
  } else if (Descripcion.value.trim() === "") {
    mostrarAlerta("La Descripcion es obligatoria");
  } else if (!IdCentroFormacion.value) {
    mostrarAlerta("El Id Del Centro Formacion es obligatoria");
  } else if (archivoOEnlace.value.trim() === "") {
    mostrarAlerta("el archivo es obligatorio");
  } else {
    alert.value = false;
    guardarCambios();
  }
}
const guardarCambios = async () => {
  if (idAmbienteEditando.value !== null) {
    const index = idAmbienteEditando.value;
    const ambienteEditado = {
      codigo: codigo.value,
      nombre: Nombre.value,
      tipo: Tipo.value,
      descripcion: Descripcion.value,
      idCentroDeFormacion: IdCentroFormacion.value,
      documentos: archivoOEnlace.value,
    };

    // Llamar al método de la store para editar el ambiente en la base de datos
    const response = await useambiente.editAmbientesFormacion(
      ambientess.value[index]._id,
      ambienteEditado
    );

    if (response.status === 200) {
      ambientess.value[index] = ambienteEditado;
      idAmbienteEditando.value = null;
    } else {
      console.error("Error al guardar los cambios en el servidor");
    }
  }
};

function agregar() {
  modal.value = true
}

onMounted(async () => {
  await getAmbientesformacion();
});
//editAmbientesFormacion   useambiente
</script>

<style scoped>
.body {
  margin: 1%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.text {
  font-size: 500%;
  color: green;
  margin-top: 2%;
}

.text2 {
  font-size: 400%;
  color: green;
  margin-top: 2%;
}

.agregar {
  background-color: green;
  width: 8%;
  height: 20%;
  border-radius: 8px;
  margin-left: 90%;
  color: white;
  font-size: 150%;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.agregar:hover {
  transform: scale(1.05);
  /* Aumenta el tamaño en un 5% */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  /* Agrega una sombra suave */
}

.card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
}

.top-half {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons {
  display: flex;
  gap: 8px;
}

.bottom-half {
  margin-top: 16px;
}

.editar {
  margin-left: -45%;
  margin-top: 80%;
  width: 30%;
  height: 30%;
  background-color: rgba(255, 0, 0, 0);
  border: none;
}

.rotate-button {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  width: 30%;
  height: 30%;
  margin-top: -15%;
  margin-left: 50%;
  outline: none;
  padding: 0;
}

.arrow-icon {
  width: 25px;
  height: 30px;
  /* rotate: 90deg; */
  transition: transform 0.5s ease;
  /* Duración y tipo de transición */
}

.rotate {
  transform: rotate(180deg);
  /* Gira 180 grados al hacer clic */
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
