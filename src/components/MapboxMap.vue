<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import mapboxgl from "mapbox-gl";
import GalleryCarousel from '../components/GalleryCarousel.vue'
mapboxgl.accessToken = 'pk.eyJ1IjoiZG9taW5pa2t5c2VsIiwiYSI6ImNscGlncjhzdjBobHAya252OWRmbXlrdnMifQ.kvtPEds2zEHT6wu1vVltPg';
let map = ref(null);
const mapContainer = ref(null);
let images = reactive([])
const orgImages = reactive([]);
const setMarkers = reactive([]);
const root = ref(null)
const loaded = ref(false)
onMounted(() => {
  map.value = new mapboxgl.Map({
    container: 'mapContainer',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [17.12608737491174, 48.15239997299376],
    zoom: 12
  });
  map.value.addControl(new mapboxgl.NavigationControl());

  fetch('./json/data.json')
    .then((res) => res.json())
    .then((data) => {
      root.value = data.root;
      images.push(...data.images)
      orgImages.push(...data.images)
      genMarkers();
      loaded.value = true
    })
    .catch((err) => console.log(err))
})

onUnmounted(() => {
  map.value.remove();
  map.value = null;
})

const genMarkers = () => {
  class ClickableMarker extends mapboxgl.Marker {
    // zdroj: https://gist.github.com/chriswhong/8977c0d4e869e9eaf06b4e9fda80f3ab
    // new method onClick, sets _handleClick to a function you pass in
    onClick(handleClick) {
      this._handleClick = handleClick;
      return this;
    }

    // the existing _onMapClick was there to trigger a popup
    // but we are hijacking it to run a function we define
    _onMapClick(e) {
      const targetElement = e.originalEvent.target;
      const element = this._element;

      if (this._handleClick && (targetElement === element || element.contains((targetElement)))) {
        this._handleClick();
      }
    }
  };

  images.forEach((item) => {
    let done = false;
    if (setMarkers.length) {
      setMarkers.forEach((marker) => {
        const lngLat = marker.getLngLat();
        if (lngLat.lng === parseFloat(item.lng) && lngLat.lat === parseFloat(item.lat)) {
          done = true;
        }
      })
    }
    if (done) return;
    const marker = new ClickableMarker()
    setMarkers.push(marker);
    marker.setLngLat([item.lng, item.lat])
    marker.onClick(() => {
      filterImages(marker.getLngLat());
    })
    let el = marker.getElement();
    el.setAttribute('data-bs-toggle', 'modal');
    el.setAttribute('data-bs-target', '#carouselModal');
    marker.addTo(map.value);
  })
}

const filterImages = (lngLat) => {
  const filteredImages = orgImages.filter((item) => item.lng === lngLat.lng.toString() && item.lat === lngLat.lat.toString())
  images.splice(0, images.length, ...filteredImages)
}


</script>

<template>
  <div ref="mapContainer" id="mapContainer" class="map-container"></div>
  <div v-if="loaded">
    <GalleryCarousel :images="images" :root="root" :loaded="true" :ind="0" />
  </div>
</template>

<style scoped>
.map-container {
  flex: 1;
  height: 80vh;
}

.mapboxgl-marker {
  cursor: pointer;
}
</style>