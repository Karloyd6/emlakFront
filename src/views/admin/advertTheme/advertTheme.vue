<template>
  <div class="card p-0 d-flex" style="width: 22rem">
    <img :src="advertImage" class="card-img-top" :alt="advertImage" />
    <div class="card-body row" style="height: 100%;">
      <small class="opacity-75">İlan no: {{ advert._id }}</small>
      <h5 class="card-title">{{ advert.title }}</h5>
      
      <small class="card-text">
        {{ advert.adress.hood }} / {{ advert.adress.district }} /{{ advert.adress.city }}
      </small>
      <hr />
      <h5 class="text-bold">{{ advert.price }}</h5>
      <hr />

      
    </div>
    <div class="card-body p-1 d-grid mt-1" style="bottom: 0px; width: inherit; position: relative;">
        <button class="btn btn-primary btn-sm mb-1" @click="details">
          Görüntüle
        </button>

      </div>
  </div>
</template>
<script setup>
import router from "@/router";
import store from "@/store";
import { computed } from "vue";

const props = defineProps({ adds: Object });
const advert = props.adds;

const details = () => {
  store.commit("currentAdvert", advert);
  router.push({ name: "AdvertDetails" });
};

const advertImage = computed(() => {
  return advert.advert_images.length !== 0
    ? `${import.meta.env.VITE_SERVER_HOST}:${
        import.meta.env.VITE_SERVER_PORT
      }/${advert.advert_images[0].url}`
    : "https://placehold.co/100x100";
});

</script>
