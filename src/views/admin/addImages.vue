<template>
  <adminHeader></adminHeader>
  <div class="container bg-dark text-light" >
    <div class="row p-2">
      <h3 class="login-card" style="padding: 10px !important;">Mevcut resimler</h3>
      <div class="row grid justify-content-start gap-2 image-container">
      <div class="p-0 m-0 image-items " v-for="(img, index) in imagesOn" :key="index" style="width: 220px; height: 220px; position: relative;">
        <img :src="img.url" alt="" style="width: inherit; ">
        <button class="btn btn-sm btn-danger remove-image" @click="removeImage(img)">X</button>
      </div>
    </div>
    <div class="delinator">
      <div class="delinator-line"></div>
    </div>
    </div>
    <div class="row p-2">
      <h3 class="login-card" style="padding: 10px !important;">Yeni resim ekle</h3>
      <div class="mb-3 p-2 rounded">
        <label for="images" class="form-label">İlan resimleri</label>
        <input class="form-control bg-secondary" ref="advert_images" type="file"  @change="uploadImages" id="images" multiple>
      </div>
      <div class="mb-3 p-2 rounded d-grid grid-direct-row">
        <button class="btn btn-sm btn-success" @click="saveImages">Kaydet</button>
        <button class="btn btn-sm btn-warning" @click="nextTo">Eklemeden devam et</button>
      </div>
    </div>
  </div>
  
</template>
<script setup>
import { ref,computed, watch } from "vue";
import appAxios from "@/utils/appAxios.js";
import store from "@/store"
import router from "../../router";
import socket from "@/utils/socket.js"

const images = ref({})
let currentAdvert = store.getters._getCurrentAdvert
const _id = currentAdvert._id

const addImages= currentAdvert.advert_images || []
const imagesOn = ref([]);

console.log('addImages :>> ', addImages);

const fetchData = ()=>{
  appAxios.get(`/advert/${_id}`).then((advert_response) => {
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

  appAxios.delete(deleteInfo)
  .then((delete_response)=>{
    console.log(delete_response)
  })
  .catch(err => console.log(err))
  
}

fetchData()

const uploadImages = (e)=>{
  images.value = e.target.files
  
}

const saveImages = ()=>{
  const formdata = new FormData()

  const data = images.value

  for(let i=0;i<data.length;i++){

    let file = data[i]

    formdata.append("advert_images",file)
  }

  console.log("forms",formdata)

  appAxios.post(`/advert/image_uploads/${_id}`,formdata,{
    Headers : {
      "Content-Type" : "multipart/form-data"
    }
  })
  .then((upload_res)=>{
    console.log(upload_res)
    

    fetchData()

  })
  .catch(err => console.log(err))

}

const nextTo= ()=>{
  router.push({name : "AdvertList"})
}

socket.on("mal",(data)=>{
  console.log('data :>> ', data);
})


</script>
