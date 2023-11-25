<template>
  <nav class="navbar navbar-expand-lg bg-secondary text-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/admin"
              >İlan listesi</RouterLink
            >
          </li>
          <li class="nav-item dropdown">
            
          </li>

          <li class="nav-item">
            <RouterLink
                  class="nav-link active"
                  aria-current="page"
                  to="/admin/addAdvert"
                  >İlan ekle</RouterLink
                >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <div class="col d-flex justify-content-end">
          <span class=" me-3 profile_info">
            <RouterLink class="router-link" to="/admin/editprofile">{{ currentUser }}</RouterLink>
          </span>
          
          
          <button
            class="btn btn-sm btn-dark mr-3"
            v-if="isAuthenticate"
            @click="toLogout"
          >
            LogOut
          </button>
          <button class="btn btn-sm btn-dark mr-3" v-else @click="toLogin">
            LogIn
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import router from "@/router";
import store from "@/store";
import { RouterLink } from "vue-router";

const isAuthenticate = computed(() => {
  return store.getters._isAuthenticate;
});

const toLogin = () => {
  router.push({ name: "LoginPage" });
};

const toLogout = () => {
  store.commit("logout");
  router.push({ name: "LoginPage" });
};

const currentUser = computed(() => store.getters._getCurrentUser?.name);
</script>
