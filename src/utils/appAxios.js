import axios from "axios";

const access_token = JSON.parse(localStorage.getItem("user"))
if(access_token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
}

const appAxios = axios.create({
    baseURL : `${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`,
    headers : {
        'Access-Control-Allow-Origin' : '*',
    }
});



export default appAxios;