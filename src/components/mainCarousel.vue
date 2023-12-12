<template>
  <div class=" main-bg d-flex justify-content-center align-items-center">
    <!-- HOME PAGE MAİN İMAGE-->
  </div>
  <div class=" bg-dark p-5 grid justify-content-center">
    <div class=" mb-5">
      <h1 class="text-light text-center fw-bold">Nasıl bir gayrimenkul arıyorsunuz?</h1>
    </div>
    <div class="search-bar col-8 offset-2" >
        <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="İlan no ile ara">

      <select class="form-select form-select-sm" aria-label="Small select example">
        <option selected>Emlak Tipi</option>
        <option value="1">Konut</option>
        <option value="2">Arsa</option>
        <option value="3">İşyeri</option>
      </select>

      <select class="form-select form-select-sm" aria-label="Small select example">
        <option selected>Satılık & Kiralık</option>
        <option value="1">Satılık</option>
        <option value="2">Kiralık</option>
      </select>

        <button class="btn btn-warning btn-sm" ><i class="fa-solid fa-magnifying-glass me-2"></i>İlanlarda ara</button>
    </div>
  </div>
  
</template>

<script setup>

  
</script>