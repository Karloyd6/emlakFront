<template>
    <div class="offcanvas offcanvas-start " data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-header bg-secondary text-light opacity-100">
            <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"><i class="fa-solid fa-phone me-2"></i>İletişim</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body bg-dark text-light p-2 pt-3">
            <sidebarItem></sidebarItem>
        </div>
    </div>
</template>

<script setup>
import sidebarItem from './sidebarItem.vue';
   
</script>