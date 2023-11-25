<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary ">
  <div class="container-fluid ">

   <div class="d-flex align-items-center">
    <a class="navbar-brand" href="#">KILINÇ Emlak</a>
    <button class="btn btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <i class="fa-solid fa-magnifying-glass me-2"></i> İlan ara
          </button>
   </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav ">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Anasayfa</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">İlanlar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Hakkımızda</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " aria-disabled="true">Bize ulaşın</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
<script setup>
//  const x = document.getElementById("asd")
//  x.className = "bg-warning"
</script>