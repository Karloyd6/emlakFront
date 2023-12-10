<template>
  <adminHeader></adminHeader>
  <div class="container bg-dark text-light pt-3">
    <div class="row">
      <h3 class="bg-dark text-light opacity-50">Yeni ilan ekle</h3>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="mb-3">
          <label for="title" class="form-label">İlan başlığı</label>
          <input type="text" v-model="newAdvert.title" class="form-control form-control-sm bg-secondary border-dark" id="title" placeholder="ilan başlığı">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">İlan açıklaması</label>
          <textarea rows="6" v-model="newAdvert.description" class="form-control form-control-sm bg-secondary border-dark" id="description" placeholder="ilan açıklaması">
            </textarea>
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Fiyat</label>
          <input type="text" v-model="newAdvert.price" class="form-control form-control-sm bg-secondary border-dark" id="price" placeholder="fiyat">
        </div>
        <div class="mb-3">
          <label for="type" class="form-label">İlan türü</label>
          <select id="type"  v-model="newAdvert.type" class="form-select form-select-sm" aria-label="Şehir seçiniz">
              <option selected>İlan türü giriniz</option>
              <option value="konut">Konut</option>
              <option value="arsa">Arsa - Tarla</option>
              <option value="isyeri">İş yeri</option>
            </select>
        </div>
        <div class="mb-3">
          <label for="rentOrBut" class="form-label">İlan durumu</label>
          <select id="rentOrBut"  v-model="newAdvert.rentOrBuy" class="form-select form-select-sm" aria-label="Şehir seçiniz">
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
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">Şehir</label>
            <select  class="form-select form-select-sm" aria-label="Şehir seçiniz" v-model="currentCity" @change="fillCounties"> 
              <option selected>Bir şehir seçiniz</option>
              <option class="text-dark" v-for="(city,index) in cityList" :key="index.latitude" :value="city">{{ city.name }}</option>
              
            </select>
          </div>
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">İlçe</label>
            <select  class="form-select form-select-sm" aria-label="İlçe seçiniz" v-model="currentCounty" > 
              <option selected>Bir ilçe seçiniz</option>
              <option class="text-dark" v-for="(county,index) in currentCity.counties" :key="index.latitude"  :value="county">{{ county.name }}</option>
              
            </select>
          </div>
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">Semt</label>
            <select  class="form-select form-select-sm" aria-label="Semt seçiniz" v-model="currentDistrict" > 
              <option selected>Bir semt seçiniz</option>
              <option class="text-dark" v-for="(district,index) in currentCounty.districts" :key="index.latitude"  :value="district">{{ district.name }}</option>
              
            </select>
          </div>
          <div class="mb-3 mx-2">
            <label for="city" class="form-label fw-semibold">Mahalle</label>
            <select  class="form-select form-select-sm" aria-label="Mahalle seçiniz" v-model="currentNeighborhoods" > 
              <option selected>Bir mahalle seçiniz</option>
              <option class="text-dark" v-for="(neighborhoods,index) in currentDistrict.neighborhoods" :key="index.latitude"  :value="neighborhoods">{{ neighborhoods.name }}</option>
              
            </select>
          </div>
          
          <div class="mb-3">
            <label for="detail" class="form-label">Adres detayı</label>
            <input type="text" class="form-control form-control-sm bg-secondary border-dark" v-model="newAdvert.adress.detail" id="detail" placeholder="Adres detayı">
          </div>

          <!--! GOOGLE MAP MODAL AREA -->

            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Haritaya ekle
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark">
                  <div class="modal-header">

                    <h3 class="login-card modal-title fs-5" id="exampleModalLabel" style="padding: 10px !important;">Haritada yer seç</h3>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <!--? MAP -->

                    <GoogleMap
                      ref="mapRef"
                      @click="getCoords"
                      
                      api-key="AIzaSyA5TfFcX1fsv6ERtP7oiULbK9K2belnZvE"
                      style="width: 100%; height: 500px"
                      :center="center"
                      :zoom="15"
                    >
                      <Marker :options="markerOptions" />
                    </GoogleMap>
                    <span class="card">Koordinatlar : {{ center.lat }} / {{ center.lng }}</span>
                    <!--? MAP -->
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-sm btn-success" @click="saveImages">Kaydet</button>
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Kapat</button>
                  </div>
                </div>
              </div>
            </div>

            <!--! MODAL AREA-->

        </div>

      </div>
    </div>
    <div class="row mb-3 d-flex justify-content-center">
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
    </div>
    <div class="delinator-line my-2"><div class="delinator"></div></div>
    
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
import { ref, watch } from "vue"
import store from "@/store";
import router from "@/router"
import cities from "@/assets/cities/data.json"
import { addAdvert } from "@/services/loaders.js"
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";

    const latitude=ref(39.589247)
    const longitude =ref(32.124502)
    const center = ref({ lat: latitude.value, lng: longitude.value });
    const mapRef = ref(null)

    const markerOptions = ref({ position: center.value })

    watch(latitude, (oldValue,newValue)=>{
      center.value.lat=newValue
      markerOptions.value.position= { lat : newValue ,lng : longitude.value}
      console.log("old",oldValue)
      console.log("new",newValue)
    })
    
    const getCoords = (e)=>{

      const gmap = mapRef.value.map;

      const center2 = gmap.getCenter();
      // console.log(center2())
      // console.log('Map: Center: (', center2.lat(), ',', center2.lng(), ')');

        console.log(center2.lat(),center2.lng())
        latitude.value=center2.lat()
        longitude.value=center2.lng()
        newAdvert.value.location.lat=center2.lat()
        newAdvert.value.location.lng=center2.lng()
    }

    // const centerChanged = ()=>{
      
    //   const gmap = mapRef.value.map;

    //   const center2 = gmap.getCenter();
    //   // console.log(center2)
    //   // console.log('Map: Center: (', center2.lat(), ',', center2.lng(), ')');
    //   // latitude.value=center2.lat()
    //   // longitude.value=center2.lng()
    // }


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

const currentUser = store.state.auth.user.username
const user = store.state.auth.user.username

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
  info : {
        room: null,
        m2: null,
        bath: null,
        floor: null,
        allFloor: null,
        buildAge: null,
        heating: null,
        front: null,
        exchange: null,
        credit: null
    },
    location: {
        lat : null,
        lng : null
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
