<script setup>
import { onMounted, ref } from 'vue';
import bootstrap from 'bootstrap/dist/js/bootstrap';


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
onMounted(() => {
    const carousel = new bootstrap.Carousel(document.querySelector('#photoCarousel'), {
        interval: 2000,
        pause: false
    })
    carousel.to(props.ind);
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
                    <div class="carousel-item" :class="[(index === ind) ? 'active' : '']" v-for="(item, index) in images" :key="index">
                        <img :src="root+'/'+item.path" class="img-fluid d-block w-100" :alt="item.name">
                        <div class="carousel-caption d-block mx-auto w-100">
                            <h5>{{ item.name }}</h5>
                            <p>{{ item.desc }}</p>
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
</style>