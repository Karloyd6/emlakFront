<template>
    <header class="">
      <headerItem></headerItem>
    </header>
    <main class="container">
      <mainCarousel></mainCarousel>
      <forSaleList></forSaleList>
      <hr>
      <forRentList></forRentList>
      <hr>
      <footerItem></footerItem>
    </main>
  </template>
  <script setup>
  import mainCarousel from "@/components/mainCarousel.vue";
  import forSaleList from "@/components/forSaleList.vue"
  import forRentList from "@/components/forRentList.vue"

  </script>