<template>
    <div class="card-container">
        <div v-if="load == true" style="margin-top: 5px;">
            <q-linear-progress ark rounded indeterminate color="green" />
        </div>
        <div v-else class="body">
            <q-btn style="background-color: green; color: white;" :disable="loading" label="Agregar" @click="agregar()" />
            <div style="margin-left: 5%;" class="text-h4">Registro Calificado</div>
            <q-space />
        </div>
        <div>
            <div v-for="(registro, index) in RegisCal" :key="index">
                <div class="q-pa-md row items-start q-gutter-md" id="cart">
                    <q-card class="my-card" flat bordered>
                        <div class="q-pa-md row items-start q-gutter-md">
                            <q-card class="my-card" id="card" flat bordered>
                                <h5>{{   }}</h5>
                                <q-list>

                                    <q-item clickable>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="keyboard_arrow_right" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>Titulo que otorga</q-item-label>
                                            <q-item-label caption>{{ registro.titulo }}</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="keyboard_arrow_right" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>Lugar de desarrollo de la oferta</q-item-label>
                                            <q-item-label caption>{{ registro.lugarDesarrollo }}</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="keyboard_arrow_right" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>Metodologia</q-item-label>
                                            <q-item-label caption>{{ registro.metodologia }}</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="keyboard_arrow_right" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>Numero de creditos</q-item-label>
                                            <q-item-label caption>{{ registro.creditos }}</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="keyboard_arrow_right" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>Codigo Snies</q-item-label>
                                            <q-item-label caption>{{ registro.codigoSnies }}</q-item-label>
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
            <q-spinner-ios v-if="loading == true" color="green" size="20em" :thickness="100" />
                <q-card v-else id="card">
                    <div style="display: flex;">
                        <q-card-section>
                            <div class="text-h4">Registro Calificado</div>
                        </q-card-section>
                        <div style="margin-left: auto;    margin-bottom: auto;">
                            <q-btn @click="toggleX, limpiarFormulario()" class="close-button" icon="close" />
                        </div>
                    </div>
                    <q-card-section class="q-pt-none" id="card">
                        <q-card flat bordered class="my-card">
                            <q-card-section class="q-pa-md">
                                <div class="q-gutter-md">
                                    <q-input v-model="titulo" label="Titulo"
                                        :rules="[(val) => !!val || 'Campo requerido']" />
                                </div>
                                <div class="q-gutter-md">
                                    <q-input v-model="lugar" label="Lugar"
                                        :rules="[(val) => !!val || 'Campo requerido']" />
                                </div>
                                <div class="q-gutter-md">
                                    <q-input v-model="metodologia" label="Metodologia"
                                        :rules="[(val) => !!val || 'Campo requerido']" />
                                </div>
                                
                                <div class="q-gutter-md">
                                    <q-input v-model="creditos" label="Creditos"
                                        :rules="[(val) => !!val || 'Campo requerido']" />
                                </div>
                                <div>
                                    <q-input v-model="codigoSnies" label="Codigo Snies"
                                        :rules="[(val) => !!val || 'Campo requerido']" />
                                </div>
                                <q-card-section>
                                    <q-input class="input" v-model="documento"
                                        label="Archivo o enlace del registro calificado"
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
                        <q-btn flat label="Editar Proyecto" @click="editar()" color="primary" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRegistroCalificadoStore } from "../stores/RegistroCalificado.js"
import {useLoginStore} from "../stores/login.js"
import { load } from "../routes/direccion.js"
const useRegistroCalificado = useRegistroCalificadoStore()
const useLogin = useLoginStore()
let RegisCal = ref([]);
let loading = ref(false)
let alert = ref(false)
let titulo = ref("")
let lugar = ref("")
let metodologia = ref("")
let creditos = ref("")
let codigoSnies = ref("")
let documento = ref("")
let indice = ref(null)
let fecha = ref("")
let check = ref("")

async function ListarRegistro() {
    load.value = true
    console.log(useLogin.token);
    let Registro = await useRegistroCalificado.getRegistroCalificado(useLogin.token);
    console.log(Registro);
    RegisCal.value = Registro.data.RegistroCalificado;
    load.value = false
}

function edito(index) {
    let r = RegisCal.value[index];
    alert.value = true;
    indice.value = r._id;
    titulo.value = r.titulo;
    lugar.value = r.lugarDesarrollo;
    metodologia.value = r.metodologia;
    creditos.value = r.creditos;
    codigoSnies.value = r.codigoSnies;
}

const editar = async () => {
    loading.value = true
    let r = await useRegistroCalificado.editRegistroCalificado(indice.value, {
        titulo: titulo.value,
        lugarDesarrollo: lugar.value,
        metodologia: metodologia.value,
        creditos: creditos.value,
        codigoSnies: codigoSnies.value,
        fecha: fecha.value,
        documento: documento.value,
    });
    console.log(r);
    loading.value = false
    ListarRegistro()
    alert.value = false
};

function agregar() {
    alert.value = true
}

ListarRegistro()

function limpiarFormulario() {
    titulo.value = ""
    lugar.value = ""
    metodologia.value = ""
    creditos.value = ""
    codigoSnies.value = ""
    alert.value = false
}

onMounted(async () => {
    await ListarRegistro();
});

const toggleDetails = (i) => {
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