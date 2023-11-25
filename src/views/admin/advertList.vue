<template>
  <adminHeader></adminHeader>
  <div class="row d-flex justify-content-center bg-dark px-5" >
    <div class="row justify-content-center" v-cloak>
      <advertTheme
        class="m-1"
        v-for="(adds,index) in addList"
        :key="index"
        :adds="adds"
        v-if="addList.length>0"
      ></advertTheme>
      <div class="alert alert-warning m-5" v-else>
        Görüntülenecek kayıt bulunmamaktadır!!!
      </div>
      <infiniteLoading @infinite="getList"></infiniteLoading>
    </div>
  </div>
</template>
<script setup>

import axios from "axios";
import advertTheme from "@/views/admin/advertTheme/advertTheme.vue";
import { ref, computed } from "vue";
import eventEmitter from "@/utils/eventEmitter.js";
import store from "@/store"

let addList = ref([]);
let page = ref(1)
const user = computed(()=>store.getters._getCurrentUser)
let config = {
    headers: {
      'Authorization': 'Bearer ' + user?.access_token
    }}

const fetchData = ()=> {

  axios
  .get(
    `${import.meta.env.VITE_SERVER_HOST}:${
      import.meta.env.VITE_SERVER_PORT
    }/advert`,config,
  )
  .then((advert_req) => {
    addList.value = advert_req.data;
  })
  .catch((err) => console.log(err));
}


const getList = async ($state) => {

  console.log("loading....")

const response = await axios.get(
    `${import.meta.env.VITE_SERVER_HOST}:${
      import.meta.env.VITE_SERVER_PORT
    }/advert`,config
  )

  const data = await response.data
  if (data.length < 10)
  {$state.complete()}
      else {
        addList.value= data
        $state.loaded();
      }
      page.value++

};

fetchData()
eventEmitter.on("delete_advert", fetchData);
</script>
