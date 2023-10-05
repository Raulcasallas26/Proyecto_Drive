<template>
  <div class="center">
    <img
      src="../img/icono.png"
      id="img2"
      alt=""
    />

    <!-- https://lostramites.com.co/wp-content/uploads/logo-de-SENA-png-Negro-300x300.png <h1 class="h1">Bienvenido!!!</h1> -->
  </div>
</template>

<script setup>
</script>

<style scoped>
.center {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 90vh;
}

#img2 {
  max-width: 100%; /* Aumentar el tamaño de la imagen */
  opacity: 40%;
  filter: brightness(0%) grayscale(100%);
}

.h1 {
  font-family: cursive;
  font-size: 9vw;
  margin-top: -5%;
}
</style>