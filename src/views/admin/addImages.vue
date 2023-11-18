<template>
  <adminHeader></adminHeader>
  <div class="container bg-dark text-light" >
    <div class="row p-2">
      <h3 class="login-card" style="padding: 10px !important;">Mevcut resimler</h3>
      <div class="row grid gap-2">
      <div class="p-0 m-0" v-for="img in imagesOn" :key="img" style="width: 250px; height: 250px; position: relative;">
        <img :src="img" alt="" style="width: inherit; position: ;">
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

const images = ref({})
let currentAdvert = store.getters._getCurrentAdvert
const _id = currentAdvert._id

const addImages= currentAdvert.advert_images
const imagesOn = ref([]);

addImages.forEach(image => {
  imagesOn.value.push(`${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/${image.url}`)
});
console.log('images :>> ', imagesOn.value);

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
    alert("Resim yükleme işlemi başarılıdır.İlan listesine yönlendiriliyorsunuz...")

    setTimeout(() => {
      router.push({name : "AdvertList"})
    }, 2000);
  })
  .catch(err => console.log(err))

}

const nextTo= ()=>{
  router.push({name : "AdvertList"})
}

const removeImage = (img)=>{
  const cutted = img.substring(22)
  const value = addImages.filter(image => image.url == cutted)
  const deletedItem = value[0].name
  console.log(deletedItem)
  appAxios.delete(`/advert/delete_image/${_id}&${deletedItem}`).then((deleteImage_res)=>{
    console.log(deleteImage_res)
    currentAdvert = deleteImage_res.data
    store.commit("currentAdvert",deleteImage_res.data)
    imagesOn.value = imagesOn.value.filter(image => image._id !== currentAdvert._id)
    console.log(currentAdvert._id)
  }).catch(err => console.log(err))
}


</script>
