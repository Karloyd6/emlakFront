import { getAdverts, getAdvertsByType } from "@/services/loaders";

export const advert = {
    namespaced: true,
    state : {
        currentAdvert : null,
        advertList : [],
        rentOrBuy : null
    },
    actions : {
        setAdvertList({ commit },type){
            if(type){
                getAdvertsByType(type).then((response) => {
                    commit("setAdvertList",response.data)
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
        }
    }
}