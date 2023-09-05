<template>
  <div class="card-container">
    <div class="body">
        <div class="text">Ambientes de Formación</div>
      </div>
    <!-- Itera a través de los ambientes y muestra solo los primeros X elementos -->
    <div class="card" v-for="(ambiente, index) in visibleAmbientes" :key="index">
      <!-- Mitad superior de la tarjeta -->
      <div class="top-half">
        <div class="info">
          <p><strong>Código:</strong> {{ ambiente.codigo }}</p>
          <p><strong>Ambiente:</strong> {{ ambiente.ambiente }}</p>
          <p><strong>Tipo:</strong> {{ ambiente.tipo }}</p>
        </div>
        <div class="buttons">
          <button @click="toggleDetails(ambiente)">Mostrar Detalles</button>
          <button @click="edit(ambiente)">Editar</button>
          <button @click="deleteItem(ambiente)">Eliminar</button>
        </div>
      </div>

      <!-- Mitad inferior de la tarjeta (desplegable) -->
      <div class="bottom-half" v-if="ambiente.showDetails">
        <div class="info">
          <p><strong>Ciudad:</strong> {{ ambiente.ciudad }}</p>
          <p><strong>Centro de Formación:</strong> {{ ambiente.centroFormacion }}</p>
        </div>
        <div class="additional-info">
          <textarea v-model="ambiente.detalles" placeholder="Detalles o Información Adicional"></textarea>
        </div>
      </div>
    </div>

    <!-- Botón para cargar más elementos -->
    <button @click="loadMore">Cargar Más</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const ambientes = ref([
  // Ejemplo de datos iniciales
  {
    codigo: "001",
    ambiente: "01",
    tipo: "sistemas",
    ciudad: "San Gil",
    centroFormacion: "Agroturístico",
    detalles: "equipado con computadoras y recursos tecnológicos destinado a la enseñanza y el aprendizaje de habilidades relacionadas con la informática y la tecnología. ",
    showDetails: false,
  },
  // Agrega más objetos de ambiente de formación aquí...
]);

const limit = 5; // Define la cantidad inicial de elementos que se muestran
const visibleAmbientes = ref(ambientes.value.slice(0, limit)); // Inicialmente muestra solo los primeros X elementos

const toggleDetails = (ambiente) => {
  ambiente.showDetails = !ambiente.showDetails;
};

const edit = (ambiente) => {
  // Implementa la lógica para editar la información de un ambiente
};

const deleteItem = (ambiente) => {
  // Implementa la lógica para eliminar un ambiente
};

const loadMore = () => {
  // Aumenta el límite para mostrar más elementos
  const newLimit = visibleAmbientes.value.length + 5;

  // Actualiza la lista de elementos visibles
  visibleAmbientes.value = ambientes.value.slice(0, newLimit);
};
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
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}

.top-half {
  display: flex;
  justify-content: space-between;
}

.info {
  flex: 1;
}

.buttons {
  display: flex;
  flex-direction: column;
}

.bottom-half {
  margin-top: 10px;
  display: none;
}

.additional-info {
  margin-top: 10px;
}


</style>
