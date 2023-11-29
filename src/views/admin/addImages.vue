<template>
  <adminHeader></adminHeader>
  <div class="container bg-dark text-light" >
    <div class="row p-2 justify-content-center">
      <h3 class="login-card" style="padding: 10px !important;">Mevcut resimler</h3>
      
      <div class="row grid  gap-2 image-container">
      <div class="p-0 m-0 image-items " v-for="(img, index) in imagesOn" :key="index" style="width: 230px; height: 220px; position: relative;">
        <img :src="img.url" alt="" style="width: 230px; height: 220px; ">
        <button class="btn btn-sm btn-danger remove-image" @click="removeImage(img)">X</button>
      </div>
    </div>

    <!----------ALERT------------>
    <div class="alert my-3" :class="alertStatus" v-if="showAlert">{{ alertMessage }}</div>
    <!----------ALERT------------>

    <div class="delinator mt-3">
      <div class="delinator-line"></div>
    </div>
    </div>
<!--! MODAL AREA -->

    <!-- Button trigger modal -->
<button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Fotoğraf ekle
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-dark">
      <div class="modal-header">

        <h3 class="login-card modal-title fs-5" id="exampleModalLabel" style="padding: 10px !important;">Yeni resim ekle</h3>

        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 p-2 rounded">
        <label for="images" class="form-label">İlan resimleri</label>
        <input class="form-control bg-secondary" ref="advert_images" type="file"  @change="uploadImages" id="images" multiple>
      </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-sm btn-success" @click="saveImages">Kaydet</button>
        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Kapat</button>
      </div>
    </div>
  </div>
</div>

<!--! MODAL AREA-->
    <!-- <div class="row p-2">
      <h3 class="login-card" style="padding: 10px !important;">Yeni resim ekle</h3>
      <div class="mb-3 p-2 rounded">
        <label for="images" class="form-label">İlan resimleri</label>
        <input class="form-control bg-secondary" ref="advert_images" type="file"  @change="uploadImages" id="images" multiple>
      </div>
      <div class="mb-3 p-2 rounded d-grid grid-direct-row">
        <button class="btn btn-sm btn-success" @click="saveImages">Kaydet</button>
        <button class="btn btn-sm btn-warning" @click="nextTo">Eklemeden devam et</button>
      </div>
    </div> -->
  </div>
  
</template>
<script setup>
import { ref,computed, watch } from "vue";
import appAxios from "@/utils/appAxios.js";
import store from "@/store"

const user = store.getters._getCurrentUser
const images = ref({})
let currentAdvert = store.getters._getCurrentAdvert
const _id = currentAdvert._id

const addImages= currentAdvert.advert_images || []
const imagesOn = ref([]);

let config={
  header : {
    'Authorization': 'Bearer ' + user?.access_token
  }
}


//! ALERT AREA ///////

const showAlert = ref(false);
const alertMessage = ref("");
const alertStatus = ref("alert-warning")

//! ALERT AREA ///////

const fetchData = ()=>{
  appAxios.get(`/advert/${_id}`,config).then((advert_response) => {
    const data = advert_response.data[0]
    
   data.advert_images.forEach(image => {
    imagesOn.value.push({
      name : image.name,
      url :`${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/${image.url}`})
   });

  }).catch((err) => {
    console.log(err)
  });
}

const removeImage=(img)=>{

  imagesOn.value = imagesOn.value.filter(image => image !== img)

  const deleteInfo = `/advert/delete_image/${_id}&${img.name}`

  appAxios.delete(deleteInfo,config)
  .then((delete_response)=>{

    showAlert.value= true;
    alertMessage.value = "Resim silinmiştir";
    alertStatus.value = "alert-success"

    setTimeout(() => {
      showAlert.value = false
    }, 2000);
    
  })
  .catch(err => console.log(err))
  
}

fetchData()

const uploadImages = (e)=>{
  images.value = e.target.files
  
}

const saveImages = async ()=>{
  const formdata = new FormData()

  const data = images.value

  for(let i=0;i<data.length;i++){

    let file = data[i]

    formdata.append("advert_images",file)

  }  

    //? ////POSTDATA//////////
  await appAxios.post(`/advert/image_uploads/${_id}`,formdata,{
  Headers : {
    "Content-Type" : "multipart/form-data",
    'Authorization': 'Bearer ' + user?.access_token
  }
  })
  .then((upload_res)=>{
    showAlert.value= true;
    alertMessage.value = upload_res.data;
    alertStatus.value = "alert-success"

    setTimeout(() => {
      showAlert.value = false
    }, 2000);
  })
  .catch(err => console.log(err))
  imagesOn.value= []
  fetchData()
}
</script>
