import axios from "axios";

const appAxios = axios.create({
    baseURL : `${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`,
    headers : {
        'Access-Control-Allow-Origin' : '*',
    }
});

export default appAxios;