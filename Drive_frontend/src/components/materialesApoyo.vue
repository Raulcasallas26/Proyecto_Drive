<template>
    <div class="card-container">
        <div class="body" style="position: relative;">
            <q-btn style="background-color: green;" :disable="loading" label="Agregar" @click="alert = true" />
            <div style="margin-left: 5%;" class="text-h4">Materiales de apoyo</div>
            <q-space />
            <q-input borderless dense debounce="300" style="border-radius: 10px; border:grey solid 0.5px; padding: 5px;"
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
                            <p><strong>Código:</strong> {{ ambiente.id }}</p>
                            <p><strong>Nombre:</strong> {{ ambiente.nombre }}</p>
                            <p><strong>Tipo:</strong> {{ ambiente.documento }}</p>
                        </div>
                        <div class="buttons">
                            <button @click="toggleDetails(index)" class="rotate-button">
                                <div class="arrow-icon" :class="{ rotate: isRotated[index] }">
                                    <img src="https://cdn-icons-png.flaticon.com/512/32/32195.png" alt="Arrow"
                                        class="arrow-icon" />
                                </div>
                            </button>
                            <button class="editar" @click="abrirModalEdicion(index)">
                                <img src="https://cdn-icons-png.flaticon.com/512/650/650143.png" alt="Editar"
                                    class="arrow-icon" />
                            </button>
                        </div>
                    </div>
                    <q-slide-transition appear>
                        <div v-show="cardStates[index]">
                            <div>
                                <button @click="toggleDetails(index)" class="rotate-button">
                                    <div class="arrow-icon" :class="{ rotate: isRotated[index] }">
                                        <img src="https://cdn-icons-png.flaticon.com/512/32/32195.png" alt="Arrow"
                                            class="arrow-icon" />
                                    </div>
                                </button>
                            </div>
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
        <q-dialog v-model="alert">
            <q-card id="card" style="width: 500px; max-width: 100%;">
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
                                <q-input v-model="nombre" label="Nombre" />
                            </div>
                            <div class="q-gutter-md">
                                <q-input v-model="Descripcion" label="Descripcion" />
                            </div>
                            <div class="q-gutter-md">
                                <q-input v-model="Tipo" label="Tipo" />
                            </div>
                            <q-card-section>
                                <q-input class="input" v-model="archivoOEnlace" label="Documentos" dense clearable
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
                    <q-btn flat label="Cerrar" @click="limpiarFormulario()" color="primary" v-close-popup />
                    <q-btn flat label="Guardar" v-if="bd === false" @click="guardar()" color="primary" v-close-popup />
                    <q-btn flat label="Editar Usuario" v-else @click="editarMateriales()" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useMaterialesApoyoStore } from "../stores/MaterialesApoyo.js";

const Storemateriales = useMaterialesApoyoStore();
let ambientess = ref([]);
let alert = ref(false);
let codigo = ref("");
let nombre = ref("");
let check = ref("")
let errorMessage = ref("")
const validationErrors = ref({});
let bd = ref(false)
let Tipo = ref("");
let Descripcion = ref("");
let IdCentroFormacion = ref("");
const archivoOEnlace = ref("");
const loading = ref(false);

async function guardar() {
    loading.value = true;
    try {
        const r = await Storemateriales.addMaterialesApoyo({
            id: codigo.value,
            nombre: nombre.value,
            documento: Tipo.value,
            descripccion: Descripcion.value,
            documentos: archivoOEnlace.value,
        });

        if (r.status === 200) {
            getMaterialesApoyo();
            showModalAgregar = false;
        } else {
            // Manejo de errores del servidor
            const data = await r.json(); // Si el servidor devuelve un mensaje de error JSON
            errorMessage.value = data.message; // Establece el mensaje de error
        }
    } catch (error) {
        // Manejo de errores de red o cualquier otro error
        console.error('Error en la solicitud:', error);
        errorMessage.value = 'Hubo un error en la solicitud: ' + error.message;
    } finally {
        loading.value = false;
    }
}


async function getMaterialesApoyo() {
    let Formacion = await Storemateriales.getMaterialesApoyo();
    ambientess.value = Formacion.data.MaterialesApoyo;
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
    "001 Centro Agroturistico sede san gil",
    "002 Centro Agroturistico sede socorro",
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
        const fileExtension = selectedFileName.split('.').pop();
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
            alert("No se encontró una opción correspondiente al archivo seleccionado.");
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
    codigo.value = ambienteSeleccionado.id;
    nombre.value = ambienteSeleccionado.nombre;
    Tipo.value = ambienteSeleccionado.documento;
    Descripcion.value = ambienteSeleccionado.descripccion;

    archivoOEnlace.value = ambienteSeleccionado.documentos;
    alert.value = true;
    bd.value = true

};

const editarMateriales = async () => {
    if (idAmbienteEditando.value !== null) {
        const index = idAmbienteEditando.value;
        const ambienteEditado = {
            id: codigo.value,
            nombre: nombre.value,
            documento: Tipo.value,
            descripccion: Descripcion.value,
            documentos: archivoOEnlace.value,
        };

        // Llamar al método de la store para editar el ambiente en la base de datos
        const response = await Storemateriales.editMaterialesApoyo(
            ambientess.value[index]._id,
            ambienteEditado
        );

        if (response.status === 200) {
            ambientess.value[index] = ambienteEditado;
            alert.value = false;
            idAmbienteEditando.value = null;
            limpiarFormulario()
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
    nombre.value = "";
    Tipo.value = "";
    archivoOEnlace.value = "";
    IdCentroFormacion.value = "";
    Descripcion.value = "";
    bd.value = false
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