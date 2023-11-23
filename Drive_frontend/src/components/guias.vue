<template>
  <div class="card-container">
    <div class="body">
      <q-btn style="background-color: green" :disable="loading" label="Agregar" @click="showModalAgregar = true" />
      <div style="margin-left: 5%" class="text-h4">Guias de Aprendizaje</div>
      <q-space />
      <q-input borderless dense debounce="300" style="border-radius: 10px; border: grey solid 0.5px; padding: 5px"
        color="primary" v-model="filter">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div>
      <div class="text3">Guias</div>
      <div v-for="(instru, index) in Instrumen" :key="index">
        <div class="card2">
          <p><strong>Nombre:</strong> {{ instru.nombre }}</p>
          <div class="nnn">
            <button class="boton">
              <img src="https://cdn.icon-icons.com/icons2/916/PNG/512/Menu_icon_icon-icons.com_71858.png" alt="Icono"
                class="img" />

              <q-menu class="menu" style="width: 4%; align-items: center; justify-content: center">
                <q-list>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <button class="img3">
                        <img src="https://cdn-icons-png.flaticon.com/512/724/724933.png" alt="" class="img2" />
                      </button>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <button class="img3" @click="abrirModalEdicion(index)">
                        <img src="https://cdn.icon-icons.com/icons2/3230/PNG/512/edit_modify_icon_196940.png" alt=""
                          class="img2" />
                      </button>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <button class="img3" @click="detalles(index)">
                        <img src="https://cdn-icons-png.flaticon.com/512/1/1755.png" alt="" class="img2" />
                      </button>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <button id="boton-estado" class="img3" @click="activar(instru)" v-if="instru.estado === false">
                        ✅
                      </button>
                      <button class="img3" @click="activar(instru)" v-else>
                        ❌
                      </button>
                    </q-item-section>
                  </q-item>

                  <q-separator />
                </q-list>
              </q-menu>
            </button>
          </div>
        </div>
        <div class="divisor">.</div>
      </div>
    </div>

    <div>
      <q-dialog v-model="showModalAgregar">
        <q-card class="custom-modal">
          <q-card-section>
            <div class="text2">Agregar Guia</div>
            <q-input v-model="codigo" label="Codigo de la Guia" :rules="[(val) => !!val || 'Campo requerido']" />
            <q-input v-model="nombre" label="Nombre de la Guia" :rules="[(val) => !!val || 'Campo requerido']" />
            <q-input v-model="fase" label="Fase de la Guia" :rules="[(val) => !!val || 'Campo requerido']" />
            <q-select v-model="InstrumentosEvaluacion" label="Instrumento de Evaluacion"
              :options="InstrumentosEvaluacionOptions" :rules="[(val) => !!val || 'Campo requerido']" />
            <q-select v-model="MaterialesApoyo" label="Material de Apoyo" :options="MaterialesApoyoOptions"
              :rules="[(val) => !!val || 'Campo requerido']" />
            <q-card-section>
              <q-input class="input" v-model="archivoOEnlace" label="Documentos" outlined dense clearable
                :rules="[(val) => !!val || 'Campo requerido']" prepend-icon="attach_file" @clear="limpiarCampo">
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
          </q-card-section>
          <q-card-section>
            <q-btn @click="limpiarDatos" label="Cancelar" />
            <q-btn @click="validarYGuardar()" color="primary" label="Agregar" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <div>
      <q-dialog v-model="showModalEdicion">
        <q-card class="custom-modal">
          <q-card-section>
            <div class="text2">Editar Instrumento</div>
            <q-input v-model="codigo" label="Codigo de la Guia" :rules="[(val) => !!val || 'Campo requerido']" />
            <q-input v-model="nombre" label="Nombre" :rules="[(val) => !!val || 'Campo requerido']" />
            <q-input v-model="fase" label="Fase de la Guia" :rules="[(val) => !!val || 'Campo requerido']" />
            <q-select v-model="InstrumentosEvaluacion" label="Instrumento de Evaluacion"
              :options="InstrumentosEvaluacionOptions" :rules="[(val) => !!val || 'Campo requerido']" />
            <q-select v-model="MaterialesApoyo" label="Material de Apoyo" :options="MaterialesApoyoOptions"
              :rules="[(val) => !!val || 'Campo requerido']" />
            <q-card-section>
              <q-input class="input" :rules="[(val) => !!val || 'Campo requerido']" v-model="archivoOEnlace"
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
          </q-card-section>
          <q-card-section>
            <q-btn @click="limpiarDatos" label="Cancelar" />
            <q-btn @click="validaredit()" color="primary" label="Guardar Cambios" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog v-model="showModaldetalles">
        <q-card class="custom-modal">
          <q-card-section>
            <q-card-section class="q-pa-md">
              <p>
                <strong style="font-size: large">Fase:</strong>
                {{ fase }}
              </p>
              <p>
                <strong style="font-size: large">Codigo:</strong>
                {{ codigo }}
              </p>
              <p>
                <strong style="font-size: large">Nombre:</strong>
                {{ nombre }}
              </p>

              <p>
                <strong style="font-size: large">Documentos:</strong>
                {{ archivoOEnlace }}
              </p>
              <p>
                <strong style="font-size: large">Materiales de Apoyo:</strong>
                {{ MaterialesApoyo }}
              </p>
              <p>
                <strong style="font-size: large">Instrumentos de Evaluacion:</strong>
                {{ InstrumentosEvaluacion }}
              </p>


            </q-card-section>
            <q-spinner-ios v-if="loading == true" color="green" size="2em" :thickness="10" />
            <!-- <q-btn v-else class="q-mx-sm" color="primary" outline @click="edito()">📝</q-btn> -->
            <q-card-section>
              <div role="alert" style="
              border: 2px solid red;
              border-radius: 20px;
              text-align: center;
              background-color: rgba(255, 0, 0, 0.304);
            " v-if="check !== ''">
                <div>{{ check }}</div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cerrar" @click="limpiarDatos" color="primary" v-close-popup />
              <!-- <q-btn flat label="Editar Usuario" @click="validaredit()" color="primary" /> -->
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGuiasAprendizStore } from "../stores/GuiasAprediz.js";
import { useInstrumentosEvaluacionStore } from "../stores/InstrumentosEvaluacion";
import { useMaterialesApoyoStore } from "../stores/MaterialesApoyo.js";
import { useLoginStore } from "../stores/login.js"

const route = useRoute();
const router = useRouter();
let Storemateriales = useMaterialesApoyoStore();
let StoreInstrumentoseva = useInstrumentosEvaluacionStore();
let StoreInstrumentos = useGuiasAprendizStore();
let useLogin = useLoginStore()
let Instrumen = ref([]);

let showModalAgregar = ref(false);
let showModalEdicion = ref(false);

let codigo = ref("");
let nombre = ref("");
let detalle = ref(false);
let fase = ref("");
let InstrumentosEvaluacion = ref(null);
let MaterialesApoyo = ref(null);
const archivoOEnlace = ref("");
let check = ref("");
let Tipo = ref("");
let Descripcion = ref("");
/*let IdCentroFormacion = ref("");*/

let r = {
  value: "",
  nombre: "",
  documento: "",
  fase: "",
  codigo: "",
  idInstrumentosEvaluacion: "",
  idMaterialApoyo: "",
};

const loading = ref(false);
const filter = ref(""); // Agregado para la búsqueda
function mostrarAlerta(mensaje) {
  alert.value = true;
  check.value = mensaje;
}

const limpiarDatos = () => {
  codigo.value = "";
  nombre.value = "";
  fase.value = "";
  InstrumentosEvaluacion.value = null;
  MaterialesApoyo.value = null;
  archivoOEnlace.value = "";
  check.value = "";
  showModalEdicion.value = false;
  showModalAgregar.value = false;
};
async function validarYGuardar() {
  if (codigo.value.trim() === "") {
    mostrarAlerta("El Codigo es obligatorio");
  } else if (nombre.value.trim() === "") {
    mostrarAlerta("El Nombre es obligatorio");
  } else if (!fase.value) {
    mostrarAlerta("La Fase es oblogatoria");
  } else if (!InstrumentosEvaluacion.value) {
    mostrarAlerta("El Instrumento es oblogatorio");
  } else if (!MaterialesApoyo.value) {
    mostrarAlerta("Los materiales son oblogatorios");
  } else if (!archivoOEnlace.value) {
    mostrarAlerta("El Archivo es oblogatorio");
  } else {
    alert.value = false;
    agregarAmbiente();
  }
}
async function agregarAmbiente() {
  loading.value = true;
  let r = await StoreInstrumentos.addGuiasAprendiz({
    nombre: nombre.value,
    codigo: codigo.value,
    documento: archivoOEnlace.value,
    fase: fase.value,
    idInstrumentosEvaluacion: InstrumentosEvaluacion.value.value,
    idMaterialApoyo: MaterialesApoyo.value.value,
  });

  console.log(nombre.value, archivoOEnlace.value, codigo.value);
  listarGias();
  limpiarDatos();
}

listarGias()

async function listarGias() {
  console.log("estoy en listar gias");
  let Instrumento = await StoreInstrumentos.getGuiasAprendiz(useLogin.token);
  console.log(Instrumento);
  Instrumen.value = Instrumento.data;
}

const InstrumentosEvaluacionOptions = ref([]);

const getInstrumentos = async () => {
  try {
    const response = await StoreInstrumentoseva.getInstrumentosEvalacion(useLogin.token);
    const instrumentos = response.data.InstrumentosEvaluacion;

    // Crear las opciones para el select
    InstrumentosEvaluacionOptions.value = instrumentos.map((item) => ({
      value: item.nombre, // El valor que se seleccionará
      label: item.nombre, // La etiqueta que se mostrará
    }));
  } catch (error) {
    console.error(error);
    console.log("hay un error en conectar la tabla");
  }
};

const MaterialesApoyoOptions = ref([]);

const getMaterialesApoyo = async () => {
  try {
    const response = await Storemateriales.getMaterialesApoyo(useLogin.token);
    const materiales = response.data.MaterialesApoyo;

    // Crear las opciones para el select
    MaterialesApoyoOptions.value = materiales.map((item) => ({
      value: item.nombre, // El valor que se seleccionará
      label: item.nombre, // La etiqueta que se mostrará
    }));
  } catch (error) {
    console.error(error);
  }
};

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

let idEdicion = ref(null);
let showModaldetalles = ref(false);
const detalles = (index) => {
  const y = Instrumen.value[index];
  console.log(index);
  if (y) {
    nombre.value = y.nombre;
    archivoOEnlace.value = y.documento;
    fase.value = y.fase;
    codigo.value = y.codigo;
    InstrumentosEvaluacion.value = y.idInstrumentosEvaluacion;
    MaterialesApoyo.value = y.idMaterialApoyo;
    showModaldetalles.value = true;
    console.log(y.nombre);
  } else {
    console.error(`No se encontró un ambiente en el índice ${index}`);
    console.log(y);
  }

  console.log(y);
}

const abrirModalEdicion = (index) => {
  idEdicion.value = index;
  const ambienteSeleccionado = Instrumen.value[index];
  if (ambienteSeleccionado) {
    nombre.value = ambienteSeleccionado.nombre;
    archivoOEnlace.value = ambienteSeleccionado.documento;
    fase.value = ambienteSeleccionado.fase;
    codigo.value = ambienteSeleccionado.codigo;
    InstrumentosEvaluacion.value = ambienteSeleccionado.idInstrumentosEvaluacion;
    MaterialesApoyo.value = ambienteSeleccionado.idMaterialApoyo;
    showModalEdicion.value = true;
  } else {
    console.error(`No se encontró un ambiente en el índice ${index}`);
  }
};
async function validaredit() {
  if (codigo.value.trim() === "") {
    mostrarAlerta("El Codigo es obligatorio");
  } else if (nombre.value.trim() === "") {
    mostrarAlerta("El Nombre es obligatorio");
  } else if (!fase.value) {
    mostrarAlerta("La Fase es oblogatoria");
  } else if (!InstrumentosEvaluacion.value) {
    mostrarAlerta("El Instrumento es oblogatorio");
  } else if (!MaterialesApoyo.value) {
    mostrarAlerta("Los Materiales son oblogatorios");
  } else if (!archivoOEnlace.value) {
    mostrarAlerta("El Archivo es oblogatorio");
  } else {
    alert.value = false;
    guardarCambios(); // Debes llamar a la función con paréntesis para ejecutarla
  }
}

const redirectToVerdoc = (index) => {
  const objetoId = Instrumen.value[index]._id;
  router.push({ name: "verdoc", params: { id: objetoId } });
};
const guardarCambios = async () => {
  if (idEdicion.value !== null) {
    const index = idEdicion.value;
    const InstrumentoEditado = {
      codigo: codigo.value,
      nombre: nombre.value,
      fase: fase.value,
      documento: archivoOEnlace.value,
      idInstrumentosEvaluacion: InstrumentosEvaluacion.value.value,
      idMaterialApoyo: MaterialesApoyo.value,
    };
    console.log(InstrumentoEditado);
    // Llamar al método de la store para editar el instrumento en la base de datos
    const response = await StoreInstrumentos.editGuiasAprendiz(
      Instrumen.value[index]._id,
      InstrumentoEditado
    );
    console.log(response);
    if (response.status === 200) {
      Instrumen.value[index] = InstrumentoEditado;
      showModalEdicion.value = false;
      idEdicion.value = null;
      limpiarDatos();
      getMaterialesApoyo();
    } else {
      console.error("Error al guardar los cambios en el servidor");
    }
  }
};

async function activar(instru) {
  instru.estado = !instru.estado;
  console.log(instru.estado, "resultado de la condición");

  // Aquí puedes realizar la lógica adicional si es necesario

  let est = await StoreInstrumentos.activarInstrumentosEvaluacion(instru._id);
  console.log(est);
}

onMounted(async () => {
  listarGias();
  getInstrumentos();
  getMaterialesApoyo();
});
</script>

<style scoped>
.boton {
  width: 7%;
  height: 7%;
  color: rgba(0, 0, 0, 0);
  background-color: transparent;
  border-color: transparent;
  transition: 0.2s;
  margin-bottom: 0%;
}

.boton:hover {
  width: 7%;
  transform: scale(1.3);
}

.img {
  width: 40%;
}

.img2 {
  width: 90%;
  background-color: transparent;
  border-color: transparent;
}

.img3 {
  width: 100%;
  background-color: transparent;
  /* Elimina el fondo */
  border: none;
  /* Elimina el borde */
  margin-left: 0%;
  transition: 0.2s;
}

.nnn {
  align-items: end;
  display: flex;
  justify-content: end;
  margin: 1%;
  margin-top: -2.4%;
}

.divisor {
  background-color: rgba(0, 0, 0, 0.311);
  margin: 1%;
  font-size: 2px;
}

.body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 1rem;
}

.card2 {
  background-color: rgba(0, 0, 0, 0.011);
  width: 100%;
  height: 20%;
  font-size: 200%;
  margin: 1%;
}

.text2 {
  font-size: 400%;
  color: green;
  margin-top: 2%;
}

.text3 {
  font-size: 300%;
  margin-left: 1%;
}
</style>