<script setup>
import { ref, reactive, onMounted } from 'vue'
import GalleryCarousel from '../components/GalleryCarousel.vue'


const images = reactive([])
const root = ref(null)
const loaded = ref(false)
let idx = ref(0)
onMounted(() => {
  fetch('./json/data.json')
    .then((res) => res.json())
    .then((data) => {
        root.value = data.root;
        images.push(...data.images)
        loaded.value = true
    })
    .catch((err) => console.log(err))
})

</script>
<template>
  <main class="container">
    <h1 class="pt-5">Gallery</h1>
    <div v-if="loaded" class="row">
      <GalleryCarousel :images="images" :root="root" :loaded="true" :ind="idx"/>
    </div>
    <div class="row" v-if="loaded">
      <div class="col-lg-3 col-md-6 col-sm-12 mx-auto my-5" v-for="(item, index) in images" :key="index">
        <img :src="root+'/'+item.path" class="img-thumbnail rounded" :alt="item.name" @click="idx = index"  data-bs-toggle="modal" data-bs-target="#carouselModal">
      </div>
    </div>
  </main>
</template>
<style scoped>
  .img-thumbnail {
    cursor: pointer;
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: center;
  }
</style>