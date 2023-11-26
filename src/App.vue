<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <h1>Vue 3 + Vite + Vue Router</h1>
      <nav>
        <RouterLink to="/">Gallery</RouterLink>
        <RouterLink to="/Map">Map</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
