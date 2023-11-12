<template>
  <adminHeader></adminHeader>
  <div class="container bg-dark text-light" >
    <div class="row p-2">
      <div class="mb-3 p-2 rounded">
        <label for="images" class="form-label">İlan resimleri</label>
        <input class="form-control bg-secondary" ref="advert_images" type="file"  @change="uploadImages" id="images" multiple>
      </div>
      <div class="mb-3 p-2 rounded d-grid">
        <button class="btn btn-sm btn-success" @click="saveImages">Kaydet</button>
      </div>
    </div>
  </div>
  
</template>
<script setup>
import { ref,computed } from "vue";
import appAxios from "@/utils/appAxios.js";
import store from "@/store"

const images = ref({})
const currentAdvert = computed(()=> store.getters._getCurrentAdvert)
const _id = currentAdvert.value._id

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
  })
  .catch(err => console.log(err))

}

</script>
