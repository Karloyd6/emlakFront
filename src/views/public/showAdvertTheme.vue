<template>
    <div class="card mb-3 mt-2 p-1 ms-2 show-card" style="width: 350px; height: 350px;" @click="showCurrentAdvert">
        
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
            <div class="det-down col border-right p-0" >
                <i class="down-plan"></i>
                    <b class="subtle">{{advert.info.room}}</b>
            </div>
            <div class="det-down col border-right p-0" >
                <i class="down-heating"></i>
                    <b class="subtle">{{advert.info.heating}}</b>
            </div>
            <div class="det-down col p-0" >
                <i class="down-size"></i>
                    <b class="subtle">{{advert.info.m2}}m<sup>2</sup></b>
            </div>
          
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import store from "@/store"
import router from "@/router"

    const props = defineProps({ adds : Object})
    const advert = props.adds

    const image = computed(()=>{

        return `background-image: url(${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/${advert.advert_images[0].url});`

        // return `${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/${advert.advert_images[0].url}`
    })
    
const showCurrentAdvert = ()=>{
    store.dispatch("advert/setCurrentAdvert",advert)
    router.push({name : "ShowAdvertDetail"})
}
    

</script>