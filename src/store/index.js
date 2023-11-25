import {createStore} from "vuex"
import advert from "@/store/modules/adverts.js"
import user from "@/store/modules/users.js"
import VuexPersister from 'vuex-persister'

const vuexPersister = new VuexPersister({
    // ...your options
})

const store = createStore({
<<<<<<< HEAD
    
=======
>>>>>>> parent of afccb34 (header sidebar vs yapıldı loginde vuex hatası)
    state : {
    
    },
    modules : {
<<<<<<< HEAD
        ...advert,
        ...user
=======
       advert,
       user
>>>>>>> parent of afccb34 (header sidebar vs yapıldı loginde vuex hatası)
    },
    plugins : [vuexPersister.persist]
})

export default store;