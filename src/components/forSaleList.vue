<template>
  <div class="container mt-5">

    <div class="row">
        <div class="col ">
            <!--! TİTLE AREA -->
            <h2 class="text-center f-title-label">YENİ İLANLAR</h2>
            <h1 class="text-center s-title-label">SATILIK</h1>
        </div>
    </div>

    <div class="row">
        <div class="col">
             <!--! FOR SALE LİST AREA-->
    <div class="row row-cols-auto">
        <div class="col d-flex"></div>
      <!--* EXAMPLE ADVERT -->
                <!-- <item :advert="adds" v-for="(adds,index) in placehold" :key="index"></item> -->
      <!--* EXAMPLE ADVERT -->
    </div>
    <!--! END OF FOR SALE LİST AREA-->
        </div>
    </div>
    
   
    <div class="row">
        <div class="col d-flex justify-content-center mt-5">
            <button class="btn btn-danger">Daha fazla ilan göster</button>
        </div>
    </div>
  </div>
</template>
<script setup>
    import item from "@/components/global/forSaleItem.vue";
    import appAxios from "@/utils/appAxios.js"

    const fetchData = ()=>{
        appAxios.get("/advert").then((db_response)=>{
            // console.log(db_response.data)
        })
    }
    
    fetchData()

    
</script>
