<template>
  <header class="">
    <headerItem></headerItem>
  </header>
  <main class="mt-5">
    <div class="row main-bg align-items-center" style="width: 100%;height: 180px; background-size: cover;background-position: 50%;">
        <h1 class="text-dark ms-3">İLANLAR</h1>
        <p class="ms-5">
            <router-link class="router-link" :to="{name : 'HomePage'}">ANASAYFA</router-link> / <router-link class="router-link"  :to="{name : 'HomePage'}">İLANLAR</router-link>
        </p>
    </div>
    <div class="container">
        <div class="row">
            <!--! SEARCH AREA -->
            <div class="col col-lg-3 col-md-12 col-sm-12 mt-5">
                <searchArea></searchArea>
            </div>
            <!--! SEAarCH AREA END-->
            <div class="col col-lg-9 col-md-12 col-sm-12">
                <div class="mt-3">
            <p>
                Bulunan kayıt : {{ count }}
            </p>
            </div>
                <div class="row mt-5 gap-1 justify-content-center">
                <showAdvertTheme v-for="(adds,index) in allAdverts" :key="index" :adds="adds"></showAdvertTheme>
                </div>
            </div>
        </div>
        
    </div>
    
    
  </main>
  


  <!-- <footerItem></footerItem> -->

</template>
<script setup>
import { computed, ref } from "vue"
import appAxios from "@/utils/appAxios.js";
import showAdvertTheme from "@/views/public/showAdvertTheme.vue";
import searchArea from "@/views/public/searchArea.vue"

const allAdverts = ref([]);

const fetchAllAdverts = () => {
  appAxios
    .get(`/advert`)
    .then((result) => {
      allAdverts.value = result.data
    })
    .catch((err) => {
      console.log(err);
    });
};
fetchAllAdverts();

const count = computed(()=>{
    return allAdverts.value.length
})
</script>
