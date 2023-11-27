<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView} from 'vue-router'
import router from './router';
onMounted(() => {
  router.push({ name: 'gallery' });
});
</script>

<template>
  <header>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand ps-3">Galeria</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="flex-grow-0 collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page"><router-link :to="{name: 'gallery'}">Galeria</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link"><router-link :to="{name: 'map'}">Mapa</router-link></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <RouterView class="pt-5" />
</template>

<style scoped>
a {
    text-decoration: none;
    color: white;
  }
  a:hover {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.712);
  }
  .active {
    font-weight: bold;
  }
  a:visited {
    color: white;
  }
</style>
