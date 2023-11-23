<template>
<div class="accordion m-0 opacity-75" id="accordionPanelsStayOpenExample">

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#home" aria-expanded="true" aria-controls="home">
        <h4><i class="fa-solid fa-house-chimney me-2" ></i>Konut</h4>
      </button>
    </h2>
    <div id="home" class="accordion-collapse collapse ">
        <div class="accordion-body list-group list-group-flush">
            <a  class="list-group-item list-group-item-action" style="user-select: none;" @click="showAdvert('saleHome')">Satılık</a>
            <a  class="list-group-item list-group-item-action" style="user-select: none;" @click="showAdvert('rentHome')">Kiralık</a>
        </div>  
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#land" aria-expanded="true" aria-controls="land">
        <h4><i class="fa-solid fa-map-location-dot me-2"></i>Arsa</h4>
      </button>
    </h2>
    <div id="land" class="accordion-collapse collapse ">
        <div class="accordion-body list-group list-group-flush">
            <a  class="list-group-item list-group-item-action" style="user-select: none;" @click="showAdvert('saleLand')">Satılık</a>
            <a  class="list-group-item list-group-item-action" style="user-select: none;" @click="showAdvert('rentLand')">Kiralık</a>
        </div>  
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#business" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        <h4><i class="fa-solid fa-store me-2"></i>İş yeri</h4>
      </button>
    </h2>
    <div id="business" class="accordion-collapse collapse ">
        <div class="accordion-body list-group list-group-flush">
            <a  class="list-group-item list-group-item-action" style="user-select: none;" @click="showAdvert('saleStore')">Satılık</a>
            <a  class="list-group-item list-group-item-action" style="user-select: none;" @click="showAdvert('rentStore')">Kiralık</a>
        </div>  
    </div>
  </div>
  
</div>
<div class="delinator-line my-3 bg-light"><div class="delinator"></div></div>

</template>

<script setup>

const showAdvert = (whatFor) => {
    
}

</script>