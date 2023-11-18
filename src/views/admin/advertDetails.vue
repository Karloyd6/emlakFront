<template>
  <adminHeader></adminHeader>
  <div class="container">
    <div class="card mt-5 mb-3 p-3 glass-bg">
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div
            class="carousel-item"
            :class="index == 0 ? 'active' : ''"
            v-for="(image, index) in images"
            :key="index"
            style="width: 100%; height: 30rem; position: relative"
          >
            <img
              :src="image"
              class="d-block img-fluid w-100"
              alt="image"
              style="width: 100%; height: 100%"
            />
          </div>
          <!-- <div class="carousel-item">
            <img src="..." class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="..." class="d-block w-100" alt="..." />
          </div> -->
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div class="row">
        <h3 class="mt-2 py-2">{{ currentAdvert.title.toUpperCase() }}</h3>
        <p class="card">{{ currentAdvert.description }}</p>
        <div class="col col-lg-4 col-md-12 col-sm-12">
          <h3>Adres :</h3>
          <p>
            {{ currentAdvert.adress.hood.toUpperCase() }} /
            {{ currentAdvert.adress.district.toUpperCase() }}
          </p>
          <p>{{ currentAdvert.adress.detail }}</p>
        </div>
        <div class="col col-lg-4 col-md-12 col-sm-12">
          <p>İlan numarası : {{ currentAdvert._id }}</p>
          <p>İlan durumu : {{ rentBuy }}</p>
          <p>
            Fiyat : <b>{{ currentAdvert.price }}</b>
          </p>
        </div>
        <div class="col col-lg-4 col-md-12 col-sm-12 d-grid">
          <button class="btn btn-primary btn-sm mb-1" @click="modifyImages">
            Görsel ekle/kaldır
          </button>

          <button class="btn btn-success btn-sm mb-1" @click="modify">
            Düzenle
          </button>
        </div>
      </div>
    </div>
  </div>
  <footerItem></footerItem>
</template>

<script setup>
import store from "@/store";
import router from "@/router";
import { computed, ref } from "vue";

const currentAdvert = store.getters._getCurrentAdvert;
const addImages = currentAdvert.advert_images;
const images = ref([]);

addImages.forEach((image) => {
  images.value.push(
    `${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/${
      image.url
    }`
  );
});

const rentBuy = computed(() => {
  return currentAdvert.rentOrBuy == "sale" ? "Satılık" : "Kiralık";
});

const modifyImages = () => {
  router.push({ name: "AddImages" });
};

const modify = () => {
  router.push({ name: "EditAdvert" });
};

console.log(currentAdvert.adress);
</script>
