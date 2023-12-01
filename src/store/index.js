import { createStore } from "vuex"
import VuexPersister from 'vuex-persister'

const vuexPersister = new VuexPersister({
    // ...your options
})

const store = createStore({
    state : {
        advert : {},
        newAddId : "",
        user : null,
    },
    mutations : {
        currentUser(state,user){
            state.user = user
        },
        logout(state){
            state.user = null
        },
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
        },
        _getCurrentUser(state){
            return state.user
        },
        _isAuthenticate(state){
            if(state.user){
                return true
            }
            return false
            // return state.user !== null ? true : false
        }
    },
    actions : {
        currentUser(context, payload){
           context.commit("currentUser",payload)
        },
        logout(context){
            context.commit("logout")
        }
    },

    plugins : [vuexPersister.persist]
})

export default store;