<template>
    <div class="card-container">


        <div>
            <q-btn label="Abrir vista previa" @click="openDocumentPreview" />

            <q-dialog v-model="showPreview" position="top">
                <div class="outlook-modal">
                    <div class="outlook-header">
                        <span class="outlook-title">Vista Previa de Documento</span>
                        <q-btn flat round dense icon="close" @click="closePreview" />
                    </div>
                    <div class="outlook-content">
                        <iframe :src="documentUrl" ref="documentIframe" class="document-iframe"></iframe>
                    </div>
                </div>
            </q-dialog>
        </div>



        <div v-if="load == true" style="margin-top: 5px">
            <q-linear-progress ark rounded indeterminate color="green" />
        </div>
        <div v-else class="body">
            <q-btn style="background-color: green; color: white" :disable="loading" label="Agregar" @click="alert = true" />
            <div style="margin-left: 5%" class="text-h4">Desarrollo Curricular</div>
            <q-space />
        </div>
        <div>
            <div v-for="(Desar, index) in desarrolloCur" :key="index">
                <div class="q-pa-md row items-start q-gutter-md" id="cart">
                    <q-card class="my-card" flat bordered>
                        <div class="q-pa-md row items-start q-gutter-md">
                            <q-card class="my-card" id="card" flat bordered>
                                <h5>{{}}</h5>
                                <q-list>
                                    <q-item>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="keyboard_arrow_right" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>Gias de Aprendizaje</q-item-label>
                                            <q-item-label caption>{{
                                                Desar.guiasAprendizaje
                                            }}</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="keyboard_arrow_right" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>Matirz de Correlacion</q-item-label>
                                            <q-item-label caption>{{
                                                Desar.matrizCorrelacion
                                            }}</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="keyboard_arrow_right" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>Proyecto Formativo</q-item-label>
                                            <q-item-label caption>{{
                                                Desar.proyectoFormativo
                                            }}</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="keyboard_arrow_right" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>Planeacion Pedagogica</q-item-label>
                                            <q-item-label caption>{{
                                                Desar.planeacionPedagogica
                                            }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card>
                        </div>
                        <q-card-actions>
                            <q-btn label="Descargar" icon="download" color="green" @click="open('right')" />
                            <q-btn label="Editar" @click="edito(index)" icon="edit" color="primary" outline />
                        </q-card-actions>
                    </q-card>
                </div>
            </div>
        </div>

        <div>
            <q-dialog v-model="alert" persistent>
                <q-card id="card">
                    <div style="display: flex">
                        <q-card-section>
                            <div class="text-h4">Desarrollo Curricular</div>
                        </q-card-section>
                        <div style="margin-left: auto; margin-bottom: auto">
                            <q-btn @click="toggleX, limpiarFormulario()" class="close-button" icon="close" />
                        </div>
                    </div>
                    <q-card-section class="q-pt-none" id="card">
                        <q-card flat bordered class="my-card">
                            <q-card-section class="q-pa-md">
                                <q-select v-model="guiasAprendizaje" label="Guias de Aprendizaje"
                                    :options="InstrumentosEvaluacionOptions"
                                    :rules="[(val) => !!val || 'Campo requerido']" />
                                <q-card-section>
                                    <q-input class="input" v-model="matrizCorrelacion" label="Matriz de Correlación"
                                        :rules="[(val) => !!val || 'Campo requerido']" dense clearable
                                        prepend-icon="attach_file" @clear="limpiarCampo">
                                        <template v-slot:append>
                                            <q-icon name="attach_file" style="cursor: pointer"
                                                @click="abrirSelectorDeArchivos" />
                                        </template>
                                    </q-input>
                                </q-card-section>
                                <q-card-section>
                                    <q-input class="input" v-model="proyectoFormativo" label="Proyecto Formativo"
                                        :rules="[(val) => !!val || 'Campo requerido']" dense clearable
                                        prepend-icon="attach_file" @clear="limpiarCampo">
                                        <template v-slot:append>
                                            <q-icon name="attach_file" style="cursor: pointer"
                                                @click="abrirSelectorDeArchivos2()" />
                                        </template>
                                    </q-input>
                                </q-card-section>
                                <q-card-section>
                                    <q-input class="input" v-model="planeacionPedagogica" label="Planeacion Pedagogica"
                                        :rules="[(val) => !!val || 'Campo requerido']" dense clearable
                                        prepend-icon="attach_file" @clear="limpiarCampo">
                                        <template v-slot:append>
                                            <q-icon name="attach_file" style="cursor: pointer"
                                                @click="abrirSelectorDeArchivos3()" />
                                        </template>
                                    </q-input>
                                </q-card-section>
                            </q-card-section>
                            <q-card-section>
                                <div id="mensajeError"></div>

                                <div role="alert"
                                    style="border: 2px solid red;border-radius: 20px;text-align: center;background-color: rgba(255, 0, 0, 0.304);"
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
                        <q-btn flat label="Guardar" @click="validarYGuardar()" color="primary" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
        <div>
            <q-dialog v-model="alert2" persistent>
                <q-card id="card">
                    <div style="display: flex">
                        <q-card-section>
                            <div class="text-h4">Editar Desarrollo Curricular</div>
                        </q-card-section>
                        <div style="margin-left: auto; margin-bottom: auto">
                            <q-btn @click="toggleX, limpiarFormulario()" class="close-button" icon="close" />
                        </div>
                    </div>
                    <q-card-section class="q-pt-none" id="card">
                        <q-card flat bordered class="my-card">
                            <q-card-section class="q-pa-md">
                                <q-select v-model="guiasAprendizaje" label="Guias de Aprendizaje"
                                    :options="InstrumentosEvaluacionOptions"
                                    :rules="[(val) => !!val || 'Campo requerido']" />
                                <q-card-section>
                                    <q-input class="input" v-model="matrizCorrelacion" label="Matriz de Correlación"
                                        :rules="[(val) => !!val || 'Campo requerido']" dense clearable
                                        prepend-icon="attach_file" @clear="limpiarCampo">
                                        <template v-slot:append>
                                            <q-icon name="attach_file" style="cursor: pointer"
                                                @click="abrirSelectorDeArchivos" />
                                        </template>
                                    </q-input>
                                </q-card-section>
                                <q-card-section>
                                    <q-input class="input" v-model="proyectoFormativo" label="Proyecto Formativo"
                                        :rules="[(val) => !!val || 'Campo requerido']" dense clearable
                                        prepend-icon="attach_file" @clear="limpiarCampo">
                                        <template v-slot:append>
                                            <q-icon name="attach_file" style="cursor: pointer"
                                                @click="abrirSelectorDeArchivos2()" />
                                        </template>
                                    </q-input>
                                </q-card-section>
                                <q-card-section>
                                    <q-input class="input" v-model="planeacionPedagogica" label="Planeacion Pedagogica"
                                        :rules="[(val) => !!val || 'Campo requerido']" dense clearable
                                        prepend-icon="attach_file" @clear="limpiarCampo">
                                        <template v-slot:append>
                                            <q-icon name="attach_file" style="cursor: pointer"
                                                @click="abrirSelectorDeArchivos3()" />
                                        </template>
                                    </q-input>
                                </q-card-section>
                            </q-card-section>
                            <q-card-section>
                                <div id="mensajeError"></div>

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
                        <q-btn flat label="Cerrar" @click="limpiarFormulario(), cerrar()" color="primary" v-close-popup />
                        <q-btn flat label="Guardar" @click="validaredit()" color="primary" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import { useDesarrolloCurricularStore } from "../stores/DesarrolloCurricular.js";
import { useLoginStore } from "../stores/login.js";
import { load } from "../routes/direccion.js";
import { useGuiasAprendizStore } from "../stores/GuiasAprediz.js";
const useDesarrolloCurricular = useDesarrolloCurricularStore();
let Storeguias = useGuiasAprendizStore();
const useLogin = useLoginStore();
let desarrolloCur = ref([]);
let loading = ref(false);
let alert = ref(false);
let alert2 = ref(false);
let guiasAprendizaje = ref(null);
let matrizCorrelacion = ref("");
let proyectoFormativo = ref("");
let planeacionPedagogica = ref("");
let indice = ref(null);
let check = ref("");




const showPreview = ref(false);
const documentUrl = ref("");

const openDocumentPreview = () => {
    documentUrl.value = "https://docs.google.com/document/d/1rkX6Qgp5fRUVVDx4O3rXFlzs9DENrKzK/edit?usp=drive_link&ouid=117914305252683912742&rtpof=true&sd=true"; // Reemplaza con la URL de tu documento
    showPreview.value = true;

    const iframe = document.querySelector('iframe');
    iframe.onload = () => {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    };
};

const closePreview = () => {
    showPreview.value = false;
};




function mostrarAlerta(mensaje) {
    alert.value = true;
    check.value = mensaje;
}
async function ListarDesarrollo() {
    load.value = true;
    let Desarrollo = await useDesarrolloCurricular.getDesarrolloCurricular(useLogin.token);
    console.log(Desarrollo);
    desarrolloCur.value = Desarrollo.data.Desarrollo;
    load.value = false;
}
const InstrumentosEvaluacionOptions = ref([]);

const getGuias = async () => {
    try {
        const response = await Storeguias.getGuiasAprendiz(useLogin.token);
        const instrumentos = response.data;

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
async function validarYGuardar() {
    if (!guiasAprendizaje.value === "") {
        mostrarAlerta("La guía de Aprendizaje es Requerida");
    } else if (!matrizCorrelacion.value === "") {
        mostrarAlerta("La matriz de Correlacion es Requerida");
    } else if (!proyectoFormativo.value === "") {
        mostrarAlerta("El proyecto Formativo es Requerido");
    } else if (!planeacionPedagogica.value === "") {
        mostrarAlerta("La Planeacion Pedagogica es Requerida");
    } else {
        alert.value = false;
        guardar();
    }

    /* guiasAprendizaje,
                  matrizCorrelacion,
                  proyectoFormativo,
                  planeacionPedagogica */
}
async function guardar() {
    loading.value = true;
    try {
        const response = await useDesarrolloCurricular.addDesarrolloCurricular({
            guiasAprendizaje: guiasAprendizaje.value.value,
            matrizCorrelacion: matrizCorrelacion.value,
            proyectoFormativo: proyectoFormativo.value,
            planeacionPedagogica: planeacionPedagogica.value,
        });
        console.log(
            guiasAprendizaje.value.value,
            matrizCorrelacion.value,
            proyectoFormativo.value,
            planeacionPedagogica.value
        );
        if (response.status === 200) {
            console.log("Se guardó un nuevo rol usuario");
            ListarDesarrollo();
            limpiarFormulario();
            alert.value = false; // Cierra la alerta
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

const edito = (index) => {
    idEdicion.value = index;
    let r = desarrolloCur.value[index];
    if (r) {
        alert2.value = true;
        guiasAprendizaje.value = r.guiasAprendizaje;
        matrizCorrelacion.value = r.matrizCorrelacion;
        proyectoFormativo.value = r.proyectoFormativo;
        planeacionPedagogica.value = r.planeacionPedagogica;
    } else {
        console.error(`No se encontró un ambiente en el índice ${index}`);
    }
};

async function validaredit() {
    if (!guiasAprendizaje.value === "") {
        mostrarAlerta("La guía de Aprendizaje es Requerida");
    } else if (!matrizCorrelacion.value === "") {
        mostrarAlerta("La matriz de Correlacion es Requerida");
    } else if (!proyectoFormativo.value === "") {
        mostrarAlerta("El proyecto Formativo es Requerido");
    } else if (!planeacionPedagogica.value === "") {
        mostrarAlerta("La Planeacion Pedagogica es Requerida");
    } else {
        alert.value = false;
        editar();
    }
}
let idEdicion = ref(null);
const editar = async () => {
    if (idEdicion.value !== null) {
        const index = idEdicion.value;
        const InstrumentoEditado = {
            guiasAprendizaje: guiasAprendizaje.value.value,
            matrizCorrelacion: matrizCorrelacion.value,
            proyectoFormativo: proyectoFormativo.value,
            planeacionPedagogica: planeacionPedagogica.value,
        };
        console.log(InstrumentoEditado);
        const response = await useDesarrolloCurricular.editDesarrolloCurricular(
            desarrolloCur.value[index]._id,
            InstrumentoEditado
        );
        console.log(response);
        if (response.status === 200) {
            desarrolloCur.value[index] = InstrumentoEditado;
            alert2.value = false;
            idEdicion.value = null;
            limpiarFormulario();
            ListarDesarrollo();
        } else {
            console.error("Error al guardar los cambios en el servidor");
        }
    }
};

ListarDesarrollo();

function limpiarFormulario() {
    guiasAprendizaje.value = "";
    matrizCorrelacion.value = "";
    proyectoFormativo.value = "";
    planeacionPedagogica.value = "";

    alert.value = false;
}

const limpiarCampo = ref();

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
    matrizCorrelacion.value = selectedFileName;
    event.target.remove(); // Elimina el input de tipo file después de su uso
};
const abrirSelectorDeArchivos2 = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    fileInput.addEventListener("change", handleFileSelection2);
    document.body.appendChild(fileInput);
    fileInput.click();
};

// Función para manejar la selección de archivos
const handleFileSelection2 = (event) => {
    const selectedFile = event.target.files[0];
    const selectedFileName = selectedFile ? selectedFile.name : "";
    proyectoFormativo.value = selectedFileName;
    event.target.remove(); // Elimina el input de tipo file después de su uso
};
const abrirSelectorDeArchivos3 = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    fileInput.addEventListener("change", handleFileSelection3);
    document.body.appendChild(fileInput);
    fileInput.click();
};

// Función para manejar la selección de archivos
const handleFileSelection3 = (event) => {
    const selectedFile = event.target.files[0];
    const selectedFileName = selectedFile ? selectedFile.name : "";
    planeacionPedagogica.value = selectedFileName;
    event.target.remove(); // Elimina el input de tipo file después de su uso
};

onMounted(async () => {
    await ListarDesarrollo();
    getGuias();
});
</script>
<style scoped>
.outlook-modal {
    width: 100%;
    max-width: 1000px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.outlook-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #0078d4;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.outlook-title {
    font-size: 18px;
}

.outlook-content {
    padding: 20px;
}

.document-iframe {
    width: 100%;
    height: 500px;
    border: none;
}



.body {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 1rem;
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

#card {
    width: 35em;
    max-width: 100%;
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

.imagen {
    display: flex;
    height: 100vh;
    margin: 0;
    padding: 0;
    border: 1px solid #ccc;
    overflow: hidden;
    background-color: black;
    position: relative;
}

/* #card {
      margin-left: 30%;
      margin-right: 30%;
      margin-top: 10%;
      display: block;
      align-items: center;
      justify-content: center;
      border: 3px solid rgba(29, 88, 32, 0.35);
      border-radius: 10px;
  } */

#cart {
    width: 35em;
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
}

#card {
    width: 35em;
    max-width: 100%;
    display: block;
}

#img {
    max-width: 100%;
    max-height: 100%;
    height: 100vh;
    display: flex;
    margin-bottom: 0;
    border-radius: 2px;
    border: 0.5px solid #999;
    object-fit: cover;
    object-position: center;
}
</style>