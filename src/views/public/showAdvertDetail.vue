tb<template>
    <headerItem class="mb-3"></headerItem>
    <div class="mt-4" style="width: 100%;">
        <div class="row no-gutters">

            <div class="col-lg-7 p-0 mt-0 " style="background-color: #212529;">
                <span class="detail-price">
                    {{ currentAdvert.price.toUpperCase() }}
                </span>
                <!--! CAROUSEL AREA-->
                <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item" :class="index == 0 ? 'active' : '' " v-for="(img,index) in imageList" :key="index" style="height: 35rem;width: 100%;">
                            <img :src="img" class="d-block w-100" alt="... " style="height:100%;">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>

                </div>
                <!--! CAROUSEL AREA-->

            </div>

            <div class="col-lg-5 pt-3 mt-3" style="background-color: #212529; padding: 16px 24px;">
                <div class="row d-flex justify-content-center mt-3" >
                    <a class="txt-gray text-center">Portfoy no : {{ currentAdvert.advertId }}</a>
                    <a class="txt-gray text-center">
                        <i class="fa-solid fa-location-dot me-2"></i>
                        {{ currentAdvert.adress.city }}/{{ currentAdvert.adress.county }}/{{ currentAdvert.adress.hood }}
                    </a>
                    <div class="d-flex justify-content-center mt-3">
                        <a class="btn btn-primary btn-sm btn-inline fw-bold">{{advertStatus}}</a>
                    </div>
                    
                </div>
                <div class="row d-flex justify-content-center mt-2">
                    <h1 class="text-center title my-4 text-light">{{ currentAdvert.title }}</h1>
                </div>
                <div class="d-flex align-self-center justify-content-center" >
                    <a class="btn btn-sm bg-price text-light fw-bold" style="padding: 2px 12px;">{{ currentAdvert.price.toUpperCase() }}</a>
                </div>
                <div class="py-4 mt-auto px-1  d-flex flex-wrap justify-content-around" style="width: 100%;">

                    <div class="item mb-2 p-1" >
                        <i class="flaticon-plan"></i>
                        <div class="align-items-center">
                            <span class="number">{{ currentAdvert.info.room}}</span>
                            <span class="sub mt-3">Oda sayısı</span>
                        </div>
                    </div>

                    <div class="item mb-2 p-1" >
                        <i class="flaticon-size"></i>
                        <div class="align-items-center">
                            <span class="number">{{ currentAdvert.info.m2 }} m<sup>2</sup></span>
                            <span class="sub mt-3">m<sup>2</sup></span>
                        </div>
                    </div>

                    <div class="item mb-2 p-1" >
                        <i class="flaticon-lift"></i>
                        <div class="align-items-center">
                            <span class="number">{{ currentAdvert.info.floor }}</span>
                            <span class="sub mt-3">Kat</span>
                        </div>
                    </div>

                    <div class="item mb-2 p-1" >
                        <i class="flaticon-heating"></i>
                        <div class="align-items-center">
                            <span class="number">{{currentAdvert.info.heating}}</span>
                            <span class="sub mt-3">Isıtma</span>
                        </div>
                    </div>

                    
                </div>

                <div class="d-flex mt-1 bg-primary p-3 m-0 rounded">
                    <div class="col-3 d-flex align-items-center me-3">
                        <img :src="author.profile_image" alt="" style="width: 120px;height: 120px;border-radius: 50%; border: 1px solid white;">
                    </div>

                    <div class="col-9 pl-3">
                        <h4 class="text-light">{{ author.name }}</h4>
                        <div class="delinator-line"><div class="delinator"></div></div>
                        <div class="d-flex flex-wrap gap-2 mt-2 ms-3">
                            <span class="btn btn-sm  text-light px-2 phone-info" v-for="(phone,index) in phoneNumbers" :key="index">
                                <i class="fa-solid fa-phone me-2"></i>{{ phone }}
                            </span> 
                        </div>
                        
                    </div>

                </div>
                
            </div>
        </div>

        <!--* ADVERT DETAİLS -->

        <div class="row bg-light d-flex justify-content-center align-items-center my-1 pb-2" style="width: 100%; height: 98px;">
            <div class="col-3" @click="showArea('details')">
                <div class="btn d-flex align-items-center" :class="showDetail ? 'active' : ''"><i class="flaticon-my-house me-2"></i><h5 class="text-center">İlan Detayları</h5></div>
            </div>
            <div class="col-3 " @click="showArea('map')">
                <div class="btn d-flex align-items-center" :class="showMap ? 'active' : ''"><i class="flaticon-my-house me-2"></i><h5 class="text-center">Harita</h5></div>
            </div>
        </div>

        <div class="row px-5 mb-4" style="width: 100%;" v-if="showDetail">
            <!--* DETAİL LİST -->
            <div class="col-lg-4 mt-5 p-4 rounded  bg-light" >
                <table class="table table-striped table-light bg-light p-3">
                    <tbody>
                        <tr class="p-3">
                            <th scope="row">İlan no</th>
                            <td>{{ currentAdvert.advertId}}</td>
                        </tr>
                        <tr class="p-3">
                            <th scope="row">Tarihi</th>
                            <td>{{ currentAdvert.createdAt.split("T")[0]}}</td>
                        </tr>
                        <tr class="p-3">
                            <th scope="row"><i class="fa-solid fa-bed me-2"></i>Oda sayısı</th>
                            <td>{{ currentAdvert.info.room }}</td>
                        </tr>
                        <tr class="p-3">
                            <th scope="row"><i class="fa-solid fa-expand me-2"></i>m<sup>2</sup></th>
                            <td>{{ currentAdvert.info.m2 }} m<sup>2</sup></td>
                        </tr>
                        <tr class="p-3">
                            <th scope="row"><i class="fa-solid fa-bath me-2"></i>Banyo sayısı</th>
                            <td>{{ currentAdvert.info.bath }}</td>
                        </tr>
                        <tr class="p-3">
                            <th scope="row"><i class="fa-solid fa-layer-group me-2"></i>Kat</th>
                            <td>{{ currentAdvert.info.floor }}</td>
                        </tr>
                        <tr class="p-3">
                            <th scope="row"><i class="fa-solid fa-arrows-up-down me-2"></i>Kat sayısı</th>
                            <td>{{ currentAdvert.info.allFloor }}</td>
                        </tr>
                        <tr class="p-3">
                            <th scope="row"><i class="fa-regular fa-clock me-2"></i>Bina yaşı</th>
                            <td>{{ currentAdvert.info.buildAge }}</td>
                        </tr>
                        <tr class="p-3">
                            <th scope="row"><i class="fa-brands fa-gripfire me-2"></i>Isıtma</th>
                            <td>{{ currentAdvert.info.heating }}</td>
                        </tr>
                        <tr class="p-3">
                            <th scope="row"><i class="fa-regular fa-compass me-2"></i>Cephe</th>
                            <td>{{ currentAdvert.info.front }}</td>
                        </tr>
                        <tr class="p-3">
                            <th scope="row"><i class="fa-solid fa-rotate me-2"></i>Takas</th>
                            <td>{{ currentAdvert.info.exchange.toUpperCase() }}</td>
                        </tr>
                        <tr class="p-3">
                            <th scope="row"><i class="fa-solid fa-building-columns me-2"></i>Kredi</th>
                            <td>{{ currentAdvert.info.credit.toUpperCase() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--* DETAİL LİST -->

            

            <!--! DESCRİPTİON -->
            <div class="col-lg-8">
                <div class="card mt-5 p-0">
                    <div class="card-header align-items-center text-light" style="background-color: #05132a;">
                        <h5 class="ps-3 mt-2">İLAN AÇIKLAMASI</h5>
                    </div>
                    <div class="card-body">
                        <p>{{ currentAdvert.description }}</p>
                    </div>
                </div>
            </div>
            <!--! DESCRİPTİON -->
        </div>

        <!--? GOOGLE MAPS-->
        <div class="row px-5 mb-4" style="width: 100%;" v-if="showMap"></div>
            <googleMaps></googleMaps>
        </div>
            <!--? GOOGLE MAPS-->
        <!--* ADVERT DETAİLS -->
    
</template>
<script setup>
    import { ref, computed } from "vue";
    import appAxios from "@/utils/appAxios.js"
    import store from "@/store";
    import googleMaps from "@/components/details/googleMaps.vue"

    const showDetail = ref(true);
    const showMap = ref(false)

    const currentAdvert = store.getters["advert/getCurrentAdvert"]
    const imageList = ref([]);
    const author = ref({})

    const advertStatus = computed(()=>{
        if(currentAdvert.rentOrBuy=="rent"){
            if(currentAdvert.type=="konut"){
             return "Kiralık Konut"
            }else if(currentAdvert.type == "isyeri"){
                return "Kiralık İşyeri"
            }
        }else if(currentAdvert.rentOrBuy=="sale"){
            if(currentAdvert.type=="konut"){
             return "Satılık Konut"
            }else if(currentAdvert.type == "isyeri"){
                return "Satılık İşyeri"
            }else if(currentAdvert.type=="arsa"){
                return "Satılık Arsa"
            }
        }
    })

    const phoneNumbers = ref([])

    const advertImages = ()=>{
        const bitter = currentAdvert.advert_images

        bitter.forEach(image => {
            const addimg = `${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/${image.url}`
            imageList.value.push(addimg)
        });
    }
    advertImages()

    const getAuthorInfo = ()=>{
        const user = currentAdvert.user
        appAxios.get(`/user/author/${user}`).then((result) => {
            const profileImage = `${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/${result.data.profile_image}`
            result.data.profile_image = profileImage
            phoneNumbers.value = result.data.phoneNumber
            author.value=result.data
        }).catch((err) => {
            console.log(err)
        });
    }
   
    getAuthorInfo()

    const showArea = (which)=>{
        if(which=="details"){
            showDetail.value=true;
            showMap.value=false;
        }else if(which=="map"){
            showDetail.value=false;
            showMap.value=true;
        }
    }
</script>