<template>
    <div class="d-flex align-items-center justify-content-center bg-dark card-bg" style="height: 100vh;width: 100%;">
        <div class="container d-flex align-items-center justify-content-center ">
            <div class="login-card">
            
            <div class="delinator">
                <div class="delinator-line"></div><h3 class="text-light">LOGIN</h3><div class="delinator-line"></div>
            </div>
            <div class="input-group  my-3">
                <span class="input-group-text bg-dark text-light border-secondary" id="email">@</span>
                <input v-model="loginInfo.email" type="email" class="form-control bg-dark text-light border-secondary" placeholder="" aria-label="Username" aria-describedby="email">
            </div>
            <div class="input-group  mb-3">
                <span class="input-group-text bg-dark text-light border-secondary" id="password">#</span>
                <input v-model="loginInfo.password" :type="passStatus ? 'text' : 'password' " class="form-control bg-dark text-light border-secondary" placeholder="Password" aria-label="Username" aria-describedby="password">
                <span class="input-group-text bg-dark text-light border-secondary" id="password" @click="showPass">
                    <i class="fa-solid fa-eye" v-if="passStatus"></i>
                    <i class="fa-solid fa-eye-slash" v-else></i>
                </span>
            </div>
            <div class="input-group d-grid mb-3">
                <button class="btn btn-sm btn-primary" @click="onLogin">login</button>
            </div>
            <div class="delinator"><div class="delinator-line"></div></div>

            <div class="alert alert-warning" v-if="showError">
                {{errorMessage}}
            </div>
            <div class="row mt-3">
                <div class="col">
                    <a href="" >Şifremi unuttum</a>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import appAxios from "@/utils/appAxios.js";
import router from "@/router"
import store from "@/store"


const passStatus = ref(false)

const loginInfo = ref({
    email : null,
    password : null
})

const errorMessage = ref("")

const showError = ref(false)

const onLogin = ()=> {
    if(loginInfo.value.email && loginInfo.value.password){
    appAxios.post(`${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/user/login`,loginInfo.value).then((login_response)=>{
        if(login_response.data){

            store.dispatch('currentUser',login_response.data)

            setTimeout(() => {
                router.push({name : "AdvertList"})
            }, 1000);
            

        }else{
            console.log(login_response)
        }
        
    })
    .catch((err) => {
        errorMessage.value= err.response.data
        showError.value = true

        setTimeout(() => {
            showError.value= false
        }, 3000);
    })
    }else{
        errorMessage.value = {"hata" : "Lütfen bütün alanları doldurunuz"}
        showError.value= true;
        setTimeout(() => {
            showError.value= false
        }, 3000);
    }
}

const showPass = ()=>{
    passStatus.value = !passStatus.value
}

</script>