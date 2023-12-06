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
            <select  class="form-select" aria-label="Şehir seçiniz" v-model="currentCity" @change="fillCounties" > 
              <option disabled value="">Bir şehir seçiniz</option>
              <option class="text-dark" v-for="(city,index) in cityList" :key="index.latitude" :value="city" >{{ city.name }}</option>
              
            </select>
          </div>
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">İlçe</label>
            <select  class="form-select" aria-label="İlçe seçiniz" v-model="currentCounty" > 
              <option disabled value="">Bir ilçe seçiniz</option>
              <option class="text-dark" v-for="(county,index) in currentCity.counties" :key="index.latitude"  :value="county">{{ county.name }}</option>
              
            </select>
          </div>
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">Semt</label>
            <select  class="form-select" aria-label="Semt seçiniz" v-model="currentDistrict" > 
              <option disabled value="">Bir semt seçiniz</option>
              <option class="text-dark" v-for="(district,index) in currentCounty.districts"  :key="index.latitude"  :value="district">{{ district.name }}</option>
              
            </select>
          </div>
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">Mahalle</label>
            <select  class="form-select" aria-label="Mahalle seçiniz" v-model="currentNeighborhoods" > 
              <option disabled value="">Bir mahalle seçiniz</option>
              <option class="text-dark" v-for="(neighborhoods,index) in currentDistrict.neighborhoods" :key="index.latitude"  :value="neighborhoods.name">{{ neighborhoods.name }}</option>
              
            </select>
          </div>
          
          <div class="mb-3">
            <label for="detail" class="form-label">Adres detayı</label>
            <input type="text" class="form-control bg-secondary border-dark" v-model="newAdvert.adress.detail" id="detail" placeholder="Adres detayı">
          </div>
        </div>


      </div>
    </div>
    <div class="row">
        <div class="card bg-primary m-0 mb-2  align-items-center">
          <h5 class="text-light">İlan bilgileri</h5>
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12 px-2 text-light " >

          <div class="mb-3">
            <label for="room" class="form-label">Oda sayısı</label>
            <input type="text" class="form-control" v-model="newAdvert.info.room" id="room" placeholder="3+1 2+3 vs...">
          </div>

          <div class="mb-3">
            <label for="m2" class="form-label">Metrekare</label>
            <input type="text" class="form-control" v-model="newAdvert.info.m2" id="m2" placeholder="120 m2">
          </div>

          <div class="mb-3">
            <label for="bath" class="form-label">Banyo sayısı</label>
            <input type="text" class="form-control" v-model="newAdvert.info.bath" id="bath" placeholder="1, 2 ....">
          </div>

          <div class="mb-3">
            <label for="kat" class="form-label">Kat</label>
            <input type="text" class="form-control" v-model="newAdvert.info.floor" id="kat" placeholder="kaçıncı kat">
          </div>

          <div class="mb-3">
            <label for="katsayısı" class="form-label">Kat sayısı</label>
            <input type="text" class="form-control" v-model="newAdvert.info.allFloor" id="katsayısı" placeholder="toplam kat">
          </div>

        </div>
        <div class="col-lg-6 col-md-12 col-sm-12">

          <div class="mb-3">
            <label for="buildage" class="form-label">Bina yaşı</label>
            <input type="text" class="form-control " v-model="newAdvert.info.buildAge" id="buildage" placeholder="bina yaşı">
          </div>

          <div class="mb-3">
            <label for="heating" class="form-label" >Isıtma</label>
            <input type="text" class="form-control" v-model="newAdvert.info.heating" id="heating" placeholder="soba, kalorifer, tezek ....">
          </div>

          <div class="mb-3">
            <label for="cephe" class="form-label">Cephe</label>
            <input type="text" class="form-control" v-model="newAdvert.info.front" id="cephe" placeholder="Kuzey, doğu .....">
          </div>

          <div class="mb-3">
            <label for="takas" class="form-label">Takas</label>
            <input type="text" class="form-control" v-model="newAdvert.info.exchange" id="takas" placeholder="Evet, Hayır">
          </div>

          <div class="mb-3">
            <label for="kredi" class="form-label">Kredi</label>
            <input type="text" class="form-control" v-model="newAdvert.info.credit" id="kredi" placeholder="Evet, Hayır">
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
const currentCity = ref(currentAdvert.adress.city)
const currentCounty = ref(currentAdvert.adress.county)
const currentDistrict = ref(currentAdvert.adress.district)
const currentNeighborhoods = ref(currentAdvert.adress.hood)

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
  info : {
        room: currentAdvert.info.room,
        m2: currentAdvert.info.m2,
        bath: currentAdvert.info.bath,
        floor: currentAdvert.info.floor,
        allFloor: currentAdvert.info.allFloor,
        buildAge: currentAdvert.info.buildAge,
        heating: currentAdvert.info.heating,
        front: currentAdvert.info.front,
        exchange: currentAdvert.info.exchange,
        credit: currentAdvert.info.credit
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

    newAdvert.value.adress.city = currentCity.value
    newAdvert.value.adress.county = currentCounty.value
    newAdvert.value.adress.district = currentDistrict.value
    newAdvert.value.adress.hood = currentNeighborhoods.value

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