<template>
  <adminHeader></adminHeader>
  <div
    class="d-flex justify-content-center align-items-center bg-dark card-bg"
    style="height: 100vh"
  >
   
    <div class="row login-card" style="width: 40rem">
      <h3 class="mb-3 bg-dark rounded">Kullanıcı bilgi güncelleme</h3>
      <div class="input-group mb-3">
        <span
          class="input-group-text bg-dark text-light border-dark"
          id="username"
          >Kullanıcı adı</span
        >
        <input
          type="text"
          v-model="userInfo.username"
          class="form-control"
          placeholder="Kullanıcı adı"
          aria-label="Username"
          aria-describedby="username"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text bg-dark text-light border-dark" id="name"
          >İsim -soyisim</span
        >
        <input
          type="text"
          v-model="userInfo.name"
          class="form-control"
          placeholder="ad soyad"
          aria-label="name"
          aria-describedby="name"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text bg-dark text-light border-dark" id="email"
          >E-mail</span
        >
        <input
          type="text"
          v-model="userInfo.email"
          class="form-control"
          placeholder="user@example.com"
          aria-label="email"
          aria-describedby="email"
        />
      </div>
      <!--! PHONE NUMBER AREA -->
      <div class="input-group mb-3" v-for="(phone, index) in phoneNumbers" :key="index">
        <span class="input-group-text bg-dark text-light border-dark" id="phone">Telefon</span>
        <input type="text" v-model="phoneNumbers[index]" class="form-control" placeholder="541 555 55 55" aria-label="email" aria-describedby="phone"/>
        <button class="btn btn-sm btn-danger" @click="deleteNumber(index)">
          sil
        </button>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text bg-dark text-light border-dark" id="phone"
          >Telefon</span
        >
        <input
          type="text"
          v-model="newNumber"
          class="form-control"
          placeholder="541 555 55 55"
          aria-label="phone"
          aria-describedby="phone"
        />
        <button class="btn btn-sm btn-primary" @click="addNumber">ekle</button>
        <!-- <button class="btn btn-sm btn-danger" @click="">sil</button> -->
      </div>



      <!--! PHONE NUMBER AREA -->

      <!--? PASSWORD MODAL AREA -->

      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Şifre değiştir
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              <!--! FORM AREA -->

              <div class="input-group mb-3">
                <span
                  class="input-group-text bg-dark text-light border-dark"
                  id="oldPass"
                  >Yeni şifre</span
                >
                <input
                  type="text"
                  v-model="passInfo.newPass"
                  class="form-control"
                  placeholder="Yeni şifrenizi giriniz"
                  aria-label="oldPass"
                  aria-describedby="oldPass"
                />
              </div>

              <div class="input-group mb-3">
                <span
                  class="input-group-text bg-dark text-light border-dark"
                  id="oldPass"
                  >Şifre tekrar</span
                >
                <input
                  type="text"
                  v-model="passInfo.newPassAgain"
                  class="form-control"
                  placeholder="Yeni şifre tekrar"
                  aria-label="oldPass"
                  aria-describedby="oldPass"
                />
              </div>

              <div class="alert" :class="alertStatus" v-if="showError">
                {{ errorMessage }}
              </div>

              <div class="input-group mb-3 d-grid">
                <button class="btn btn-sm btn-primary" @click="changePassword">
                  Şifreyi değiştir
                </button>
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
          <img
            :src="showProfileImage"
            style="border-radius: 50%; width: 120px; height: 120px"
            alt=""
          />
        </div>
        <div class="col-9">
          <div class="mb-3 p-2 rounded d-grid">
            <label for="images" class="form-label text-light"
              >Profil resmi</label
            >
            <input
              class="form-control bg-secondary"
              ref="profile_image"
              type="file"
              @change="uploadImages"
              id="images"
            />
            <button
              class="btn btn-sm btn-secondary mt-1"
              @click="saveProfileImage"
            >
              profil resmini kaydet
            </button>
          </div>
        </div>
      </div>
      <!--! PROFİLE İMAGE AREA -->

      <!--* ALERT AREA -->

      <div class="alert mt-2" :class="alertStatus" v-if="showAlert">
        {{ alertMessage }}
      </div>

      <!--* ALERT AREA -->

      <div class="row d-grid mt-3">
        <button class="btn btn-sm btn-success" @click="saveUserForm">
          Kaydet
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import store from "@/store";
import appAxios from "@/utils/appAxios.js"
import axios from "axios"
import router from "@/router"

const user = computed(()=> store.getters._getCurrentUser);
const showError = ref(false);
const errorMessage = ref("");
const alertStatus = ref("");
const profileImage = ref({});

const showAlert = ref(false);
const alertMessage = ref("")


const userInfo = ref({})

userInfo.value = user

//* Phone number actions ////////
const newNumber = ref(null)
const phoneNumbers = ref([])



phoneNumbers.value = userInfo.value.phoneNumber
const phoneNumbersCount = computed(()=>{
  return phoneNumbers.value.length +1
})

const addNumber = ()=> {
  phoneNumbers.value.push(newNumber.value)
}

const deleteNumber = (deleted)=>{
    const value = phoneNumbers.value.filter((number,index) => index !== deleted )
    phoneNumbers.value = value
}



//* Phone number actions ////////

const passInfo = ref({
    newPass :null,
    newPassAgain : null
})


const showProfileImage = `${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/${userInfo.value.profile_image}` || "http://placehol.co/100x100"


let config = {
    headers: {
      'Authorization': 'Bearer ' + user?.access_token
    }}


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
            // console.log(password_res)
            errorMessage.value = password_res.data;
            alertStatus.value = "alert-success";
            showError.value=true;
            setTimeout(() => {
                showError.value = false
            }, 2000);
        }).catch((err) => {
            // console.log(err)
            errorMessage.value = err;
            alertStatus.value = "alert-danger";
            showError.value=true;
            setTimeout(() => {
                showError.value = false
            }, 2000);
        });

   
    }
}

const uploadImages = (e)=> {
    profileImage.value = e.target.files
}

const saveProfileImage =  ()=>{
  const _id =  user._id
  const formdata = new FormData();
  const data =profileImage.value;
  formdata.set("profile_image",data[0])


  appAxios.post(`/user/userimage/${_id}`,formdata,{
  Headers : {
    // 'Authorization': 'Bearer ' + user?.access_token,
    "Content-Type" : "multipart/form-data",
  }
  }).then((upload_response)=>{
    userInfo.value.profile_image = upload_response.data
    showAlert.value=true;
    alertStatus.value = "alert-success"
    alertMessage.value = "resim başarılı bir şekilde güncellendi"

    setTimeout(() => {
    router.go(0)
  }, 2000);
  }).catch((err) => {
    showError.value = true;
    alertMessage.value = err

    setTimeout(() => {
      showError.value = false
    }, 2000);
  })


}

const saveUserForm = async ()=> {

  const savedUser = {
    name :userInfo.value.name,
    username : userInfo.value.username,
    email : userInfo.value.email,
    phoneNumber : phoneNumbers.value
  }

  const response = await axios.post(`${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/user/update/${userInfo.value._id}`,
  savedUser, {
    Headers : {
      "Content-Type" : "application/json",
      "Authorization" : `bearer ${user.access_token}`
    }
  })

  if(response.statusText == "Created"){
    alertMessage.value= "Kullanıcı bilgileri başarılı bir şekilde güncellendi"
    showAlert.value = true;
    alertStatus.value = "alert-success"

    setTimeout(() => {
      showAlert.value = false
    }, 3000);
  }else{
    alertMessage.value= "Kullanıcı bilgileri güncellenirken bir sorun oluştu"
    showAlert.value = true;
    alertStatus.value = "alert-danger"

    setTimeout(() => {
      showAlert.value = false
    }, 3000);
  }

  const commit = {
    ...userInfo.value,
    ...savedUser
  }

  store.commit("currentUser",commit)
}
</script>
