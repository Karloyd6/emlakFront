import { getAdverts, getAdvertsByType, getShowcaseList } from "@/services/loaders";

export const advert = {
    namespaced: true,
    state : {
        showcase : [],
        currentAdvert : null,
        advertList : [],
        rentOrBuy : null,
        advertType : null    },
    actions : {
        setAdvertList({ commit },type){
            if(type){
                getAdvertsByType(type).then((response) => {
                    commit("setAdvertList",response.data);
                })
            }else if(!type){
                getAdverts().then((response) => {
                    commit("setAdvertList",response.data)
                }).catch((err) => {
                    
                });
            }
        },
        setCurrentAdvert({ commit }, advert){
            commit("setCurrentAdvert",advert)
        },
        setAdvertListByQuery({ commit },advertList){
            commit("setAdvertList",advertList)
        },
        setRentOrBuy({ commit },rentOrBuy){
            commit("setRentOrBuy",rentOrBuy)
        },
        setShowcaseList({ commit }){
            getShowcaseList().then((response)=>{
                commit("setShowcaseList",response.data)
            })
        }
    },
    mutations: {
        setAdvertList(state,advertList){
            state.advertList = advertList
        },
        setRentOrBuy(state,rentOrBuy){
            state.rentOrBuy = rentOrBuy
        },
        setCurrentAdvert(state, advert){
            state.currentAdvert = advert
        },
        setShowcaseList(state,showcaseList){
            state.showcase = showcaseList
        }
    },
    getters : {
        getAdvertList(state){
            return state.advertList
        },
        getRentOrBuy(state){
            return state.rentOrBuy
        },
        getCurrentAdvert(state){
            return state.currentAdvert
        },
        getShowcaseList(state){
            return state.showcase
        }
    }
}