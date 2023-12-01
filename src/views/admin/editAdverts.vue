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
            <select  class="form-select" aria-label="Şehir seçiniz" v-model="newAdvert.adress.city" @change="fillCounties" > 
              <option selected>Bir şehir seçiniz</option>
              <option class="text-dark" v-for="(city,index) in cityList"  :key="index.latitude" :value="city" >{{ city.name }}</option>
              
            </select>
          </div>
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">İlçe</label>
            <select  class="form-select" aria-label="İlçe seçiniz" v-model="newAdvert.adress.county" > 
              <option selected>Bir ilçe seçiniz</option>
              <option class="text-dark" v-for="(county,index) in currentCity.counties" :key="index.latitude"  :value="county">{{ county.name }}</option>
              
            </select>
          </div>
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">Semt</label>
            <select  class="form-select" aria-label="Semt seçiniz" v-model="newAdvert.adress.district" > 
              <option selected>Bir semt seçiniz</option>
              <option class="text-dark" v-for="(district,index) in currentCounty.districts" :key="index.latitude"  :value="district">{{ district.name }}</option>
              
            </select>
          </div>
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">Mahalle</label>
            <select  class="form-select" aria-label="Mahalle seçiniz" v-model="newAdvert.adress.hood" > 
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
    
    <div class="alert" :class="errorClass" v-if="showError">{{ errorMessage }}</div>
    
    <div class="row mb-5 pb-3">
      <div class="col d-grid">
        <button class="btn btn-sm btn-success" @click="updateAdvert">KAYDET</button>
      </div>
      <div class="col d-grid">
        <button class="btn btn-sm btn-danger" @click="cancelForm">İPTAL</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import store from "@/store"
import router from "@/router"
import cities from "@/assets/cities/data.json"
import appAxios from "@/utils/appAxios";

const currentAdvert = store.getters._getCurrentAdvert

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


const currentAddId = currentAdvert._id
const errorMessage = ref("")
const errorClass= ref("alert-warning");
const showError = ref(false);
const user = store.getters._getCurrentUser

const newAdvert = ref({
  title : currentAdvert.title,
  description : currentAdvert.description,
  price :currentAdvert.price,
  adress : {
      city : currentAdvert.adress.city,
      county : currentAdvert.adress.county,
      district : currentAdvert.adress.district,
      hood: currentAdvert.adress.hood,
      detail : currentAdvert.adress.detail,
  },
  advert_images : currentAdvert.advert_images,
  type : currentAdvert.type,
  user : currentAdvert.user,
  rentOrBuy : currentAdvert.rentOrBuy
})
console.log("new",newAdvert.value)
const cancelForm = ()=>{
    store.commit.currentAdvert = null;
    router.push({name : "AdvertList"})
}

const updateAdvert = async ()=>{

    // newAdvert.value.adress.city = currentCity.value.name
    // newAdvert.value.adress.county = currentCounty.value.name
    // newAdvert.value.adress.district = currentDistrict.value.name
    // newAdvert.value.adress.hood = currentNeighborhoods.value.name

    // console.log(newAdvert.value)

    // return false;
    const response = await  appAxios.post(`/advert/update/${currentAddId}`,newAdvert.value,{headers : {"Content-Type": "application/json"}})

  const value = await response.data
  if(value == undefined){
    errorMessage.value = "Lütfen formdaki tüm alanları doğru doldurduğunuzdan emin olun"
    showError.value= true;
    setTimeout(() => {
      showError.value=false
    }, 3000);
  }else if(value.error){
    errorMessage.value = `Hata: ${value.error}`;
    showError.value= true;
    setTimeout(() => {
      showError.value=false
    }, 3000);
  }else{
    errorMessage.value = "kayıt başarılı bir şekilde güncellenmiştir"
    errorClass.value = "alert-success";
    showError.value= true;
    setTimeout(() => {
      showError.value=false
    }, 3000);
  }
}
</script>