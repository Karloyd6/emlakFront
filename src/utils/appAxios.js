import axios from "axios";
import store from "@/store"
import { computed } from "vue";
const user = computed(()=> store.getters._getCurrentUser)
axios.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`;
const appAxios = axios.create({
    baseURL : `${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`,
    headers : {
        'Access-Control-Allow-Origin' : '*',
        "Authorization" : `bearer ${user.access_token}`
    }
});

export default appAxios;