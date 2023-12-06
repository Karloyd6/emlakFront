<template>
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button fw-600 bg-primary text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <h6><i class="fa-solid fa-magnifying-glass me-2"></i>Arama yap</h6>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        
                <!--* Acordion Menu -->
                <div class="mt-3 px-3">
        <div class="acordion-menu d-grid mx-2">
          <a class="router-link text-primary" @click="goToSalePage('allHome')"><i class="fa-solid fa-house-chimney me-2"></i>Konut</a>
          <ul class="acordion-list list-group list-group-flush ">
            <li class="list-group-item  text-primary" @click="goToSalePage('saleHome')">Satılık</li>
            <li class="list-group-item  text-primary" @click="goToSalePage('rentHome')">Kiralık</li>
          </ul>
        </div>
        <div class="acordion-menu d-grid px-2 mt-2">
          <a class="router-link  text-primary" @click="goToSalePage('allStore')"><i class="fa-solid fa-store me-2" ></i>İşyeri</a>
          <ul class="acordion-list list-group list-group-flush ">
            <li class="list-group-item  text-primary" @click="goToSalePage('saleStore')">Satılık</li>
            <li class="list-group-item text-primary" @click="goToSalePage('rentStore')">Kiralık</li>
          </ul>
        </div>
        <div class="d-grid px-2 mt-2">
          <a class="router-link  text-primary" style="font-weight: 700;cursor: pointer;" @click="goToSalePage('saleLand')"><i class="fa-solid fa-map-location-dot me-2"></i>Arsa</a>
        </div>
      </div>
        <!--* Acordion Menu -->
        <div class="delinator-line my-3 "><div class="delinator"></div></div>
        <!--* İl İLÇE arama -->
        <div class="mt-3">
          <h6 class="ms-3">Şehir/İlçe/Mahalle</h6>
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
        </div>

        <div class="delinator-line"><div class="delinator"></div></div>

        <!--* İl İLÇE arama -->
        <!--todo SEARCH ADVERTID   -->
        <div class="mb-3">
          <label for="title" class="form-label">İlan no ile ara</label>
          <input type="text" v-model="advertId" class="form-control border-dark" id="title" placeholder="ilan no">
        </div>
        <!--todo SEARCH ADVERTID   -->
        <!--! SEARCH BUTTON -->
          <div class="d-grid m-3">
            <button class="btn btn-sm btn-primary p-3">ARAMA</button>
          </div>
        <!--! SEARCH BUTTON -->

      </div>
    </div>
    
  </div>
  
</div>
</template>

<script setup>
import { ref } from "vue";
import store from "@/store";
import router from "@/router"
import cities from "@/assets/cities/data.json"
const cityList = ref([]);
const currentCity = ref("")
const currentCounty = ref("")
const currentDistrict = ref("")
const currentNeighborhoods = ref("")
const advertId = ref("")


const fillCities= ()=>{
  cities.forEach(city => {
    cityList.value.push(city)
  });
}

fillCities()
const goToSalePage = (whatFor)=>{
  console.log(whatFor)
  if(whatFor=="allHome"){
    store.dispatch("advert/setAdvertList","konut")
    store.commit("advert/setRentOrBuy",null)
    router.go(0)
  }else if(whatFor == "allStore" ){
    store.dispatch("advert/setAdvertList","isyeri")
    store.commit("advert/setRentOrBuy",null)
    router.go(0)
  }else if(whatFor == "saleLand"){
    store.dispatch("advert/setAdvertList","arsa")
    store.commit("advert/setRentOrBuy",null)
    router.go(0)
  }else if(whatFor == "saleHome"){
    store.dispatch("advert/setAdvertList","konut");
    store.commit("advert/setRentOrBuy","sale")
    router.go(0)
  }else if(whatFor == "rentHome"){
    store.dispatch("advert/setAdvertList","konut");
    store.commit("advert/setRentOrBuy","rent")
    router.go(0)
  }else if(whatFor == "saleStore"){
    store.dispatch("advert/setAdvertList","isyeri");
    store.commit("advert/setRentOrBuy","sale")
    router.go(0)
  }else if(whatFor == "rentStore"){
    store.dispatch("advert/setAdvertList","isyeri");
    store.commit("advert/setRentOrBuy","rent")
    router.go(0)
  }


}

</script>
