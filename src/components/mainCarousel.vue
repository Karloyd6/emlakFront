<template>
  <div class=" main-bg d-flex justify-content-center align-items-center">
    
    <div class="search-bar ">
        <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="İlanlarda ara">

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