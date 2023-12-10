<template>
  <div class="container">
    <div class="card">
      <div class="card-header bg-primary text-light">
        <h4>HARİTA</h4>
      </div>
      <div class="card-body">
        <GoogleMap
          ref="mapRef"
          @click="getCoords"
          @center_changed="center={lat : latitude,lng: longitude}"
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

    const latitude=ref(39.589247)
    const longitude =ref(32.124502)
    const center = ref({ lat: latitude.value, lng: longitude.value });
    const mapRef = ref(null)
    
    const getCoords = (e)=>{
        const split1 = mapRef.value.map.mapUrl.split("=")[1].split("&")[0]
        latitude.value = parseFloat(split1.split(",")[0]);
        longitude.value = parseFloat(split1.split(",")[1])
        console.log(latitude.value,longitude.value)

        // center.value.lat=latitude
        // center.value.lng=longitude        
        // console.log(e)
        // center.value=e.latlng
        
    }

</script>