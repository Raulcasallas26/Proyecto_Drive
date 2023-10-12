<template>
    <div class="card-container">
        <div class="body">
            <q-btn style="background-color: green; color: white;" :disable="loading" label="Agregar" @click="agregar()" />
            <div style="margin-left: 5%;" class="text-h4">Registro Calificado</div>
            <q-space />
        </div>
        <div>
            <div v-for="(registro, i) in RegisCal" :key="i">
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
                            <q-btn label="Editar" icon="edit" color="primary" outline @click="open('right')" />
                        </q-card-actions>
                    </q-card>
                </div>
            </div>
        </div>

        <div>
            <q-dialog v-model="alert" persistent>
                <q-card id="card">
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
                                    <q-select v-model="programa" :options="opcionesPrograma" label="Programa"
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
                        <q-btn flat label="Editar Proyecto" v-else @click="editar()" color="primary" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRegistroCalificadoStore } from "../stores/RegistroCalificado.js"
const useRegistroCalificado = useRegistroCalificadoStore()
let RegisCal = ref([]);
let loading = ref(false)
let alert = ref(false)


async function ListarRegistro() {
    let Registro = await useRegistroCalificado.getRegistroCalificado();
    console.log(Registro);
    RegisCal.value = Registro.data.RegistroCalificado;
}

ListarRegistro()

onMounted(async () => {
    await ListarRegistro();
});

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