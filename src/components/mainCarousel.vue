<template>
  <div class=" main-bg d-flex justify-content-center align-items-center">
    <!-- HOME PAGE MAİN İMAGE-->
    <showTime></showTime>
  </div>
  <div class=" bg-dark p-5 grid justify-content-center">
    <div class=" mb-5">
      <h1 class="text-light text-center fw-bold">Nasıl bir gayrimenkul arıyorsunuz?</h1>
    </div>
    <div class="search-bar col-8 offset-2" >
        <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="İlan no ile ara" v-model="advertId">

      <select class="form-select form-select-sm" aria-label="Small select example" v-model="advertType">
        <option selected>Emlak Tipi</option>
        <option value="konut">Konut</option>
        <option value="arsa">Arsa</option>
        <option value="isyeri">İşyeri</option>
      </select>

      <select class="form-select form-select-sm" aria-label="Small select example" v-model="rentOrBuy">
        <option selected>Satılık & Kiralık</option>
        <option value="buy">Satılık</option>
        <option value="rent">Kiralık</option>
      </select>

        <button class="btn btn-warning btn-sm" @click="searchIt"><i class="fa-solid fa-magnifying-glass me-2"></i>İlanlarda ara</button>
    </div>
  </div>
  
</template>

<script setup>
import { ref } from "vue";
import store from "@/store";
import router from "@/router";
import showTime from "@/components/showTime.vue"

const advertId = ref(null);
const filteredAdvert = ref([])
const advertType = ref(null)
const rentOrBuy = ref(null)
  
  const searchIt = async () => {
    if(advertId.value){
      await store.dispatch('advert/setAdvertList',null)
    
        setTimeout(() => {
          const advertList  = store.getters["advert/getAdvertList"]
          filteredAdvert.value = advertList.filter(advert => advert.advertId == advertId.value)
          if(filteredAdvert.value.length > 0){
            store.dispatch("advert/setAdvertListByQuery",filteredAdvert);
            setTimeout(() => {
              router.push({name : "ShowAdvert"})
            }, 200);
            
          }else{
            console.log("kayıt yok")
          }
        }, 500);
    }else if(advertType.value){
      if(rentOrBuy.value){
        if(advertType.value == "konut"){
          if(rentOrBuy.value == "buy"){
            store.dispatch("advert/setAdvertList","konut");
            store.dispatch("advert/setRentOrBuy","sale")
            setTimeout(() => {
              router.push({name : "ShowAdvert"})
            }, 200);
          }else if(rentOrBuy.value == "rent"){
            store.dispatch("advert/setAdvertList","konut");
            store.dispatch("advert/setRentOrBuy","rent")
            setTimeout(() => {
              router.push({name : "ShowAdvert"})
            }, 200);
          }
        }else if(advertType.value == "isyeri"){
          if(rentOrBuy.value == "buy"){
            store.dispatch("advert/setAdvertList","isyeri");
            store.dispatch("advert/setRentOrBuy","sale")
            setTimeout(() => {
              router.push({name : "ShowAdvert"})
            }, 200);
          }else if(advertType.value == "rent"){
            store.dispatch("advert/setAdvertList","isyeri");
            store.dispatch("advert/setRentOrBuy","rent")
            setTimeout(() => {
              router.push({name : "ShowAdvert"})
            }, 200);
          }
        }else if(advertType.value == "arsa"){
          if(rentOrBuy.value == "buy"){
            store.dispatch("advert/setAdvertList","arsa")
            store.dispatch("advert/setRentOrBuy",null)
            setTimeout(() => {
              router.push({name : "ShowAdvert"})
            }, 200);
          }else if(rentOrBuy.value == "rent"){
            store.dispatch("advert/setAdvertList","arsa")
            store.dispatch("advert/setRentOrBuy",null)
            setTimeout(() => {
              router.push({name : "ShowAdvert"})
            }, 200);
          }
        }
      }else{
        if(advertType.value == "konut"){
          store.dispatch("advert/setAdvertList","konut")
          store.dispatch("advert/setRentOrBuy",null)
          setTimeout(() => {
              router.push({name : "ShowAdvert"})
            }, 200);
        }else if(advertType.value == "isyeri"){
          store.dispatch("advert/setAdvertList","isyeri")
          store.dispatch("advert/setRentOrBuy",null)
          setTimeout(() => {
              router.push({name : "ShowAdvert"})
            }, 200);
        }else if(advertType.value == "arsa"){
          store.dispatch("advert/setAdvertList","arsa")
          store.dispatch("advert/setRentOrBuy",null)
          setTimeout(() => {
              router.push({name : "ShowAdvert"})
            }, 200);
        }
      }
    }else{
      console.log("yarrü")
    }


  }
</script>