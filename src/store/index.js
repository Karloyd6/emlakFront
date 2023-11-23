import {createStore} from "vuex"
import advert from "@/store/modules/adverts.js"
import user from "@/store/modules/users.js"
import VuexPersister from 'vuex-persister'

const vuexPersister = new VuexPersister({
    // ...your options
})

const store = createStore({
    namespaced :true,
    state : {
    
    },
    modules : {
       ...advert,
       ...user
    },
    plugins : [vuexPersister.persist]
})

export default store;