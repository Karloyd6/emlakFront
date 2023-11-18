<template>
  <div class="card p-0 d-flex" style="width: 22rem">
    <img :src="advertImage" class="card-img-top" :alt="advertImage" />
    <div class="card-body" style="height: 100%;">
      <h5 class="card-title">{{ advert.title }}</h5>
      
      <small class="card-text">
        {{ advert.adress.hood }} / {{ advert.adress.district }}
      </small>
      <hr />
      <h5 class="text-bold">{{ advert.price }}</h5>
      <hr />

      <div class="row p-1 d-grid mt-1" style="position: fixed bottom">
        <button class="btn btn-primary btn-sm mb-1" @click="details">
          Görüntüle
        </button>
        <button class="btn btn-primary btn-sm mb-1" @click="modifyImages">
          Görsel ekle/kaldır
        </button>
        <button class="btn btn-success btn-sm mb-1" @click="modify">
          Düzenle
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import router from "@/router";
import store from "@/store";
import axios from "axios";
import eventEmitter from "@/utils/eventEmitter.js";
import { computed } from "vue";

const props = defineProps({ adds: Object });
const advert = props.adds;

const details = () => {
  console.log(advert._id);
  store.commit("currentAdvert", advert);
  router.push({ name: "AdvertDetails" });
};

const modify = () => {
  store.commit("currentAdvert", advert);
  router.push({ name: "EditAdvert" });
};

// const deleteAdvert = ()=>{
//     axios.delete(`${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/advert/${advert._id}`).then((delete_req)=>{

//         eventEmitter.emit("delete_advert")

//     }).catch(err => console.log(err))
// }

const advertImage = computed(() => {
  return advert.advert_images.length !== 0
    ? `${import.meta.env.VITE_SERVER_HOST}:${
        import.meta.env.VITE_SERVER_PORT
      }/${advert.advert_images[0].url}`
    : "https://placehold.co/100x100";
});



const modifyImages = () => {
  store.commit("currentAdvert", advert);
  router.push({ name: "AddImages" });
};
</script>
