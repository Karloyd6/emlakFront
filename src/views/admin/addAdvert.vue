<template>
  <adminHeader></adminHeader>
  <div class="container bg-dark text-light pt-3">
    <div class="row">
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="mb-3">
          <label for="title" class="form-label">İlan başlığı</label>
          <input type="text" v-model="newAdvert.title" class="form-control bg-secondary border-dark" id="title" placeholder="ilan başlığı">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">İlan açıklaması</label>
          <input type="text" v-model="newAdvert.description" class="form-control bg-secondary border-dark" id="description" placeholder="ilan açıklaması">
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Fiyat</label>
          <input type="text" v-model="newAdvert.price" class="form-control bg-secondary border-dark" id="price" placeholder="fiyat">
        </div>
        <div class="mb-3 p-2 rounded bg-warning mt-3">
          <label for="images" class="form-label">İlan resimleri</label>
          <input class="form-control bg-secondary" ref="advert_images" type="file"  @change="uploadImages" id="images" multiple>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">

        <!--! ADDRESS CARD -->

        <div class="card bg-info text-light p-3 ml-2 mb-2 ">
          <h5>Adres Bilgileri</h5>
          <hr>
          <div class="mb-3">
            <label for="city" class="form-label">Şehir</label>
            <select  v-model="newAdvert.adress.city" class="form-select" aria-label="Şehir seçiniz">
              <option selected>Bir şehir seçiniz</option>
              <option v-for="city in cityList" :key="city.latitude" :value="city">{{ city.name.toUpperCase() }}</option>
              
            </select>
          </div>
          <div class="mb-3">
            <label for="district" class="form-label">İlçe</label>
            <select  v-model="newAdvert.adress.district" class="form-select" aria-label="Default select example" id="district">
              
              <option value="0" v-if="newAdvert.adress.city==null">Şehir seçiniz</option>
              <option v-else v-for="dist in newAdvert.adress.city.counties" :key="dist" :value="dist">{{ dist.toUpperCase() }}</option>
              
            </select>
          </div>
          <div class="mb-3">
            <label for="hood" class="form-label">Mahalle</label>
            <input type="text" class="form-control bg-secondary border-dark" v-model="newAdvert.adress.hood" id="hood" placeholder="Mahallesi">
          </div>
          <div class="mb-3">
            <label for="detail" class="form-label">Adres detayı</label>
            <input type="text" class="form-control bg-secondary border-dark" v-model="newAdvert.adress.detail" id="detail" placeholder="Adres detayı">
          </div>
        </div>


      </div>
    </div>
    
    <div class="row mb-5 pb-3">
      <div class="col d-grid">
        <button class="btn btn-sm btn-success" @click="saveAdvert">KAYDET</button>
      </div>
      <div class="col d-grid">
        <button class="btn btn-sm btn-danger" @click="clearForm">İPTAL</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue"
import cities from "@/assets/cities/cities.json"
import axios from "axios"
import store from "@/store";
import router from "@/router"

const cityList = cities

const newAdvert = ref({
  title : null,
  description : null,
  price :null,
  adress : {
      city : null,
      district : null,
      hood: null,
      detail : null,
  },
  advert_images: []
})

const saveAdvert = async ()=>{

  newAdvert.value.adress.city = newAdvert.value.adress.city?.name

  const response = await fetch(`${import.meta.env.VITE_SERVER_HOST}:${
      import.meta.env.VITE_SERVER_PORT
    }/advert`,{
    method : "POST",
    mode: "cors",
    headers : {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newAdvert.value)
  })

  const value = await response.json()

  store.commit("setNewAddId",value)
  // router.push("/admin/addimages")
  router.push({name: "AdvertList"})

}

const clearForm = ()=>{
  newAdvert.value ={
  title : null,
  description : null,
  price :null,
  adress : {
      city : null,
      district : null,
      hood: null,
      detail : null,
  },
  advert_images: []
}
}



</script>
