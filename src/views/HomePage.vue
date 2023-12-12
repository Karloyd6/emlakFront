<template>
    <header class="">
      <headerItem></headerItem>
    </header>
    <main class="">
      <sidebar></sidebar>
      <mainCarousel></mainCarousel>
      <div class="container">
        <showCase></showCase>
      </div>
      
      
      <footerItem></footerItem>
    </main>
  </template>
  <script setup>
  import mainCarousel from "@/components/mainCarousel.vue";
  import showCase from "@/components/showCase.vue"

  </script>