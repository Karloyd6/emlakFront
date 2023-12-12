<template>
    <div class="row my-4" style="width: 100%;">
        <div class="row glass-bg p-2">
            <div class="delinator"><div class="delinator-line"></div> <div class="col"><h2>VİTRİN</h2></div> <div class="delinator-line"></div> </div>
        </div>
        <showAdvertTheme v-for="(adds,index) in showcaseList" :key="index" :adds="adds"></showAdvertTheme>
    </div>
</template>
<script setup>
import { ref } from "vue"
import store from "@/store"
import showAdvertTheme from "@/views/public/showAdvertTheme.vue";
const showcaseList = ref([])

const getShowcase = async ()=>{
    await store.dispatch("advert/setShowcaseList")
    showcaseList.value = store.getters["advert/getShowcaseList"]
}
getShowcase()
</script>