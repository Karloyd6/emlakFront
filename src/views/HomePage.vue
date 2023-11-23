<template>
    <header class="">
      <headerItem></headerItem>
    </header>
    <main class="">
      <sidebar></sidebar>
      <div class="row mt-3">
        <mainCarousel></mainCarousel>
        <forSaleList></forSaleList>
      <hr>
      <forRentList></forRentList>
      </div>
      
      <hr>
      <footerItem></footerItem>
    </main>
  </template>
  <script setup>
  import mainCarousel from "@/components/mainCarousel.vue";
  import forSaleList from "@/components/forSaleList.vue"
  import forRentList from "@/components/forRentList.vue"

  

  </script>