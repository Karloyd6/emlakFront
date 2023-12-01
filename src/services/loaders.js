import appAxios from "../utils/appAxios";

export const addAdvert = (advertData) => {
    return appAxios.post('/advert',advertData)
}

export const getAdverts = ()=>{
   return appAxios.get('/advert')
}

