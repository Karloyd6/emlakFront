<template>
  <nav class="navbar navbar-expand-lg bg-primary fixed-top">
  <div class="container-fluid ">

   <div class="d-flex align-items-center">
    <a class="navbar-brand me-3 text-light fw-bolder" href="#" style="margin: 0px; padding: 0px;">
      <img src="@/assets/images/ke-logo.png" alt="" style="width: auto; height: 75px; margin: 0px; padding: 0px;">
      KILINÇ Emlak
    </a>
    <button class="btn btn-dark btn-sm text-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
      <i class="fa-solid fa-phone me-2"></i> İletişim
          </button>
   </div>
    <button class="navbar-toggler text-primary bg-light me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon text-light"></span>
    </button>
    
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav fw-700">
        <li class="nav-item">
          <a class="nav-link active text-light" aria-current="page" href="#">Anasayfa</a>
        </li>
        <li class="nav-item">
          <!-- <a class="nav-link active" aria-current="page" href="#">İlanlar</a> -->
          <router-link class="nav-link text-light" :to="{name : 'ShowAdvert'}">İlanlar</router-link>
        </li>
        <!-- <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            İlanlar
          </a>

          <ul class="dropdown-menu mt-0 glass-bg">
            <li><a class="dropdown-item" href="#">Satılık</a></li>
            <li><a class="dropdown-item" href="#">Kiralık</a></li>
            <li><a class="dropdown-item" href="#">Arsa</a></li>
            <li><a class="dropdown-item" href="#">İş yeri</a></li>
          </ul>
        </li> -->
        <li class="nav-item">
          <a class="nav-link text-light" aria-disabled="true">Hakkımızda</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light" aria-disabled="true">Bize ulaşın</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div class="header-bg">

</div>
</template>
<script setup>
//  const x = document.getElementById("asd")
//  x.className = "bg-warning"
</script>