<template>
    <adminHeader></adminHeader>
  <div class="container bg-dark text-light pt-3 mt-2">
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

        <select  v-model="newAdvert.rentOrBuy" class="form-select mb-3 bg-secondary border-dark" aria-label="Default select example">
              <option value="0" selected>durumunu seçiniz</option>
              <option value="rent" selected>Kiralık</option>
              <option value="buy" selected>Satılık</option>
             
              
            </select>
        
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
      <div class="col-lg-6 col-md-12 col-sm-12">
        <!--! INFOS CARD -->

        <div class="card bg-danger text-light p-3 ml-2 mb-2 ">
          <h5>İlan bilgileri</h5>
          <hr>
          <div class="mb-3 ">
            <label for="roomCount" class="form-label">Oda sayısı</label>
            <input type="text" v-model="newAdvert.infos.roomCount" class="form-control bg-secondary border-dark" id="roomCount" placeholder="Oda sayısı">
          </div>
          <div class="mb-3 ">
            <label for="areaNet" class="form-label">Metrekare (NET)</label>
            <input type="text" v-model="newAdvert.infos.areaMeasureNet" class="form-control bg-secondary border-dark" id="areaNet" placeholder="net metrekare">
          </div>
          <div class="mb-3 ">
            <label for="areaBrt" class="form-label">Metrekare (BRÜT)</label>
            <input type="text" v-model="newAdvert.infos.areaMeasureBrt" class="form-control bg-secondary border-dark" id="areaBrt" placeholder="brüt metrekare">
          </div>
          <div class="mb-3 ">
            <label for="levelOn" class="form-label">Bulunduğu kat</label>
            <input type="text" v-model="newAdvert.infos.levelOn" class="form-control bg-secondary border-dark" id="levelOn" placeholder="Bulunan kat">
          </div>
          <div class="mb-3 ">
            <label for="levelAll" class="form-label">Toplam kat</label>
            <input type="text" v-model="newAdvert.infos.levelAll" class="form-control bg-secondary border-dark" id="levelAll" placeholder="Toplam kat">
          </div>
          <div class="mb-3 ">
            <label for="buildAge" class="form-label">Bina yaşı</label>
            <input type="text" v-model="newAdvert.infos.buildAge" class="form-control bg-secondary border-dark" id="buildAge" placeholder="Bina yaşı">
          </div>
          <div class="mb-3 ">
            <label for="heating" class="form-label">Isıtma</label>
            <input type="text" v-model="newAdvert.infos.heating" class="form-control bg-secondary border-dark" id="heating" placeholder="Isıtma tarzı">
          </div>
          <div class="mb-3 ">
            <label for="furnished" class="form-label">Eşyalı</label>
          
            <select  v-model="newAdvert.infos.furnished" class="form-select mb-3 bg-secondary border-dark" aria-label="Default select example">
              <option value="0" selected>durumunu seçiniz</option>
              <option value="yes" selected>Eşyalı</option>
              <option value="no" selected>Eşyasız</option>
            </select>
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
import {ref} from "vue"
import store from "@/store"
import router from "@/router"
import cities from "@/assets/cities/cities.json"

const currentAdvert = store.getters._getCurrentAdvert;
const cityList = cities;

const currentAddId = currentAdvert._id
console.log(currentAddId)
const errorMessage = ref("")
const errorClass= ref("alert-warning");
const showError = ref(false)

const newAdvert = ref({
  title : currentAdvert.title,
  description : currentAdvert.description,
  price :currentAdvert.price,
  infos : {
      roomCount : currentAdvert.infos.roomCount,
      areaMeasureNet : currentAdvert.infos.areaMeasureNet,
      areaMeasureBrt :currentAdvert.infos.areaMeasureBrt,
      levelOn : currentAdvert.infos.levelOn,
      levelAll : currentAdvert.infos.levelAll,
      buildAge : currentAdvert.infos.buildAge,
      heating : currentAdvert.infos.heating,
      furnished : currentAdvert.infos.furnished
  },
  adress : {
      city : currentAdvert.adress.city,
      district : currentAdvert.adress.district,
      hood: currentAdvert.adress.hood,
      detail : currentAdvert.adress.detail,
  },
  rentOrBuy : currentAdvert.rentOrBuy,
})

const cancelForm = ()=>{
    store.commit.currentAdvert = null;
    router.push({name : "AdvertList"})
}

const updateAdvert = async ()=>{

    newAdvert.value.adress.city = newAdvert.value.adress.city?.name

    const response = await fetch(`${import.meta.env.VITE_SERVER_HOST}:${
      import.meta.env.VITE_SERVER_PORT
    }/advert/update/${currentAddId}`,{
    method : "POST",
    mode: "cors",
    headers : {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newAdvert.value)
  })

  const value = await response.json()

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