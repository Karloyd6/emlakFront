import { createStore } from "vuex"
import VuexPersister from 'vuex-persister';
import { auth } from "@/store/auth.js"
import { advert } from "@/store/adverts.js"

import SecureLS from "secure-ls";
var ls = new SecureLS({isCompression: false});
// ls.set("key", {data : "secret_key"})

const vuexPersister = new VuexPersister({
    // ...your options
    key : "key",
    storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key),
    }
})

const store = createStore({
    state : {
        // advert : {},
        newAddId : "",
        user : null,
    },
    mutations : {
        currentAdvert(state,advert){
            state.advert = advert
        },
        setNewAddId(state,id){
            state.newAddId = id
        }
    },
    getters : {
        _getCurrentAdvert(state){
            return state.advert
        },
        _getNewAddId(state){
            return state.newAddId
        }
    },
    actions : {
    },

    plugins : [vuexPersister.persist],
    modules: {
        auth,
        advert
    }
})

export default store;