import axios from "axios";
<<<<<<< HEAD
import store from "@/store"
import { computed } from "vue";
const user = computed(()=>store.getters._getCurrentUser)
axios.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`;
=======

>>>>>>> parent of afccb34 (header sidebar vs yapıldı loginde vuex hatası)
const appAxios = axios.create({
    baseURL : `${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`,
    headers : {
        'Access-Control-Allow-Origin' : '*',
    }
});

export default appAxios;