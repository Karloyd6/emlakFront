<template>
  <header class="">
    <headerItem></headerItem>
  </header>
  <main class=" p-0">
    <div class="row main-bg align-items-center" style="width: 100%;height: 180px; background-size: cover;background-position: 50%;">
        <h1 class="text-dark ms-3">İLANLAR</h1>
        <p class="ms-5">
            <router-link class="router-link" :to="{name : 'HomePage'}">ANASAYFA</router-link> / <router-link class="router-link"  :to="{name : 'ShowAdvert'}">İLANLAR</router-link>
        </p>
    </div>
    <div class="mx-5">
        <div class="row">
            <!--! SEARCH AREA -->
            <div class="col col-lg-3 col-md-12 col-sm-12 mt-3">
                <searchArea></searchArea>
            </div>
            <!--! SEAarCH AREA END-->
            <div class="col col-lg-9 col-md-12 col-sm-12" >
                <div class="">
            <p class="p-1 rounded mt-3 text-primary d-flex justify-content-between" >
                <h6>Bulunan kayıt : {{ count }}</h6>
                <button class="btn btn-primary " @click="getAllAdverts">Tüm ilanlar</button>
            </p>
            <div class="delinator-line"><div class="delinator"></div></div>
            </div>
              <div class="row mt-2 gap-1 float-center  advert-container" style="float: left; width: 100%;" v-if="isNull">
                <showAdvertTheme v-for="(adds,index) in allAdverts" :key="index" :adds="adds" ></showAdvertTheme>
              </div>
              <div class="alert alert-warning mt-5" v-else style="width: 100%;">
                <h5 class="text-center">Görüntülenecek kayıt bulunamadı!!!</h5>
              </div>
            </div>
        </div>
        
    </div>
    
    
  </main>
  <!-- <footerItem></footerItem> -->
</template>
<script setup>
import { computed, ref } from "vue"
import showAdvertTheme from "@/views/public/showAdvertTheme.vue";
import searchArea from "@/components/search/searchArea.vue"
import store from "@/store";
import router from "@/router";

const allAdverts = ref([]);

const fetchAllAdverts = () => {
  allAdverts.value = store.getters["advert/getAdvertList"]
  const rentOrBuy = store.getters["advert/getRentOrBuy"]

  if(rentOrBuy){
    allAdverts.value = allAdverts.value.filter((advert) => {
      return advert.rentOrBuy == rentOrBuy
    })
  }
};
fetchAllAdverts();

const count = computed(()=>{
    return allAdverts.value.length
})

const getAllAdverts = ()=>{
  store.dispatch("advert/setAdvertList")
  store.dispatch("advert/setRentOrBuy",null)
  allAdverts.value = store.getters["advert/getAdvertList"]
  router.go(0)
}

const isNull = computed(()=>{
  const length = allAdverts.value.length
  return length < 1 ? false : true
})
</script>
