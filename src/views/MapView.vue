<script setup>
import Map from '../components/MapboxMap.vue';

</script>
<template>
  <main class="container">
    <div class="wrapper">
      <Map />
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  flex: 1;
  display: flex;
  position: relative;
  padding-top: 5vh;
}

</style>
