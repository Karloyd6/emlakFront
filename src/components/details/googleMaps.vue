<template>
  <div class="container mb-5">
    <div class="card">
      <div class="card-header bg-primary text-light">
        <h4>HARİTA</h4>
      </div>
      <div class="card-body">
        <GoogleMap
          api-key="AIzaSyA5TfFcX1fsv6ERtP7oiULbK9K2belnZvE"
          style="width: 100%; height: 500px"
          :center="center"
          :zoom="15"
        >
          <Marker :options="{ position: center }"/>
        </GoogleMap>
      </div>
    </div>
    
  </div>
    
</template>
<script setup>
    import { GoogleMap, Marker } from "vue3-google-map";
    import { ref } from "vue";
    import store from "@/store";

    const currentAdvert =store.getters["advert/getCurrentAdvert"]
    

    const latitude= parseFloat(currentAdvert.location.lat);
    const longitude = parseFloat(currentAdvert.location.lng);
    const center = ref({ lat: latitude, lng: longitude });
    // const mapRef = ref(null)
    
    // const getCoords = (e)=>{
    //     const split1 = mapRef.value.map.mapUrl.split("=")[1].split("&")[0]
    //     latitude.value = parseFloat(split1.split(",")[0]);
    //     longitude.value = parseFloat(split1.split(",")[1])
    //     console.log(latitude.value,longitude.value)
    // }

</script>