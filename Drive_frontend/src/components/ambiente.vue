<template>
  <div class="card-container">
    <div class="body">
      <div class="text">Ambientes de Formación</div>
      <button class="agregar" @click="showModal = true">
        Agregar
      </button>
    </div>
    <div>
      <!-- Itera a través de los ambientes y muestra cada uno en un card -->
      <div v-for="(ambiente, index) in ambientess" :key="index">
        <!-- Tu card aquí, puedes usar el ejemplo anterior como base -->
        <div class="card">
          
          <div class="top-half">
            <div class="info">
              <p><strong>Código:</strong> {{ ambiente.codigo }}</p>
              <p><strong>Nombre:</strong> {{ ambiente.nombre }}</p>
              <p><strong>Tipo:</strong> {{ ambiente.tipo }}</p>
            </div>
            <div class="buttons">
              <button @click="toggleDetails(index)" class="rotate-button">
                <div class="arrow-icon" :class="{ rotate: isRotated[index] }">
                  <img src="https://cdn-icons-png.flaticon.com/512/32/32195.png" alt="Arrow" class="arrow-icon" />
                </div>
              </button>
              <button class="editar">
                <img src="https://cdn-icons-png.flaticon.com/512/650/650143.png" alt="Arrow" class="arrow-icon" />
              </button>
              
            </div>
          </div>

          <q-slide-transition appear>
            <div v-show="cardStates[index]">
              <div class="bottom-half">
                <div class="info">
                  <p>
                    <strong>Descripción:</strong> {{ ambiente.descripcion }}
                  </p>
                  <p><strong>Documentos:</strong> {{ ambiente.documentos }}</p>
                  <p>
                    <strong>ID Centro de Formación:</strong>
                    {{ ambiente.idCentroDeFormacion }}
                  </p>
                </div>
              </div>
            </div>
          </q-slide-transition>
        </div>
      </div>
    </div>
    <!-- Modal para agregar programas -->
    <div>
      <q-dialog v-model="showModal">
        <q-card class="custom-modal">
          <q-card-section>
            <div class="text2">Agregar Ambiente</div>
            <q-input v-model="Codigo" label="Codigo" />
            <q-input v-model="Nombre" label="Nombre" />
            <q-input v-model="Tipo" label="Tipo" />
            <q-input v-model="Descripcion" label="Descripcion" />
            <div>
              <q-select
                v-model="IdCentroFormacion"
                :options="opciones"
                label="Selecciona una Id de Centro de Formacion"
              />
            </div>
            <!-- inicio -->
            <q-card-section>
      <q-input
       class="input"
        v-model="archivoOEnlace"
        label="Documentos"
        outlined
        dense
        clearable
        prepend-icon="attach_file"
        @clear="limpiarCampo"
      >
        <template v-slot:append>
          <q-icon name="attach_file" style="cursor: pointer" @click="abrirSelectorDeArchivos" />
        </template>
      </q-input>
    </q-card-section>
      <!-- fin -->
          </q-card-section>
          <q-card-section>
            <q-btn @click="showModal = false" label="Cancelar" />
            <q-btn
              @click="agregarAmabiente()"
              color="primary"
              label="Agregar"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAmbienteStore } from "../stores/ambiente.js";
const StoreAmbiente = useAmbienteStore();
let ambientess = ref([]);
let showModal = ref(false);
let codigo =ref("");
let Nombre =ref("");
let Tipo =ref("");
let Descripcion =ref("");
const loading = ref(false);




onMounted(async () => {
  let Formacion = await StoreAmbiente.getAmbiente();
  ambientess.value = Formacion.data.Ambiente_Formacion;
});

const cardStates = ref({});
const isRotated = ref({});
const toggleDetails = (index) => {
  // Cambia el estado de la card en el índice específico
  cardStates.value[index] = !cardStates.value[index];
  isRotated.value[index] = !isRotated.value[index];
};
const opciones = [
  "001 Centro Agroturistico sede san gil",
  "002 Centro Agroturistico sede socorro"
];
const abrirSelectorDeArchivos = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style.display = 'none';
  fileInput.addEventListener('change', handleFileSelection);
  document.body.appendChild(fileInput);
  fileInput.click();
};

// Función para manejar la selección de archivos
const handleFileSelection = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    archivoOEnlace.value = selectedFile.name;
    // Aquí puedes manejar el archivo seleccionado según tus necesidades
    alert(`Archivo seleccionado: ${selectedFile.name}`);
  }
  event.target.remove(); // Elimina el input de tipo file después de su uso
};
async function agregarAmabiente() {
  loading.value = true;
  let r = await StoreAmbiente.agregarAmbiente({
    nombre: Nombre.value,
    codigo: codigo.value,
    tipo: Tipo.value,
    descripcion:Descripcion.value
    
  });
}
</script>

<style scoped>
.body {
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
.agregar{
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
  transform: scale(1.05); /* Aumenta el tamaño en un 5% */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3); /* Agrega una sombra suave */
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



.editar{
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
  transition: transform 0.5s ease; /* Duración y tipo de transición */
}

.rotate {
  transform: rotate(180deg); /* Gira 180 grados al hacer clic */
}
</style>