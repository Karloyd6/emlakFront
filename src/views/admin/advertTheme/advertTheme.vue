<template>
  <div class="card p-0 d-flex" style="width: 22rem">
    <img :src="advertImage" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{advert.title}}</h5>
      <br>
      <small class="card-text">
        {{advert.adress.hood}} / {{ advert.adress.district }}
      </small>
      <hr>
      <h5 class="text-bold">{{ advert.price }}</h5>
      <hr>
      <div class="row">
        <div class="col-4">
            <p class="tagForInfo">Oda sayısı</p> {{ advert.infos.roomCount }}
        </div>
        <div class="col-4">
            <p class="tagForInfo">kat</p> {{ advert.infos.levelOn }}/{{ advert.infos.levelAll }}
        </div>
        
        <div class="col-4">
            <p class="tagForInfo">Metrekare</p> {{ advert.infos.areaMeasureNet }}
        </div>
        
      </div>
      
        <div class="row p-1 d-grid mt-1" style="bottom: 0; position: relative;">
            <button class="btn btn-primary btn-sm mb-1" @click="details">Detaylar</button>
            <button class="btn btn-success btn-sm mb-1" @click="modify">Düzenle</button>
            <button class="btn btn-danger btn-sm" @click="deleteAdvert">Sil</button>
        </div>
      
      
    </div>
  </div>
</template>
<script setup>
import router from "@/router"
import store from "@/store";
import axios from "axios";
import eventEmitter from "@/utils/eventEmitter.js";
import { computed } from "vue";


const props = defineProps({ adds: Object });
const advert = props.adds;

console.log(advert.advert_images)

const details = ()=>{
    console.log(advert._id)
    store.commit("currentAdvert",advert)
    router.push({ name : "AdvertDetails"})
}

const modify = ()=>{
    store.commit("currentAdvert",advert)
    router.push({ name : "EditAdvert"})
}

const deleteAdvert = ()=>{
    axios.delete(`http://localhost:3000/advert/${advert._id}`).then((delete_req)=>{
      
        eventEmitter.emit("delete_advert")
        

    }).catch(err => console.log(err))
}

const advertImage = computed(()=>{
  return advert.advert_images.length !== 0 ?  `http://localhost:3000/${advert.advert_images[0]}` : "https://placehold.co/100x100"
})

</script>
