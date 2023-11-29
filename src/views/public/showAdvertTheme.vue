<template>
    <div class="card mb-3 mt-2 p-1 ms-3 show-card" style="width: 350px; height: 350px;">
        
        <div class="card-img" :style="image" >
        </div>
        <div class="">
            <span class="bg-light price">{{ advert.price.toUpperCase() }}</span>
        </div>
        <div class="card-body">
            <h5>{{ advert.title }}</h5>
            <p style="font-weight: 300;"> <i class="fa-solid fa-location-dot me-2"></i>{{ advert.adress.city }} / {{ advert.adress.district }} / {{ advert.adress.hood }}</p>
        </div>
        <div class="delinator-line"><div class="delinator"></div></div>
        <div class="card-footer row justify-content-between">
            <div class="col" style="border-right: 1px solid #3d3d3d;">
                <svg style="width: 20px;height: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g id="Layer_28" data-name="Layer 28"><path d="M57,6H7A1,1,0,0,0,6,7V57a1,1,0,0,0,1,1H36.59a1,1,0,0,0,1-1V39.92a1,1,0,0,0-2,0V56H8V40.92H26.89a1,1,0,0,0,1-1V30.54a1,1,0,0,0-2,0v8.38H8V22H26.89a1,1,0,0,0,1-1V8H38.71v6.92a1,1,0,1,0,2,0V8H56V22.88H39.71a1,1,0,0,0,0,2H56v14H45.33a1,1,0,0,0,0,2H56V56H47a1,1,0,0,0,0,2H57a1,1,0,0,0,1-1V7A1,1,0,0,0,57,6ZM25.89,20H8V8H25.89Z"/></g></svg>
                Oda
            </div>
            <div class="col" style="border-right: 1px solid #3d3d3d;">

            </div>
            <div class="col justify-content-start" >
                <i class="fa-solid fa-ruler-combined me-2" style="float: left;"></i>
                M2
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';

    // import { defineProps } from 'vue';

    const props = defineProps({ adds : Object})
    const advert = props.adds
    // console.log(advert)

    const image = computed(()=>{

        return `background-image: url(${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/${advert.advert_images[0].url});`

        // return `${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/${advert.advert_images[0].url}`
    })

    

</script>