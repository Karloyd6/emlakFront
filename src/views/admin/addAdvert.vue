<template>
  <adminHeader></adminHeader>
  <div class="container bg-dark text-light pt-3">
    <div class="row">
      <h3 class="bg-dark text-light opacity-50">Yeni ilan ekle</h3>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="mb-3">
          <label for="title" class="form-label">İlan başlığı</label>
          <input type="text" v-model="newAdvert.title" class="form-control bg-secondary border-dark" id="title" placeholder="ilan başlığı">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">İlan açıklaması</label>
          <textarea  v-model="newAdvert.description" class="form-control bg-secondary border-dark" id="description" placeholder="ilan açıklaması">
            </textarea>
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Fiyat</label>
          <input type="text" v-model="newAdvert.price" class="form-control bg-secondary border-dark" id="price" placeholder="fiyat">
        </div>
        <div class="mb-3">
          <label for="type" class="form-label">İlan türü</label>
          <select id="type"  v-model="newAdvert.type" class="form-select" aria-label="Şehir seçiniz">
              <option selected>İlan türü giriniz</option>
              <option value="konut">Konut</option>
              <option value="arsa">Arsa - Tarla</option>
              <option value="isyeri">İş yeri</option>
            </select>
        </div>
        <div class="mb-3">
          <label for="rentOrBut" class="form-label">İlan durumu</label>
          <select id="rentOrBut"  v-model="newAdvert.rentOrBuy" class="form-select" aria-label="Şehir seçiniz">
              <option selected>İlan durumu</option>
              <option value="sale">Satılık</option>
              <option value="rent">Kiralık</option>
            </select>
        </div>
  
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">

        <!--! ADDRESS CARD -->

        <div class="card bg-info text-light p-3 ml-2 mb-2 ">
          <h5>Adres Bilgileri</h5>
          <hr>
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">Şehir</label>
            <select  class="form-select" aria-label="Şehir seçiniz" v-model="currentCity" @change="fillCounties"> 
              <option selected>Bir şehir seçiniz</option>
              <option class="text-dark" v-for="(city,index) in cityList" :key="index.latitude" :value="city">{{ city.name }}</option>
              
            </select>
          </div>
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">İlçe</label>
            <select  class="form-select" aria-label="İlçe seçiniz" v-model="currentCounty" > 
              <option selected>Bir ilçe seçiniz</option>
              <option class="text-dark" v-for="(county,index) in currentCity.counties" :key="index.latitude"  :value="county">{{ county.name }}</option>
              
            </select>
          </div>
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">Semt</label>
            <select  class="form-select" aria-label="Semt seçiniz" v-model="currentDistrict" > 
              <option selected>Bir semt seçiniz</option>
              <option class="text-dark" v-for="(district,index) in currentCounty.districts" :key="index.latitude"  :value="district">{{ district.name }}</option>
              
            </select>
          </div>
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">Mahalle</label>
            <select  class="form-select" aria-label="Mahalle seçiniz" v-model="currentNeighborhoods" > 
              <option selected>Bir mahalle seçiniz</option>
              <option class="text-dark" v-for="(neighborhoods,index) in currentDistrict.neighborhoods" :key="index.latitude"  :value="neighborhoods">{{ neighborhoods.name }}</option>
              
            </select>
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
import { ref } from "vue"
import store from "@/store";
import router from "@/router"
import cities from "@/assets/cities/data.json"
import { addAdvert } from "@/services/loaders.js"

const cityList = ref([]);
const currentCity = ref("")
const currentCounty = ref("")
const currentDistrict = ref("")
const currentNeighborhoods = ref("")

const fillCities= ()=>{
  cities.forEach(city => {
    cityList.value.push(city)
  });
}

fillCities()

const currentUser = store.getters._getCurrentUser?.username
const user = store.getters._getCurrentUser

const newAdvert = ref({
  title : null,
  description : null,
  price :null,
  adress : {
      city : null,
      county : null, 
      district : null,
      hood: null,
      detail : null,
  },
  advert_images: [],
  user : currentUser,
  type : null,
  rentOrBuy : null
})

const saveAdvert = async ()=>{
  
  newAdvert.value.adress.city = currentCity.value.name
  newAdvert.value.adress.county =currentCounty.value.name
  newAdvert.value.adress.district = currentDistrict.value.name
  newAdvert.value.adress.hood = currentNeighborhoods.value.name



  let response = await addAdvert(newAdvert.value)

  console.log("res",response)
 
  
  let value = response.data
  console.log(value)
  store.commit("setNewAddId",value)
  store.commit("currentAdvert",value)
  router.push({name: "AddImages"})

}

const clearForm = ()=>{
  newAdvert.value ={
  title : null,
  description : null,
  price :null,
  adress : {
      city : null,
      county : null,
      district : null,
      hood: null,
      detail : null,
  },
  advert_images: []
}
}



</script>
