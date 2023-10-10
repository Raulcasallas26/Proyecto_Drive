<template>
    <div class="card-container">
        <div class="body" style="position: relative;">
            <q-btn style="background-color: green; color: white" :disable="loading" label="Agregar" @click="agregar()" />
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
            <div v-for="(ambiente, index) in material" :key="index">
                <div class="card">
                    <div class="top-half">
                        <div class="carta">
                            <div class="info" style="text-overflow: ellipsis;">
                                <p><strong>Nombre:</strong> {{ ambiente.nombre }}</p>
                                <div class="info">
                                    <p><strong>Documentos:</strong> {{ ambiente.documento }}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <q-btn-dropdown flat round dense icon="more_vert">
                                    <q-list>
                                        <q-btn round icon="img:https://cdn-icons-png.flaticon.com/512/724/724933.png" /><br>
                                        <q-btn @click="edito(index)" round
                                            icon="img:https://cdn-icons-png.flaticon.com/512/650/650143.png" />
                                    </q-list>
                                </q-btn-dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <q-dialog v-model="alert" persistent>
            <q-card id="card" style="width: 500px; max-width: 100%;">
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
                                <q-input v-model="nombre" label="Nombre" />
                            </div>
                            <q-card-section>
                                <q-input class="input" v-model="documento" label="Documentos" dense clearable
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

const useMateriales = useMaterialesApoyoStore();
let material = ref([]);
let alert = ref(false);
let nombre = ref("");
let check = ref("")
let bd = ref(false)
let documento = ref("");
let indice = ref(null);
const loading = ref(false);

async function guardar() {
    loading.value = true;
    const r = await useMateriales.addMaterialesApoyo({
        nombre: nombre.value,
        documento: documento.value,
    });
    console.log(r);
    loading.value = false
    listarMateriales();
    limpiarFormulario()
}


async function listarMateriales() {
    let Formacion = await useMateriales.getMaterialesApoyo();
    console.log(Formacion);
    material.value = Formacion.data.MaterialesApoyo;
}
const abrirSelectorDeArchivos = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    fileInput.addEventListener("change", (event) => {
        const selectedFile = event.target.files[0];
        const selectedFileName = selectedFile ? selectedFile.name : "";

        // Asignar el nombre del archivo al campo documento
        documento.value = selectedFileName;
        // const fileExtension = selectedFileName.split('.').pop();
        // documento.value = fileExtension;
        // Buscar la opción que corresponde al nombre del archivo
        const selectedOption = opciones.find((option) =>
            option.includes(selectedFileName)
        );
        if (selectedOption) {
            // Establecer el valor de "Tipo" basado en el textoDeOpcion
            documento.value = selectedOption;
        } else {
            // Manejar el caso en que no se encuentre una opción correspondiente
            alert("No se encontró una opción correspondiente al archivo seleccionado.");
        }
        event.target.remove(); // Elimina el input de tipo file después de su uso
    });
    document.body.appendChild(fileInput);
    fileInput.click();
};

// Función para abrir el modal de edición con los datos del ambiente seleccionado
const edito = (index) => {
    indice.value = index;
    const r = material.value[index];
    nombre.value = r.nombre;
    documento.value = r.documento;
    alert.value = true;
    bd.value = true
};

const editarMateriales = async () => {
    if (indice.value !== null) {
        const index = indice.value;
        const ambienteEditado = {
            nombre: nombre.value,
            documento: documento.value,
        };

        // Llamar al método de la store para editar el ambiente en la base de datos
        const response = await useMateriales.editMaterialesApoyo(
            material.value[index]._id,
            ambienteEditado
        );

        if (response.status === 200) {
            material.value[index] = ambienteEditado;
            alert.value = false;
            indice.value = null;
            limpiarFormulario()
        } else {
            console.error("Error al guardar los cambios en el servidor");
        }
    }
};

function limpiarFormulario() {
    nombre.value = "";
    documento.value = "";
    alert.value = false
    bd.value = false
}

function agregar() {
    alert.value = true
}

onMounted(async () => {
    await listarMateriales();
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

.carta{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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

    width: 30%;
    height: 30%;
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