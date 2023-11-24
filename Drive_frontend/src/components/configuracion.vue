<template>
  <div class="card-container">
    <div class="body">
      <div class="text">Información Personal</div>
      <q-btn style="background-color: green; color: white" :disable="loading" class="agregar" label="Editar"
        @click="showModal = true" />
    </div>

    <div class="text2">Datos Personales</div>
    <div class="datosper">
      <p><strong>Nombre:</strong> {{ useLogin.datos.nombre }}</p>
      <p><strong>Apellidos:</strong> {{ useLogin.datos.apellidos }}</p>
      <p>
        <strong>Numero de Identificacion:</strong> {{ useLogin.datos.cedula }}
      </p>
    </div>
    <div class="card">.</div>
    <div class="text2">Contacto</div>
    <div class="contac">
      <p><strong>Telefono:</strong> {{ useLogin.datos.telefono }}</p>
      <p><strong>correo electronico:</strong> {{ useLogin.datos.email }}</p>
    </div>
    <div class="card">.</div>
    <div class="text2">Educacion</div>
    <div class="educa">
      <p>
        <strong>Perfil profesional:</strong>
        {{ useLogin.datos.perfilProfesional }}
      </p>
      <!-- {{ useLogin.datos.curriculum }} -->
      <p><strong>Hoja de vida:</strong> <a :href="useLogin.datos.curriculum" target="_blank">Curriculum</a> </p>
      <p><strong>RolUsuario:</strong> {{ useLogin.datos.RolUsuario }}</p>
    </div>

    <div class="card">.</div>

    <div v-if="useLogin.datos.RolUsuario === 'Super' ||
      useLogin.datos.RolUsuario === 'Administrador'
      ">
      <div class="text4">Configuracion de Interfaz</div>
      <div class="text2">Selector de color</div>
      <q-btn label="Editar color" color="primary" @click="abrirModalEdicion(index)"></q-btn>
      <div>
        <q-dialog v-model="showModaldetalles">
          <q-card class="custom-modal">
            <q-card-section>
              <q-card-section class="q-pa-md">




              </q-card-section>
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog v-model="card">
          <q-card class="my-card" style="width: 20%;">


            <q-card-section>
              <q-color v-model="color" label="Selecciona un color" dense />

            </q-card-section>


            <q-card-actions align="right">
              <q-btn v-close-popup flat color="primary" label="Guardar"></q-btn>

            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <div class="card2">.</div>
    </div>


    <!-- modales -->
    <div>
      <q-dialog v-model="showModal">
        <q-spinner-ios v-if="loading == true" color="green" size="20em" :thickness="100" />
        <q-card v-else class="custom-modal">
          <q-card-section>
            <div class="text3">Editar Información Personal</div>
            <div class="card">.</div>
            <q-input v-model="nombre" label="Nombre" />
            <q-input v-model="apellido" label="Apellidos" />
            <q-input v-model="numidentificacion" label="Numero de indentificacion" />
            <q-input v-model="numtelefono" label="Numero de telefono" />
            <q-input v-model="correo" label="correo electronico" />
            <q-input v-model="perfilprofe" label="Perfil Profesional" />
            <div class="q-gutter-md">
              <input type="file" @change="subir_curriculum" class="custom-file-input">
            </div>
          </q-card-section>
          <div class="card">.</div>
          <q-card-actions align="right">
            <q-btn flat label="Cerrar" @click="limpiarFormulario()" color="primary" v-close-popup />
            <q-btn flat label="Editar Perfil" @click="guardarCambios()" color="primary" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUsuariosStore } from "../stores/usuarios.js";
import { useLoginStore } from "../stores/login.js";
import { useconfiguracionStore } from "../stores/configuracion.js";
import { load } from "../routes/direccion.js";

const storecolor = useconfiguracionStore();
const useLogin = useLoginStore();
let coloredit = ref("")
const editedColor = ref("");
const showModal = ref(false);
let datos = ref("");
let colorglobal = ref("");
const colors = ref("");


async function getcolor() {
  try {
    let color = await storecolor.getColor(useLogin.token);
    colorglobal.value = color.data;
    let cortar = colorglobal.value.map((item) => {
      const matches = item.color.match(/\((\d+),(\d+),(\d+)\)/);
      if (matches && matches.length === 4) {
        return `rgb(${matches[1]},${matches[2]},${matches[3]})`;
      } else {
        return "";
      }
    });
    let cortado = cortar.filter((item) => item !== "").join(",");
    colors.value = cortado;
    console.log(colors.value);
  } catch (error) {
    console.error("Error al obtener colores:", error);
  }
}
let idEdicion = ref(null);

const card = ref(false);
const abrirModalEdicion = (index) => {
  idEdicion.value = index;
  const color = colors.value[index];
  if (color) {
    coloredit.value = color.color;
    card.value = true;
  } else {
    console.error(`No se encontró un ambiente en el índice ${index}`);
  }
};
const guardarCambios = async () => {
  if (idEdicion.value !== null) {
    const index = idEdicion.value;
    const InstrumentoEditado = {
      colorId: index, // Supongamos que tienes un ID asociado con cada color
    };
    console.log(InstrumentoEditado);

    // Llamar al método de la store para editar el instrumento en la base de datos
    try {
      const response = await storecolor.actualizarColor(
        datos.value,
        InstrumentoEditado
      );

      console.log(response);
      if (response.status === 200) {
        // Realiza las acciones necesarias después de guardar los cambios
        idEdicion.value = null;
        getcolor();
      } else {
        console.error("Error al guardar los cambios en el servidor");
      }
    } catch (error) {
      console.error("Error al actualizar el color:", error);
    }
  }
};


onMounted(async () => {
  await getcolor();

});
</script>

<style scoped>
/* .body{
  display: flex;
} */
.custom-file-input {
  border-bottom: 1px solid #afafaf;
  margin: 20px;
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

.card {
  background-color: rgba(0, 0, 0, 0.164);
  font-size: 2px;
  margin-left: 1%;
  margin-right: 1%;
  height: 1%;
}

.card2 {
  background-color: rgba(0, 0, 0, 0);
  font-size: 50px;
  color: rgba(0, 0, 0, 0);
  margin-left: 1%;
  margin-right: 1%;
  height: 1%;
}

.text {
  font-size: 400%;
  color: rgb(0, 0, 0);
  margin-top: 2%;
  display: flex;
  align-items: center;
  object-position: center;
  justify-content: center;
}

/* .selected-color {
  width: 100px;
  height: 100px;
  margin-top: 10px;
  text-align: center;
  line-height: 100px;
  color: white;
} */
.text2 {
  font-size: 300%;
  color: rgb(3, 135, 3);
  margin-top: 2%;
  display: flex;
  margin-left: 1%;
}

.text3 {
  font-size: 240%;
  color: rgb(0, 0, 0);
  display: flex;
  margin-left: 1%;
}

.datosper {
  font-size: 200%;
  color: rgb(0, 0, 0);
  margin-left: 1%;
  font-family: Arial;
}

.contac {
  font-size: 200%;
  color: rgb(0, 0, 0);
  margin-left: 1%;
}

.educa {
  font-size: 200%;
  color: rgb(0, 0, 0);
  margin-left: 1%;
}

.text4 {
  font-size: 400%;
  color: rgb(0, 0, 0);
  margin-top: 2%;
  display: flex;
  align-items: center;
  object-position: center;
  justify-content: center;
}

.agregar {
  margin-left: 90%;
}

.agregar:hover {
  transform: scale(1.05);
  /* Aumenta el tamaño en un 5% */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  /* Agrega una sombra suave */
}
</style>
