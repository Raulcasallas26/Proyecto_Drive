<template>
  <div class="card-container">
    <div class="body" style="position: relative">
      <q-btn style="background-color: green; color: white" :disable="loading" label="Agregar" @click="agregar()" />
      <div style="margin-left: 5%" class="text-h4">Materiales de Formacion</div>
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
            <div class="info">
              <p><strong>Nombre:</strong> {{ ambiente.nombre }}</p>
              <p><strong>Tipo:</strong> {{ ambiente.tipo }}</p>
            </div>
            <div class="buttons">
              <button @click="toggleDetails(index)" class="rotate-button">
                <div class="arrow-icon" :class="{ rotate: isRotated[index] }">
                  <img src="https://cdn-icons-png.flaticon.com/512/32/32195.png" alt="Arrow" class="arrow-icon" />
                </div>
              </button>
              <button class="editar" @click="abrirModalEdicion(index)">
                <img src="https://cdn-icons-png.flaticon.com/512/650/650143.png" alt="Editar" class="arrow-icon" />
              </button>
            </div>
          </div>
          <q-slide-transition appear>
            <div v-show="cardStates[index]">
              <div class="bottom-half">
                <div class="info">
                  <p>
                    <strong>Descripción:</strong> {{ ambiente.descripccion }}
                  </p>
                  <p><strong>Documentos:</strong> {{ ambiente.documentos }}</p>
                </div>
              </div>
            </div>
          </q-slide-transition>
        </div>
      </div>
    </div>
    <!-- Modal para agregar ambientes -->
    <q-dialog v-model="alert" persistent>
      <q-spinner-ios v-if="loading == true" color="green" size="20em" :thickness="100" />
      <q-card v-else id="card">
        <div style="display: flex">
          <q-card-section>
            <div class="text-h4" v-if="bd === false">Agregar Materiales</div>
            <div class="text-h4" v-else>Editar Materiales</div>
          </q-card-section>
          <div style="margin-left: auto; margin-bottom: auto">
            <q-btn @click="toggleX, limpiarFormulario()" class="close-button" icon="close" v-close-popup />
          </div>
        </div>
        <q-card-section class="q-pt-none" id="card">
          <q-card flat bordered class="my-card">
            <q-card-section class="q-pa-md">
              <div class="q-gutter-md">
                <q-input v-model="Nombre" label="Nombre" :rules="[(val) => !!val || 'Campo requerido']" />
              </div>
              <div class="q-gutter-md">
                <q-select v-model="Tipo" :options="opcionesTipo" label="Tipo"
                  :rules="[(val) => !!val || 'Campo requerido']" />
              </div>
              <div class="q-gutter-md">
                <q-input v-model="descripcion" label="Descripcion" :rules="[(val) => !!val || 'Campo requerido']" />
              </div>
              <div class="q-gutter-md items-start">
                <span>documentos</span><br />
                <input type="file" @change="subir_documentos" />
                <!-- <q-input @change="subir_curriculum" label="Curriculum" type="file" /> -->
              </div>
            </q-card-section>
            <q-card-section>
              <div role="alert" style="
                  border: 2px solid red;
                  border-radius: 20px;
                  text-align: center;
                  background-color: rgba(255, 0, 0, 0.304);
                " v-if="check !== ''">
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
import { useMaterialesformaStore } from "../stores/materialesforma.js";
import { useLoginStore } from "../stores/login.js";
import { load } from "../routes/direccion.js";
const Storemateriales = useMaterialesformaStore();
const useLogin = useLoginStore();
let ambientess = ref([]);
let showModalAgregar = ref(false);
let showModalEdicion = ref(false); // Variable para controlar el modal de edición
let codigo = ref("");
let Nombre = ref("");
let filter = ref("");
let check = ref("");
let errorMessage = ref("");
const validationErrors = ref({});
let alert = ref(false);
let bd = ref(false);
let descripcion = ref("");
let IdCentroFormacion = ref("");
const archivoOEnlace = ref("");
const loading = ref(false);
const Tipo = ref("");
const opcionesTipo = [
  { label: "Equipo", value: "equipo" },
  { label: "Herramienta", value: "herramienta" },
  { label: "Consumible", value: "consumible" },
];
function mostrarAlerta(mensaje) {
  alert.value = true;
  check.value = mensaje;
}
async function validarYGuardar() {
  if (Nombre.value.trim() === "") {
    mostrarAlerta("El Nombre es obligatorio");
  } else if (!Tipo.value) {
    mostrarAlerta("El Tipo es obligatorio");
  } else if (descripcion.value.trim() === "") {
    mostrarAlerta("La Descripcion es obligatoria");
  } else if (archivoOEnlace.value.trim() === "") {
    mostrarAlerta("el archivo es obligatorio");
  } else {
    alert.value = false;
    agregarAmbiente();
  }
}
async function agregarAmbiente() {
  try {
    loading.value = true;

    let r = await Storemateriales.postMaterialesforma({
      codigo: codigo.value,
      nombre: Nombre.value,
      tipo: Tipo.value.value,
      descripccion: descripcion.value,
      documentos: archivoOEnlace.value,
    });
    console.log(r);

    // Resto de la lógica después de la llamada exitosa
  } catch (error) {
    // Manejar el error aquí
    console.error("Error al agregar ambiente:", error);
  } finally {
    // Código que se ejecuta independientemente de si la operación fue exitosa o falló
    loading.value = false;
    getMaterialesforma();
    showModalAgregar = false;
  }
}

async function getMaterialesforma() {
  load.value = true;
  console.log(useLogin.token);
  let Formacion = await Storemateriales.getMaterialesforma(useLogin.token);
  ambientess.value = Formacion.data.MaterialesApoyo;
  load.value = false;
}
/*    <p><strong>Código:</strong> {{ ambiente.codigo }}</p> */
const cardStates = ref({});
const isRotated = ref({});
const toggleDetails = (index) => {
  // Cambia el estado de la card en el índice específico
  cardStates.value[index] = !cardStates.value[index];
  isRotated.value[index] = !isRotated.value[index];
};
function agregar() {
  alert.value = true;
}
const opciones = [];

const abrirSelectorDeArchivos = () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.style.display = "none";
  fileInput.addEventListener("change", (event) => {
    const selectedFile = event.target.files[0];
    const selectedFileName = selectedFile ? selectedFile.name : "";

    // Asignar el nombre del archivo al campo archivoOEnlace
    archivoOEnlace.value = selectedFileName;
    const fileExtension = selectedFileName.split(".").pop();

    // Buscar la opción que corresponde al nombre del archivo
    const selectedOption = opciones.find((option) =>
      option.includes(selectedFileName)
    );

    if (selectedOption) {
      // Establecer el valor de "Tipo" basado en el textoDeOpcion
      Tipo.value = selectedOption;
    } else {
      // Manejar el caso en que no se encuentre una opción correspondiente
      alert(
        "No se encontró una opción correspondiente al archivo seleccionado."
      );
    }

    event.target.remove(); // Elimina el input de tipo file después de su uso
  });
  document.body.appendChild(fileInput);
  fileInput.click();
};

let idAmbienteEditando = ref(null);

// Función para abrir el modal de edición con los datos del ambiente seleccionado
const abrirModalEdicion = (index) => {
  idAmbienteEditando.value = index;
  const ambienteSeleccionado = ambientess.value[index];

  Nombre.value = ambienteSeleccionado.nombre;
  Tipo.value = ambienteSeleccionado.tipo;
  descripcion.value = ambienteSeleccionado.descripccion;
  archivoOEnlace.value = ambienteSeleccionado.documentos;
  alert.value = true;
  bd.value = true;
};
async function validaredit() {
  if (Nombre.value.trim() === "") {
    mostrarAlerta("El Nombre es obligatorio");
  } else if (!Tipo.value) {
    mostrarAlerta("El Tipo es obligatorio");
  } else if (descripcion.value.trim() === "") {
    mostrarAlerta("La Descripcion es obligatoria");
  } else if (archivoOEnlace.value.trim() === "") {
    mostrarAlerta("el archivo es obligatorio");
  } else {
    alert.value = false;
    guardarCambios();
  }
}
const guardarCambios = async () => {
  if (idAmbienteEditando.value !== null) {
    console.log("entre a editar");
    const index = idAmbienteEditando.value;
    const ambienteEditado = {
      nombre: Nombre.value,
      tipo: Tipo.value.value,
      descripccion: descripcion.value,
      documentos: archivoOEnlace.value,
    };
    const response = await Storemateriales.editMaterialesforma(
      ambientess.value[index]._id,
      ambienteEditado
    );
    console.log("edite");
    console.log(ambienteEditado);
    if (response.status === 200) {
      ambientess.value[index] = ambienteEditado;
      showModalEdicion.value = false;
      idAmbienteEditando.value = null;
      limpiarFormulario();
      console.log("limpie los datos");
    } else {
      console.error("Error al guardar los cambios en el servidor");
    }
  }
};
function limpiarFormulario() {
  codigo.value = "";
  Nombre.value = "";
  Tipo.value = "";
  archivoOEnlace.value = "";
  IdCentroFormacion.value = "";
  descripcion.value = "";
}
onMounted(async () => {
  await getMaterialesforma();
});
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
  margin-right: -20%;
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
