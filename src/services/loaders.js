import appAxios from "../utils/appAxios";

export const addAdvert = (advertData) => {
    return appAxios.post('/advert',advertData)
}

export const getAdverts = ()=>{
   return appAxios.get('/advert')
}

export const getAdvertsByType = (type)=>{
    return appAxios.get(`/advert/type/${type}`,{
        params : {type : type}
    })
}

export const getShowcaseList = ()=>{
    return appAxios.get(`/advert/showcase/${true}`)
}