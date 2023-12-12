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
        <div class="mb-3">
          <label for="showcase" class="form-label">Vitrin ilanı</label>
          <select id="showcase"  v-model="newAdvert.showcase" class="form-select form-select-sm" aria-label="Şehir seçiniz">
              <option selected>Vitrine ekle</option>
              <option value="true">evet</option>
              <option value="false">hayır</option>
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
                    <!--? MAP -->
                  </div>
                  <div class="modal-footer">
                    <!-- <button class="btn btn-sm btn-success" @click="saveImages">Kaydet</button> -->
                    <button type="button" class="btn btn-sm btn-success" data-bs-dismiss="modal">Konum seç</button>
                  </div>
                </div>
              </div>
            </div>

            <!--! MODAL AREA-->

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
import { ref, reactive, computed } from "vue"
import store from "@/store"
import router from "@/router"
import cities from "@/assets/cities/data.json"
import appAxios from "@/utils/appAxios";
import { GoogleMap, Marker } from "vue3-google-map";

const latitude= ref(39.589247)
    const longitude =ref(32.124502)
    const center = reactive({ lat: latitude.value, lng: longitude.value });
    const mapRef = ref(null)
    // const markerOptions = reactive({ position: {lat : latitude.value, lng: longitude.value} })
    const markerOptions = computed(()=>{
      return { position : { lat : latitude.value, lng : longitude.value }}
    })

    const getCoords = (e)=>{
      const gmap = mapRef.value.map;
      const center2 = gmap.getCenter();
        console.log(center2.lat(),center2.lng())
        latitude.value = center2.lat()
        longitude.value = center2.lng()
        newAdvert.value.location.lat=center2.lat()
        newAdvert.value.location.lng=center2.lng()
    }


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
    location: {
        lat : currentAdvert.location.lat,
        lng : currentAdvert.location.lng
    },
  advert_images : currentAdvert.advert_images,
  type : currentAdvert.type,
  user : currentAdvert.user,
  rentOrBuy : currentAdvert.rentOrBuy,
  showcase : currentAdvert.showcase
})
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