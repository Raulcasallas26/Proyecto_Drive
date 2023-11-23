<template>
    <div class="card-container">
        <div v-if="load == true" style="margin-top: 5px;">
            <q-linear-progress ark rounded indeterminate color="green" />
        </div>
        <div v-else class="body">
            <q-btn style="background-color: green; color: white;" :disable="loading" label="Agregar" @click="agregar()" />
            <div style="margin-left: 5%;" class="text-h4">Proyectos</div>
            <q-space />
            <q-input borderless dense debounce="300" style="border-radius: 10px; border:grey solid 0.5px; padding: 5px;"
                color="primary">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </div>
        <div>
            <div v-for="(proyecto, index) in Proyec" :key="index">
                <div class="card">
                    <div class="top-half" style="display: flex;">
                        <div class="info" @click="toggleDetails(index)">
                            <p><strong>Nombre:</strong> {{ proyecto.nombre }} </p>
                            <p><strong>Version: </strong> {{ proyecto.version }} </p>
                            <strong>Estado: </strong>
                            <span class="text-green" v-if="proyecto.estado === true">
                                Activo</span>
                            <span class="text-red" v-else> Inactivo</span>
                        </div>
                        <div style="display: flex; margin-left: auto; margin-bottom: auto;">
                            <strong>Fecha:</strong>
                            <p>{{ proyecto.fecha ? proyecto.fecha.substring(0, 10) : '' }} </p>
                        </div>
                        <div class="buttons">
                            <button @click="toggleDetails(index)" class="rotate-button">
                                <div class="arrow-icon" :class="{ rotate: isRotated[index] }">
                                    <img src="https://cdn-icons-png.flaticon.com/512/32/32195.png" alt="Arrow"
                                        class="arrow-icon" />
                                </div>
                            </button>
                            <button class="editar" @click="edito(index)">
                                <img src="https://cdn-icons-png.flaticon.com/512/650/650143.png" alt="Editar"
                                    class="arrow-icon" />
                            </button>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: flex-end">
                        <q-btn id="boton-estado" class="q-pa-r" color="green" outline @click="activar(proyecto)"
                            v-if="proyecto.estado === false">✅
                        </q-btn>
                        <q-btn class="q-pa-r" color="red" outline @click="activar(proyecto)" v-else>❌</q-btn>
                    </div>
                    <q-slide-transition appear>
                        <div v-show="cardStates[index]">
                            <div>
                                <button class="rotate-button">
                                    <div class="arrow-icon" :class="{ rotate: isRotated[index] }"
                                        @click="toggleDetails(index)">
                                        <img src="https://cdn-icons-png.flaticon.com/512/32/32195.png" alt="Arrow"
                                            class="arrow-icon" />
                                    </div>
                                </button>
                            </div>
                            <div class="bottom-half">
                                <div class="info">
                                    <p><strong>Descripcion:</strong> {{ proyecto.descripcion }}</p>
                                    <p><strong>Documento: </strong> <a :href="proyecto.documento"
                                            target="_blank">Documento</a> </p>
                                    <p><strong>Programa:</strong>{{ proyecto.Programa }}</p>
                                </div>
                            </div>
                        </div>
                    </q-slide-transition>
                </div>
            </div>
        </div>

        <div>
            <q-dialog v-model="alert" persistent>
            <q-spinner-ios v-if="loading == true" color="green" size="20em" :thickness="100" />
                <q-card v-else id="card">
                    <div style="display: flex;">
                        <q-card-section>
                            <div class="text-h4">Registro de Proyecto</div>
                        </q-card-section>
                        <div style="margin-left: auto;    margin-bottom: auto;">
                            <q-btn @click="toggleX, limpiarFormulario()" class="close-button" icon="close" />
                        </div>
                    </div>
                    <q-card-section class="q-pt-none" id="card">
                        <q-card flat bordered class="my-card">
                            <q-card-section class="q-pa-md">
                                <div class="q-gutter-md">
                                    <q-input v-model="nombre" label="Nombre"
                                        :rules="[(val) => !!val || 'Campo requerido']" />
                                </div>
                                <div class="q-gutter-md">
                                    <q-input v-model="descripcion" label="Descripcion"
                                        :rules="[(val) => !!val || 'Campo requerido']" />
                                </div>
                                <div class="q-gutter-md">
                                    <q-input v-model="version" label="Versión"
                                        :rules="[(val) => !!val || 'Campo requerido']" />
                                </div>
                                <div class="q-gutter-md">
                                    <input type="file" @change="subir_documento" class="custom-file-input">
                                </div>
                                <div class="q-gutter-md">
                                    <q-select v-model="Programa" :options="opciones" label="Programa"
                                        :rules="[(val) => !!val || 'Campo requerido']" />
                                </div>
                                <div class="q-gutter-md" v-show="bd === true">
                                    <q-input v-model="fecha" mask="date" :rules="['date']" label="Fecha">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                    <q-date v-model="fecha">
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>
                            </q-card-section>
                            <q-card-section>
                                <div role="alert"
                                    style=" border: 2px solid red; border-radius: 20px; text-align: center; background-color: rgba(255, 0, 0, 0.304);"
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
                        <q-btn flat label="Guardar" v-if="bd === false" @click="validarYGuardar()" color="primary" />
                        <q-btn flat label="Editar Proyecto" v-else @click="validarYEditar()" color="primary" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Notify } from "quasar"
import { useProgramasFormacionStore } from "../stores/programasformacion.js";
import { useProyectosStore } from "../stores/Proyecto.js";
import { useLoginStore } from "../stores/login.js"
import { load } from "../routes/direccion.js"
const useProgramas = useProgramasFormacionStore();
const useProyecto = useProyectosStore();
const useLogin = useLoginStore()
const loading = ref(false);
let Proyec = ref([]);
let alert = ref(false);
let check = ref("")
let indice = ref(null);
let bd = ref(false)
let nombre = ref("");
let codigo = ref("");
let descripcion = ref("");
let fecha = ref("")
let version = ref("")
let documento = ref("")
let Programa = ref("");
let Programas = ref([])
let opciones = ref([])

function subir_documento(event) {
    documento.value = event.target.files[0]
    console.log(documento.value);
}

async function obtenerformacion() {
    load.value = true
    let programas = await useProgramas.getProgramasFormacion(useLogin.token);
    console.log(programas);
    Programas.value = programas.data.ProgramasFormacion;
    opciones.value = Programas.value.map(item => ({
        value: item.denominacion,
        label: item.denominacion,
    }))
    load.value = false
}

async function ListarProyectos() {
    load.value = true
    let Proyectos = await useProyecto.getProyectos(useLogin.token);
    console.log(Proyectos);
    Proyec.value = Proyectos.data.Proyecto;
    load.value = false
}

function mostrarAlerta(mensaje) {
    alert.value = true;
    check.value = mensaje;
}

async function validarYGuardar() {
    if (nombre.value.trim() === "") {
        mostrarAlerta("El Nombre es obligatorio");
    } else if (descripcion.value.trim() === "") {
        mostrarAlerta("La descripcion es obligatoria");
    } else if (version.value.trim() === "") {
        mostrarAlerta("La version es obligatoria");
    } else if (!documento.value) {
        mostrarAlerta("El documento es obligatorio");
    } else if (!Programa.value) {
        mostrarAlerta("El programa es obligatorio");
    } else {
        guardar()
    }
}

async function guardar() {
    loading.value = true;
    try {
        let r = await useProyecto.addProyectos({
            nombre: nombre.value,
            version: version.value,
            descripcion: descripcion.value,
            documento: documento.value,
            Programa: Programa.value.value,
        });
        console.log(r.status);
        if (response.status == 201) {
            console.log("Se guardó un nuevo Proyecto")
            alert.value = false
            ListarProyectos();
            limpiarFormulario()
            // Cierra la alerta
        } else {
            console.error("Error al guardar el Proyecto");
            // Puedes mostrar un mensaje de error aquí si es necesario
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        // Puedes manejar errores de red u otros errores aquí si es necesario
    } finally {
        loading.value = false;
    }
}

async function validarYEditar() {
    if (nombre.value.trim() === "") {
        mostrarAlerta("El Nombre es obligatorio");
    } else if (descripcion.value.trim() === "") {
        mostrarAlerta("La descripcion es obligatoria");
    } else if (version.value.trim() === "") {
        mostrarAlerta("La version es obligatoria");
    } else if (!documento.value) {
        mostrarAlerta("El documento es obligatorio");
    } else if (!Programa.value) {
        mostrarAlerta("El programa es obligatorio");
        console.log(cedula.value);
    } else {
        editar()
    }
}

const edito = (index) => {
    let r = Proyec.value[index];
    bd.value = true
    indice.value = r._id;
    alert.value = true;
    nombre.value = r.nombre;
    descripcion.value = r.descripcion;
    version.value = r.version;
    documento.value = r.documento;
    Programa.value = r.Programa;
    fecha.value = r.fecha;
};

async function editar() {
    loading.value = true;
    try {
        console.log("hola estoy editando");
        
        let proyectoData = {
            nombre: nombre.value,
            descripcion: descripcion.value,
            version: version.value,
            documento: documento.value,
            fecha: fecha.value,
        };

        if (Programa.value && Programa.value.value) {
            proyectoData.Programa = Programa.value.value;
        }

        let r = await useProyecto.editProyectos(
            indice.value,
            proyectoData.nombre,
            proyectoData.descripcion,
            proyectoData.version,
            proyectoData.documento,
            proyectoData.Programa,
            proyectoData.fecha
        );

        console.log("se insertaron los datos");
        console.log(r.status, r);
        
        if (r.status === 201) {
            console.log(r);
            console.log("Se edito el proyecto con exito");
            ListarProyectos();
            limpiarFormulario();
            alert.value = false; // Cierra la alerta
        } else {
            console.error("Error al editar el usuario");
            // Puedes mostrar un mensaje de error aquí si es necesario
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        console.log(error);
        // Puedes manejar errores de red u otros errores aquí si es necesario
    } finally {
        loading.value = false;
    }
}


function limpiarFormulario() {
    codigo.value = ""
    nombre.value = ""
    version.value = ""
    descripcion.value = ""
    fecha.value = ""
    documento.value = ""
    Programa.value = ""
    alert.value = false
    bd.value = false
    check.value = ""
}

async function activar(proyecto) {
    let r = proyecto;
    if (r.estado === true) {
        r.estado = false;
        console.log(r.estado, "resultado del if");
        Notify.create({
            color: "negative",
            message: "El usuario fue Desactivado",
            icon: "check",
            position: "top",
            timeout: 3000
        })
    } else {
        r.estado = true;
        console.log(r.estado, "resultado del else");
        Notify.create({
            color: "positive",
            message: "El usuario fue Activado",
            icon: "check",
            position: "top",
            timeout: 3000
        })
    }
    let est = await useProyecto.activarProyectos(r._id);
    console.log(est);
}

function cerrar() {
    bd.value = false;
    alert.value = false;
}

ListarProyectos()

function agregar() {
    alert.value = true
}

onMounted(async () => {
    await ListarProyectos();
    await obtenerformacion();
});

const toggleDetails = (index) => {
    // Cambia el estado de la card en el índice específico
    cardStates.value[index] = !cardStates.value[index];
    isRotated.value[index] = !isRotated.value[index];
};

const limpiarCampo = ref()
const cardStates = ref({});
const isRotated = ref({});

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

    // Asignar el nombre del archivo al campo documento
    documento.value = selectedFileName;

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
        alert(
            "No se encontró una opción correspondiente al archivo seleccionado."
        );
    }

    event.target.remove(); // Elimina el input de tipo file después de su uso
};
</script>

<style scoped>
.custom-file-input {
    border-bottom: 1px solid #afafaf;
    color: #afafaf;
    padding: 8px 12px;
    font-size: 16px;
    width: 96%;
    box-sizing: border-box;
    outline: none;
}

/* Estilos para cuando el input está enfocado */
.custom-file-input:hover {
    border-bottom-color: #000000;
    color: #000000;
    /* Cambiar el color de borde al estar enfocado */
}

.custom-file-input:focus {
    color: #000000;
    /* Cambiar el color de borde al estar enfocado */
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
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
    width: 100%;
    box-sizing: border-box;
}

.top-half {
    display: flex;
    align-items: center;
}

.info {
    flex: 1;
    padding-right: 10px;
}

.info p {
    margin: 6px 0;
    word-wrap: break-word;
    /* Para que el texto se ajuste en varios renglones */
}

.buttons {
    display: flex;
    align-items: center;
}

.rotate-button,
.editar {
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 8px;
}

.arrow-icon {
    width: 24px;
    height: 24px;
}

/* Estilos para los estados */
.text-green {
    color: green;
}

.text-red {
    color: red;
}

.card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
    max-width: 100%;
    box-sizing: border-box;
}

.top-half {
    display: flex;
    align-items: center;
}

.info {
    flex: 1;
    padding-right: 10px;
}

.info p {
    margin: 6px 0;
    word-wrap: break-word;
    /* Para que el texto se ajuste en varios renglones */
}

.buttons {
    display: flex;
    align-items: center;
}

.rotate-button,
.editar {
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 8px;
}

.arrow-icon {
    width: 24px;
    height: 24px;
}

/* Estilos para los estados */
.text-green {
    color: green;
}

.text-red {
    color: red;
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
</style>