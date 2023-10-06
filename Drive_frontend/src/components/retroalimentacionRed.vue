<template>
    <div class="card-container">
        <div class="body">
            <q-btn style="background-color: green; color: white;" :disable="loading" label="Agregar" @click="agregar()" />
            <div style="margin-left: 5%;" class="text-h4">Retroalimentacion de Red</div>
            <q-space />
            <q-input borderless dense debounce="300" style="border-radius: 10px; border:grey solid 0.5px; padding: 5px;"
                color="primary" v-model="filter">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </div>
        <div>
            <div v-for="(proyecto, index) in Program" :key="index">
                <div class="card">
                    <div class="top-half" style="display: flex;">
                        <div class="info" @click="toggleDetails(index)">
                            <p><strong>Código:</strong> {{ proyecto.codigo }}</p>
                            <p><strong>Nombre:</strong> {{ proyecto.nombre }}</p>
                            <strong>Estado: </strong>
                            <span class="text-green" v-if="proyecto.estado === true">
                                Activo</span>
                            <span class="text-red" v-else> Inactivo</span>
                        </div>
                        <div style="display: flex; margin-left: auto; margin-bottom: auto;">
                            <p><strong>Version: </strong> {{ proyecto.version }} &nbsp; &nbsp; </p>
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
                            v-if="proyecto.estado === false">✅Activar
                        </q-btn>
                        <q-btn class="q-pa-r" color="red" outline @click="activar(proyecto)" v-else>⚠ inactivar</q-btn>
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
                                    <p><strong>Documento:</strong> {{ proyecto.documento }}</p>
                                    <p><strong>ID Programa:</strong>{{ proyecto.idCentroDeFormacion }}</p>
                                </div>
                            </div>
                        </div>
                    </q-slide-transition>
                </div>
            </div>
        </div>

        <div>
            <q-dialog v-model="alert" persistent>
                <q-card id="card" style="width: 35%">
                    <div style="display: flex;">
                        <q-card-section>
                            <div class="text-h4">Registro</div>
                        </q-card-section>
                        <div style="margin-left: auto;    margin-bottom: auto;">
                            <q-btn @click="toggleX, limpiarFormulario()" class="close-button" icon="close" />
                        </div>
                    </div>
                    <q-card-section class="q-pt-none" id="card">
                        <q-card flat bordered class="my-card">
                            <q-card-section class="q-pa-md">
                                <div class="q-gutter-md">
                                    <q-input v-model="codigo" label="Código"
                                        :rules="[(val) => !!val || 'Campo requerido']" />
                                </div>
                                <div class="q-gutter-md">
                                    <q-input v-model="nombre" label="Nombre"
                                        :rules="[(val) => !!val || 'Campo requerido']" />
                                </div>
                                <div class="q-gutter-md">
                                    <q-input v-model="version" label="Versión"
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
                                <div class="q-gutter-md">
                                    <q-input v-model="descripcion" label="Descripcion"
                                        :rules="[(val) => !!val || 'Campo requerido']" />
                                </div>
                                <div>
                                    <q-select v-model="programa" :options="opcionesprograma" label="Programa"
                                        :rules="[(val) => !!val || 'Campo requerido']" />
                                </div>
                                <q-card-section>
                                    <q-input class="input" v-model="documento"
                                        label="Archivo o enlace del diseño curricular"
                                        :rules="[(val) => !!val || 'Campo requerido']" dense clearable
                                        prepend-icon="attach_file" @clear="limpiarCampo">
                                        <template v-slot:append>
                                            <q-icon name="attach_file" style="cursor: pointer"
                                                @click="abrirSelectorDeArchivos" />
                                        </template>
                                    </q-input>
                                </q-card-section>
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
                        <q-btn flat label="Guardar" v-if="bd === false" @click="guardar()" color="primary" />
                        <q-btn flat label="Editar Usuario" v-else @click="editar()" color="primary" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProyectosStore } from "../stores/Proyecto.js";

const useProyecto = useProyectosStore();
const loading = ref(false);
let Program = ref([]);
let alert = ref(false);
let check = ref("")
let indice = ref(null);
let bd = ref(false)
let nombre = ref("");
let codigo = ref("");
let descripcion = ref("");
let fecha = ref("")
let version = ref("")
let programa = ref("")
let documento = ref("")
let IdPrograma = ref("");

async function guardar() {
    loading.value = true;
    let r = await useProyecto.addProyectos({
        codigo: codigo.value,
        nombre: nombre.value,
        version: version.value,
        descripcion: descripcion.value,
        fecha: fecha.value,
        documento: documento.value,
        IdPrograma: IdPrograma.value,
    });
    console.log(r);
    loading.value = false
    alert.value = false
    ListarProyectos();
    limpiarFormulario()
}

async function activar(proyecto) {
    console.log("hola");
    console.log(proyecto.estado);
    let r = proyecto;
    if (r.estado === true) {
        r.estado = false;
        console.log(r.estado, "resultado del if");
    } else {
        r.estado = true;
        console.log(r.estado, "resultado del else");
    }
    let est = await useProyecto.activarProyectos(r._id);
    console.log(est);
}

async function ListarProyectos() {
    let Proyecto = await useProyecto.getProyectos();
    console.log(Proyecto);
    Program.value = Proyecto.data.Proyecto;
    console.log();
}

function limpiarFormulario() {
    codigo.value = ""
    nombre.value = ""
    version.value = ""
    descripcion.value = ""
    fecha.value = ""
    documento.value = ""
    IdPrograma.value = ""
    alert.value = false
    bd.value = false
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

// Función para abrir el modal de edición con los datos del ambiente seleccionado
const edito = (index) => {
    bd.value = true
    indice.value = index;
    let r = Program.value[index];
    codigo.value = r.codigo;
    nombre.value = r.nombre;
    version.value = r.version;
    descripcion.value = r.descripcion;
    fecha.value = r.fecha;
    documento.value = r.documento;
    IdPrograma.value = r.IdPrograma;
    alert.value = true;
};

const editar = async () => {
    if (indice.value !== null) {
        const index = indice.value;
        const ambienteEditado = {
            codigo: codigo.value,
            nombre: nombre.value,
            version: version.value,
            descripcion: descripcion.value,
            fecha: fecha.value,
            documento: documento.value,
            IdPrograma: IdPrograma.value,
        };

        // Llamar al método de la store para editar el ambiente en la base de datos
        const response = await useProyecto.editProyectos(
            Program.value[index]._id,
            ambienteEditado
        );

        if (response.status === 200) {

            Program.value[index] = ambienteEditado;
            alert.value = false;
            indice.value = null;
        } else {

            console.error('Error al guardar los cambios en el servidor');
        }
    }
};
ListarProyectos()

function agregar() {
    alert.value = true
}

onMounted(async () => {
    await ListarProyectos();
});
//editProyectos   useProyecto
</script>

<style scoped>
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
}</style>