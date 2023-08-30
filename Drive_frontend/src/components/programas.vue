<template>
  <div class="card-container">
    <div class="card">
      <button @click="mostrarFormulario()" class="btng " data-bs-toggle="modal" data-bs-target="#agregarModal" id="agregar">Agregar nuevo</button>
      <div class="table-container">
       <table id="tabla2" class="rounded-table">
        <thead>
          <tr id="tabla">
            <th>Ficha</th>
            <th>nombre programas</th>
            <th>Acciones</th> 
          </tr> 
        </thead> 
        <tbody>
          <tr v-for="vehiculo in vehiculos" :key="vehiculo.id">
            <td>{{ vehiculo.matricula }}</td>
            <td>{{ vehiculo.propietario }}</td>
        
          
         
            <td>
              <button @click="estadovehiculo"  id="btn3">
                 {{ vehiculo.estado==true?'❌':'✅' }}
              </button>
              
              <button @click="editarVehiculo(vehiculo)" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn1">
                📝
              </button>
              
            </td>
          </tr>
        </tbody>
       </table>
      </div>
      <button class="btng">
        <router-link to="/home" class="custom-link">volver</router-link>
      </button>
    </div>
  </div>
<!-- <div class="modal fade" id="agregarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar vehiculo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h4>Placa o Matricula</h4>
    <input type="text" v-model="matricula" placeholder="Placa o Matricula...">
    <h4>Propietario</h4>
    <input type="text" v-model="propietario" placeholder="Propietario...">
    <h4>Soat </h4>
    <input type="text" v-model="soat" placeholder="Número de certificado...">
    <h4>Revisión Técnico-Mecánica</h4>
    <input type="text" v-model="tecnomecanica" placeholder="código alfanumérico único...">
    <h4>Capacidad</h4>
    <input type="text" v-model="capasidad" placeholder="Capacidad...">
    <h4>num vehiculo</h4>
    <input type="text" v-model="num_vehiculo" placeholder="num vehiculo...">
    <h4>Conductor</h4>
    <select v-model="conduc">
      <option value="" disabled selected>Seleccione...</option>
      <option :value="c._id" v-for="(c,i) in conductores" :key="i">{{ c.nombre }}</option>
    </select>
  
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cerrar</button>
        <button type="button" class="btn btn-primary" @click="enviarDatos"  >agregar</button>
      </div>
    </div>
  </div>
</div> -->


</template>

<script setup>
import { ref,  onMounted,  } from "vue";; // Asegúrate de proporcionar la ruta correcta
import { useVehiculoStore } from "../stores/vehiculos.js"; // Importa tu store de vehículos

const storeVehiculos = useVehiculoStore();

const matricula = ref('');
const propietario = ref('');
const soat = ref('');
const tecnomecanica = ref('');
const capasidad = ref('');
const num_vehiculo = ref('');
const conductores = ref([]);
const conductor = ref([]);
const conduc = ref('');
const vehiculos = ref([]);



const data = {
    matricula: matricula.value,
    propietario: propietario.value,
    soat: soat.value,
    tecnomecanica: tecnomecanica.value,
    capacidad: capasidad.value,
    num_vehiculo: num_vehiculo.value,
    conductor: conduc.value
  };


const obtenerVehiculos = async () => {
  let r = await storeVehiculos.getVehiculos();

  vehiculos.value = r.data.vehiculos;
  console.log(r.data);
};

onMounted(async () => {
  await obtenerVehiculos();
});


</script>






<style scoped>
  .table-container {
      margin: 2%;
      
      width: 97%;
    }
.rounded-table { /* Ajusta el margen superior según tus necesidades */
      border-collapse: separate;
      border-spacing: 0;
      border-color: black;
      width: 100%; 
}

.rounded-table th, .rounded-table td {
  border: 1px solid #ccc;

  font-size: 20px;
}
.rounded-table th {
  background-color: #b3ffb4; /* Color de fondo para el encabezado */
}
.custom-link {
  text-decoration: none; /* Eliminar subrayado */
  color: black;
}
/* Estilos para los bordes redondeados y color de borde */
.rounded-table th, .rounded-table td {
  border: 1.5px solid #b5ffab; /* Establecer un borde para las celdas */
  border-radius: 10px; /* Bordes redondeados */
}

#agregarModal{
  margin-top: 50px;
}
#exampleModal{ 
  margin-top: 100px;
}



#btn1{
  background-color: white;
  
  width: 60px;
  height: 40px;
  color: white;
  font-size: 20px;
  margin-top: 20px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
.btng{
 
  
  width: 150px;
  height: 40px;
  color: rgb(0, 0, 0);
  font-size: 20px;
  margin-top: 20px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
.btng:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
#btn1:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}
#btn2{

  
  width: 60px;
  height: 40px;
  color: white;
  font-size: 20px;
  margin-top: 20px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#btn2:hover{
  transform: scale(1.1);
    
}
#btn3{
 
 background-color: white;
  width: 60px;
  height: 40px;
  color: white;
  font-size: 20px;
  margin-top: 20px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}
#btn3:hover{
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}



.card-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
} 
  .card {
    width: 1800px;
    height: 800px;
    align-items: center;
    border-color: rgb(255, 255, 255);
    text-align: center;
    font-family: cursive;
    
  }

  #text{
  font-size: 50px;
  }

#tabla2{
  background-color: rgba(241, 241, 241, 0.027);
  border-color: black;
  border-radius: 20px;
  width: 100%;
}


</style>