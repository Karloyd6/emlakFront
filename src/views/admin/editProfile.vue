<template>
  <adminHeader></adminHeader>
  <div
    class="d-flex justify-content-center align-items-center bg-dark card-bg"
    style="height: 100vh"
  >
    <div class="row login-card" style="width: 40rem; ">
      <div class="input-group mb-3">
        <span class="input-group-text bg-dark text-light border-dark" id="username">Kullanıcı adı</span>
        <input type="text" v-model="userInfo.username" class="form-control" placeholder="Kullanıcı adı" aria-label="Username" aria-describedby="username"/>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text bg-dark text-light border-dark" id="name">İsim -soyisim</span>
        <input type="text"  v-model="userInfo.name" class="form-control" placeholder="ad soyad" aria-label="name" aria-describedby="name"/>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text bg-dark text-light border-dark" id="email">E-mail</span>
        <input type="text"  v-model="userInfo.email" class="form-control" placeholder="user@example.com" aria-label="email" aria-describedby="email"/>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text bg-dark text-light border-dark" id="phone">Telefon</span>
        <input type="text"  v-model="userInfo.phoneNumber" class="form-control" placeholder="541 555 55 55" aria-label="email" aria-describedby="phone"/>
        <button class="btn btn-sm btn-danger">sil</button>
      </div>
      <!--! PHONE NUMBER AREA -->
      <!-- <div class="input-group mb-3">
        <span class="input-group-text bg-dark text-light border-dark" id="phone">Telefon</span>
        <input type="text" class="form-control" placeholder="541 555 55 55" aria-label="email" aria-describedby="phone"/>
        <button class="btn btn-sm btn-danger">sil</button>
      </div>
      <div class="input-group mb-3">
        <button class="btn btn-sm btn-primary" >+ Telefon ekle</button>
      </div> -->
      

      <!--! PHONE NUMBER AREA -->

      <!--? PASSWORD MODAL AREA -->
      
      <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Şifre değiştir
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <!--! FORM AREA -->

        <div class="input-group mb-3">
            <span class="input-group-text bg-dark text-light border-dark" id="oldPass">Yeni şifre</span>
            <input type="text" v-model="passInfo.newPass" class="form-control" placeholder="Yeni şifrenizi giriniz" aria-label="oldPass" aria-describedby="oldPass"/>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text bg-dark text-light border-dark" id="oldPass">Şifre tekrar</span>
            <input type="text" v-model="passInfo.newPassAgain" class="form-control" placeholder="Yeni şifre tekrar" aria-label="oldPass" aria-describedby="oldPass"/>
        </div>

        <div class="alert" :class="alertStatus" v-if="showError">
            {{ errorMessage }}
        </div>

        <div class="input-group mb-3 d-grid">
            <button class="btn btn-sm btn-primary" @click="changePassword">Şifreyi değiştir</button>
        </div>

        <!--! FORM AREA -->
      </div>
    </div>
  </div>
</div>

      <!--? PASSWORD MODAL AREA -->
      <!--! PROFİLE İMAGE AREA -->
      <div class="d-flex mt-3">
        <div class="col-3 d-flex align-items-center">
            <img src="http://placehold.co/100x100" style="border-radius: 50%;" alt="">
        </div>
        <div class="col-9">
            <div class="mb-3 p-2 rounded d-grid">
                <label for="images" class="form-label text-light">Profil resmi</label>
                <input class="form-control bg-secondary" ref="advert_images" type="file"  @change="uploadImages" id="images">
                <button class="btn btn-sm btn-secondary mt-1">profil resmini kaydet</button>
            </div>
        </div>
      </div>
      <!--! PROFİLE İMAGE AREA -->
      <div class="row d-grid mt-3">
        <button class="btn btn-sm btn-success" @click="saveImages">Kaydet</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import store from "@/store";
// import appAxios from "@/utils/appaAxios.js"
import axios from "axios"


const user = store.getters._getCurrentUser;
const showError = ref(false);
const errorMessage = ref("");
const alertStatus = ref("");
const profileImage = ref({});

const userInfo = ref({
    name : user.name,
    username : user.username,
    email : user.email,
    phoneNumber : user.phoneNumber,
    profile_image : user?.profile_image
})

const passInfo = ref({
    newPass :null,
    newPassAgain : null
})

console.log('userInfo :>> ', userInfo.value);

const changePassword = ()=>{
    if(passInfo.value.newPass !== passInfo.value.newPassAgain){
        errorMessage.value= "Şifreler birbiri ile aynı olmalıdır"
        alertStatus.value="alert-warning"
        showError.value=true;
        setTimeout(() => {
            showError.value = false
        }, 2000);
    }else{
        
        axios.post(`${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/user/update/chgpass/${user._id}`,{password : passInfo.value.newPass}).then((password_res) => {
            console.log(password_res)
        }).catch((err) => {
            console.log(err)
        });

        errorMessage.value = "Şifre başarılı bir şekilde değiştirildi";
        alertStatus.value = "alert-success";
        showError.value=true;
        setTimeout(() => {
            showError.value = false
        }, 2000);
    }
}

const uploadImages = (e)=> {
    profileImage.value = e.target.files
    console.log('profileImage.value :>> ', profileImage.value);
}


</script>
