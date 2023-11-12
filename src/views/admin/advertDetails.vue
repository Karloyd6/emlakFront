<template>
  <adminHeader></adminHeader>
  <div class="container">
    <div class="row d-flex align-items-center my-3">
      <div class="col-lg-9">
        <h1>{{ currentAdvert.title }}</h1>
      </div>
      <div class="col-lg-3">
        <h5 class="text-danger">{{ currentAdvert.rentOrBuy = "rent" ? "Kiralık" : "Satılık" }}</h5>
      </div>
    </div>

    <div class="row mb-2">
      <div class="col">
        <h4 class="text-danger"><b class="text-danger">$</b>{{ currentAdvert.price }}</h4>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <img src="https://placehold.co/800x300" alt="" style="width: 100%" />
      </div>
    </div>

    <div class="row my-3">
      <div class="col-lg-8">
        <h3>İlan açıklaması</h3>
        <p>{{ currentAdvert.description }}</p>

        <div class="row my-3">
          <div class="col">
            <p class="tagForInfo">Oda sayısı</p>
            {{ currentAdvert.infos.roomCount }}
          </div>
          <div class="col">
            <p class="tagForInfo">kat</p>
            {{ currentAdvert.infos.levelOn }}/{{ currentAdvert.infos.levelAll }}
          </div>

          <div class="col">
            <p class="tagForInfo">Metrekare</p>
            {{ currentAdvert.infos.areaMeasureNet }}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <img src="https://placehold.co/350x500" alt="" />
      </div>
    </div>
  </div>
  <footerItem></footerItem>
</template>
<script setup>
import store from "@/store";
const currentAdvert = store.getters._getCurrentAdvert;
// console.log(currentAdvert);
</script>
