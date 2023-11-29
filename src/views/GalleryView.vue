<script setup>
import { ref, reactive, onMounted } from 'vue'
import GalleryCarousel from '../components/GalleryCarousel.vue'


let images = reactive([])
const orgImages = reactive([])
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
        orgImages.push(...data.images) 
    })
    .catch((err) => console.log(err))
})

const filterImages = () => {
  const searchInput = document.querySelector('#searchInput')
  images.splice(0, orgImages.length, ...orgImages)
  if(searchInput.value !== '') {
    const filteredImages = images.filter((item) => item.name.toLowerCase().includes(searchInput.value.toLowerCase()) || item.desc.toLowerCase().includes(searchInput.value.toLowerCase()))
    images.splice(0, images.length, ...filteredImages)
  }
}

</script>
<template>
  <main class="container">
    <h1 class="pt-5">Galéria</h1>
    <div class="row justify-content-center">
      <div class="col-12 pt-3">
        <input type="text" name="searchInput" id="searchInput" class="form-control" placeholder="Vyhľadajte výraz v galérii" @input="filterImages()">
      </div>
    </div>
    <div v-if="loaded">
      <GalleryCarousel :images="images" :root="root" :loaded="true" :ind="idx"/>
    </div>
    <div class="row" v-if="loaded">
      <div class="col-lg-3 col-md-6 col-sm-12 mx-auto my-5 text-center" v-for="(item, index) in images" :key="index">
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