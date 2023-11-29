<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import bootstrap from 'bootstrap/dist/js/bootstrap';
import mapboxgl from "mapbox-gl";

const props = defineProps({
    images: {
        type: Array,
        required: true
    },
    root: {
        type: String,
        required: true
    },
    loaded: {
        type: Boolean,
        required: true,
        default: false
    },
    ind: {
        type: Number,
        required: true,
        default: 0
    }
})
const isPaused = ref(false);
const pauseToggle = ref("Zastav");
const currImg = ref([props.images[props.ind].lng, props.images[props.ind].lat]);
mapboxgl.accessToken = 'pk.eyJ1IjoiZG9taW5pa2t5c2VsIiwiYSI6ImNscGlncjhzdjBobHAya252OWRmbXlrdnMifQ.kvtPEds2zEHT6wu1vVltPg';
let map = ref(null);
const galleryMap = ref(null)
onMounted(() => {
    map.value = new mapboxgl.Map({
            container: 'galleryMap',
            style: 'mapbox://styles/mapbox/navigation-night-v1',
            center: [currImg.value[0], currImg.value[1]],
            zoom: 5
    });
    map.value.addControl(new mapboxgl.NavigationControl());
    
    const carousel = new bootstrap.Carousel(document.querySelector('#photoCarousel'), {
        interval: 5000,
        pause: false
    })
    carousel.to(props.ind);
    let gallery = document.querySelector('#photoCarousel')
    const marker = new mapboxgl.Marker()
    marker.setLngLat([parseFloat(currImg.value[0]), parseFloat(currImg.value[1])])
    marker.addTo(map.value);
    map.value.flyTo({
        center: [currImg.value[0], currImg.value[1]],
        zoom: 15
    })
    gallery.addEventListener('slid.bs.carousel', () => {
        let activeImg = gallery.querySelector('.carousel-item.active')
        let activeIdx = activeImg.dataset.index;
        currImg.value = [props.images[activeIdx].lng, props.images[activeIdx].lat]
        console.log(currImg.value)
        marker.remove()
        marker.setLngLat([parseFloat(currImg.value[0]), parseFloat(currImg.value[1])])
        marker.addTo(map.value);
        map.value.flyTo({
            center: [currImg.value[0], currImg.value[1]],
            zoom: 15
        })
    })
})
onUnmounted(() => {
  map.value.remove();
  map.value = null;
})
const pauseCarousel = () => {
    const carousel = bootstrap.Carousel.getInstance(document.querySelector('#photoCarousel'))
    if (isPaused.value) {
        carousel.cycle()
        isPaused.value = false;
        pauseToggle.value = "Zastav";
    } else {
        carousel.pause();
        isPaused.value = true;
        pauseToggle.value = "Pokračuj";
    }
}


</script>
<template>
<div class="modal fade" id="carouselModal" tabindex="-1" aria-labelledby="carouselModalLabel" aria-hidden="true" data-bs-theme="dark">
    <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="carouselModalLabel">Galéria</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div id="photoCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button v-for="(item, index) in images" :key="index" type="button" data-bs-target="#photoCarousel" :data-bs-slide-to="index" class="active" aria-current="true" :aria-label="item.name"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item" :class="[(index === ind) ? 'active' : '']" v-for="(item, index) in images" :key="index" :data-index="index">
                        <img :src="root+'/'+item.path" class="img-fluid d-block w-100" :alt="item.name">
                        <div class="carousel-caption d-block mx-auto w-100">
                            <h5>{{ item.name }}</h5>
                            <p>{{ item.desc }} <br>
                                {{ item.date }}
                            </p>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#photoCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#photoCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div ref="galleryMap" id="galleryMap" class="map-container"></div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="pauseCarousel()">{{ pauseToggle }}</button>
        </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.carousel-item {
    max-height: 80vh;
    background: no-repeat center center scroll;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
}
.carousel-caption {
    background-color: rgba(255, 255, 255, 0.5);
    left: 0;
    right: 0;
    bottom: 0;
}
#galleryMap {
  position: relative;
  width: 30%;
  height: 30%;
  margin: 5% auto;
}

@media screen and (max-width: 1024px) {
    #galleryMap {
        width: 80%;
        height: 80%;
    }
}
</style>