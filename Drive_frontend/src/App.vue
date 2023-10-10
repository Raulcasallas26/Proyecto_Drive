<template>
  <q-layout view="hHh LpR lff">
    <q-header elevated class="text-white" id="header">
      <q-toolbar>
        <q-avatar>
          <img src="../src/img/logo_sena.png" style="filter: invert(1);" alt="">
        </q-avatar>
        <!-- <q-btn v-if="!isInLoginComponent && isMobile" icon="menu" round dense @click="drawerRight = !drawerRight"
          class="q-mr-md" style="background-color: rgba(26, 0, 128, 0.282); color: white" /> -->
        <div>
          <q-btn-dropdown flat round dense v-if="!isInLoginComponent && isMobile" icon="menu">
            <q-list padding>
              <q-item clickable v-ripple id="btn" to="/home">
                <q-item-section avatar>
                  <q-icon name="home" />
                </q-item-section>
                <q-item-section>Inicio </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/usuarios">
                <q-item-section avatar>
                  <q-icon name="people" />
                </q-item-section>
                <q-item-section> Usuarios</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/programas">
                <q-item-section avatar>
                  <q-icon name="book" />
                </q-item-section>
                <q-item-section> Programas </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/ambientes">
                <q-item-section avatar>
                  <q-icon name="dashboard" />
                </q-item-section>
                <q-item-section> Ambientes </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/materialesApoyo">
                <q-item-section avatar>
                  <q-icon name="img:https://cdn-icons-png.flaticon.com/512/1556/1556328.png" />
                </q-item-section>
                <q-item-section>Materiales de apoyo</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/redConocimento">
                <q-item-section avatar>
                  <q-icon name="img:https://cdn-icons-png.flaticon.com/512/207/207233.png" />
                </q-item-section>
                <q-item-section> Red de Conocimiento </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/proyectos">
                <q-item-section avatar>
                  <q-icon name="schema" />
                </q-item-section>
                <q-item-section> proyectos </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/registroCalificado">
                <q-item-section avatar>
                  <q-icon name="img:https://cdn-icons-png.flaticon.com/128/4933/4933054.png" />
                </q-item-section>
                <q-item-section> Registro Calificado </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/retroalimentacionRed">
                <q-item-section avatar>
                  <q-icon name="img:https://cdn-icons-png.flaticon.com/128/943/943424.png" />
                </q-item-section>
                <q-item-section> Retroalimentacion de Red </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/investigacion">
                <q-item-section avatar>
                  <q-icon name="search" />
                </q-item-section>
                <q-item-section> Investigacion </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/instrumentosEvaluacion">
                <q-item-section avatar>
                  <q-icon name="quiz" />
                </q-item-section>
                <q-item-section> Instrumentos de Evaluacion </q-item-section>
              </q-item>

              <q-separator />
              <q-item clickable v-ripple to="/">
                <q-item-section avatar>
                  <q-icon name="login" />
                </q-item-section>
                <q-item-section> Salir </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <q-toolbar-title>
        </q-toolbar-title>
        <q-btn flat round dense to="/" v-if="!isInLoginComponent" icon="login">
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer v-if="!isInLoginComponent && !isMobile" v-model="drawer" style="background-color: green" show-if-above
      :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true" mini-to-overlay :max-width="100"
      :breakpoint="500" bordered :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }" style="background-color: white">
        <q-list padding>
          <q-item clickable v-ripple id="btn" to="/home">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>Inicio </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/usuarios">
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section> Usuarios</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/programas">
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>
            <q-item-section> Programas </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/ambientes">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section> Ambientes </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/materialesApoyo">
            <q-item-section avatar>
              <q-icon name="img:https://cdn-icons-png.flaticon.com/512/1556/1556328.png" />
            </q-item-section>
            <q-item-section>Materiales de apoyo</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/redConocimento">
            <q-item-section avatar>
              <q-icon name="img:https://cdn-icons-png.flaticon.com/512/207/207233.png" />
            </q-item-section>
            <q-item-section> Red de Conocimiento </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/proyectos">
            <q-item-section avatar>
              <q-icon name="schema" />
            </q-item-section>
            <q-item-section> proyectos </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/registroCalificado">
            <q-item-section avatar>
              <q-icon name="img:https://cdn-icons-png.flaticon.com/128/4933/4933054.png" />
            </q-item-section>
            <q-item-section> Registro Calificado </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/retroalimentacionRed">
            <q-item-section avatar>
              <q-icon name="img:https://cdn-icons-png.flaticon.com/128/943/943424.png" />
            </q-item-section>
            <q-item-section> Retroalimentacion de Red </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/investigacion">
            <q-item-section avatar>
              <q-icon name="search" />
            </q-item-section>
            <q-item-section> Investigacion </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/instrumentosEvaluacion">
            <q-item-section avatar>
              <q-icon name="quiz" />
            </q-item-section>
            <q-item-section> Instrumentos de Evaluacion </q-item-section>
          </q-item>

          <q-separator />
          <q-item clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>
            <q-item-section> Salir </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
let drawer = ref(false)
let miniState = ref(true)
let drawerRight = ref(false)
const leftDrawerOpen = ref(false);
const route = useRoute(); // Obtén la información de la ruta actual
const windowWidth = ref(window.innerWidth);

// Calcula si el ancho de la ventana es menor a 300px (para mostrar u ocultar el menú lateral)
const isMobile = computed(() => {
  return windowWidth.value < 600;
});

// Función para abrir/cerrar el menú lateral
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

// Agrega un listener para detectar cambios en el ancho de la ventana
window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth;
});

// Cierra el menú lateral cuando se carga la página en dispositivos móviles
onMounted(() => {
  if (isMobile.value) {
    drawer.value = false;
  }
});

// Observa cambios en el valor de isMobile para cerrar el menú lateral si es necesario
watch(isMobile, (newValue) => {
  if (newValue) {
    drawer.value = false;
  }
});








// Calcula si estás en el componente de inicio de sesión
const isInLoginComponent = computed(() => {
  return route.path === '/'; // La ruta del componente Login
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>


<style scoped>
/* Estilo del botón de hamburguesa en dispositivos móviles */
.q-btn.is-mobile {
  display: block;
  margin: 10px;
  /* Ajusta el margen según tus necesidades */
}

/* Estilo del menú lateral en dispositivos móviles */
.q-drawer.is-mobile {
  width: 100%;
  max-width: 100%;
}



#text {
  font-size: 20px;
  font-family: cursive;
}

#btnlat {
  margin-left: 5px;
  margin-top: 5px;
  filter: invert(100);
}

#avatar {
  height: 30px;
  width: 60px;
  filter: invert(1);
}

#avarat2 {
  width: 70px;
}

#lateral {
  background-color: green;
  font-family: cursive;
}

#header {
  background-color: green;
  font-family: cursive;
}

/*botones */
#vende {
  display: flex;
  background-color: rgb(255, 255, 255);

  color: white;
  font-size: 20px;
  margin-top: 10px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}

#vende:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.779);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

#vehicu {
  display: flex;


  color: white;
  font-size: 20px;
  margin-top: 10px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}

#vehicu:hover {
  transform: scale(1.1);

  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

.custom-link {
  text-decoration: none;
  /* Eliminar subrayado */
  color: black;
}

#logout {
  width: 70%;
}
</style>