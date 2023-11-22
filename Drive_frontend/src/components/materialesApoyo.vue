<template>
  <div class="card-container">
    <div class="clas" v-if="load == true" style="margin-top: 5px;">
      <q-linear-progress ark rounded indeterminate color="green" />
    </div>
    <div v-else>
      <div class="body" style="position: relative">
        <q-btn style="background-color: green; color: white;" :disable="loading" label="Agregar"
          @click="showModalAgregar = true" />
        <div style="margin-left: 5%" class="text-h4">Materiales de Apoyo</div>
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
                <p><strong>Código:</strong> {{ ambiente.codigo }}</p>
                <p><strong>Nombre:</strong> {{ ambiente.nombre }}</p>
                <p><strong>Tipo:</strong> {{ ambiente.documento }}</p>
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
    </div>

    <!-- Modal para agregar ambientes -->
    <div>
      <q-dialog v-model="showModalAgregar">
        <q-card class="custom-modal">
          <q-card-section>
            <div class="text2">Agregar Materiales</div>
            <q-input v-model="codigo" label="Codigo" />
            <q-input v-model="Nombre" label="Nombre" />
            <q-input v-model="Tipo" label="Tipo" hint="Este campo se llena solo si adjunta un archivo" readonly />

            <q-input v-model="descripcion" label="Descripcion" />

            <q-card-section>
              <q-input class="input" v-model="archivoOEnlace" label="Documentos" outlined dense clearable
                prepend-icon="attach_file" @clear="limpiarCampo">
                <template v-slot:append>
                  <q-icon name="attach_file" style="cursor: pointer" @click="abrirSelectorDeArchivos" />
                </template>
              </q-input>
            </q-card-section>
            <!-- fin -->
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
          <q-card-section>
            <q-btn @click="() => {
              showModalAgregar = false;
              limpiarFormulario();
            }
              " label="Cancelar" />

            <q-btn @click="validarYGuardar()" color="primary" label="Agregar" />

            <div v-if="validationErrors.codigo" class="error-message">
              {{ validationErrors.codigo }}
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <!-- Modal para editar ambientes -->
    <div>
      <q-dialog v-model="showModalEdicion">
        <q-card class="custom-modal">
          <q-card-section>
            <div class="text2">Editar Materiales</div>
            <q-input v-model="codigo" label="Codigo" :rules="[(val) => !!val || 'Campo requerido']" />
            <q-input v-model="Nombre" label="Nombre" :rules="[(val) => !!val || 'Campo requerido']" />
            <q-input v-model="Tipo" label="Tipo" :rules="[(val) => !!val || 'Campo requerido']"
              hint="Este campo se llena solo si adjunta un archivo" readonly />
            <q-input v-model="descripcion" label="Descripcion" :rules="[(val) => !!val || 'Campo requerido']" />

            <!-- inicio -->
            <q-card-section>
              <q-input class="input" v-model="archivoOEnlace" :rules="[(val) => !!val || 'Campo requerido']"
                label="Documentos" outlined dense clearable prepend-icon="attach_file" @clear="limpiarCampo">
                <template v-slot:append>
                  <q-icon name="attach_file" style="cursor: pointer" @click="abrirSelectorDeArchivos" />
                </template>
              </q-input>
            </q-card-section>
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
            <!-- fin -->
          </q-card-section>
          <q-card-section>
            <q-btn @click="() => {
              showModalEdicion = false;
              limpiarFormulario();
            }
              " label="Cancelar" />
            <q-btn @click="validaredit()" color="primary" label="Guardar Cambios" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <!-- Modal para eliminar ambientes -->
    <!-- <div>
            <q-dialog v-model="showModalEliminacion">
                <q-card class="custom-modal">
                    <q-card-section>
                        <div class="text2">Eliminar Ambiente</div>
                        <p>¿Estás seguro de que deseas eliminar este ambiente?</p>
                    </q-card-section>
                    <q-card-section>
                        <q-btn @click="showModalEliminacion = false" label="Cancelar" />
                        <q-btn @click="confirmarEliminacion" color="negative" label="Eliminar" />
                    </q-card-section>
                </q-card>
            </q-dialog>
        </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMaterialesApoyoStore } from "../stores/MaterialesApoyo.js";
import { useLoginStore } from "../stores/login.js"
import { load } from "../routes/direccion.js"
const Storemateriales = useMaterialesApoyoStore();
const useLogin = useLoginStore()
let ambientess = ref([]);
let showModalAgregar = ref(false);
let showModalEdicion = ref(false); // Variable para controlar el modal de edición
let codigo = ref("");
let Nombre = ref("");
let filter = ref("");
let check = ref("");
let errorMessage = ref("");
const validationErrors = ref({});
let Tipo = ref("");
let descripcion = ref("");
let IdCentroFormacion = ref("");
const archivoOEnlace = ref("");
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
  loading.value = true;
  let r = await Storemateriales.addMaterialesApoyo({
    codigo: codigo.value,
    nombre: Nombre.value,
    documento: Tipo.value,
    descripccion: descripcion.value,
    documentos: archivoOEnlace.value,
  });
  getMaterialesApoyo();
  console.log(
    Nombre.value,
    archivoOEnlace.value,
    descripcion.value,
    codigo.value,
    Tipo.value
  );
  showModalAgregar = false;

}

async function getMaterialesApoyo() {
  load.value = true
  console.log(useLogin.token);
  let Formacion = await Storemateriales.getMaterialesApoyo(useLogin.token);
  ambientess.value = Formacion.data.MaterialesApoyo;
  load.value = false
}
/*    <p><strong>Código:</strong> {{ ambiente.codigo }}</p> */
const cardStates = ref({});
const isRotated = ref({});
const toggleDetails = (index) => {
  // Cambia el estado de la card en el índice específico
  cardStates.value[index] = !cardStates.value[index];
  isRotated.value[index] = !isRotated.value[index];
};

const opciones = [
];

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
    Tipo.value = fileExtension;
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
  codigo.value = ambienteSeleccionado.codigo;
  Nombre.value = ambienteSeleccionado.nombre;
  Tipo.value = ambienteSeleccionado.documento;
  descripcion.value = ambienteSeleccionado.descripccion;

  archivoOEnlace.value = ambienteSeleccionado.documentos;
  showModalEdicion.value = true;
};
async function validaredit() {
  if (codigo.value.trim() === "") {
    mostrarAlerta("El Codigo es obligatorio");
  } else if (Nombre.value.trim() === "") {
    mostrarAlerta("El Nombre es obligatorio");
  } else if (Tipo.value.trim() === "") {
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
      codigo: codigo.value,
      nombre: Nombre.value,
      documento: Tipo.value,
      descripccion: descripcion.value,
      documentos: archivoOEnlace.value,
    };

    // Llamar al método de la store para editar el ambiente en la base de datos
    const response = await Storemateriales.editMaterialesApoyo(
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
const showModalEliminacion = ref(false); // Variable para controlar el modal de eliminación
const idAmbienteEliminando = ref(null);
const abrirModalEliminacion = (id) => {
  idAmbienteEliminando.value = id; // Establece el ID del ambiente que se va a eliminar
  showModalEliminacion.value = true; // Abre el modal de eliminación
};

const confirmarEliminacion = async () => {
  if (idAmbienteEliminando.value !== null) {
    // Llama a la función eliminarAmbiente en la tienda para eliminar el ambiente
    const response = await StoreAmbiente.eliminarAmbiente(
      idAmbienteEliminando.value
    );

    if (response.status === 200) {
      // Eliminación exitosa, cierra el modal de eliminación y actualiza la lista de ambientes
      showModalEliminacion.value = false;
      idAmbienteEliminando.value = null;
      await getAmbientesformacion(); // Actualiza la lista de ambientes después de la eliminación
    } else {
      // Maneja errores en la eliminación
      console.error("Error al eliminar el ambiente");
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
function limpiarMensajeError() {
  errorMessage.value = null;
}
onMounted(async () => {
  await getMaterialesApoyo();
});
//editAmbientesFormacion   StoreAmbiente
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
</style>
