export default {
<<<<<<< HEAD
    // namespaced: true,
=======
>>>>>>> parent of afccb34 (header sidebar vs yapıldı loginde vuex hatası)
    state : {
        user : null,
    },
    mutations : {
        currentUser(state,user){
            state.user = user;
        },
        logout(state){
            state.user=null;
        }
    },
    getters : {
        _getCurrentUser(state){
            return state.user
        },
        _isAuthenticate(state){
<<<<<<< HEAD
            if(state.user !== null){
                return true
            }
            return false
            // return state.user !== null ? true : false
        }
    },
    actions : {
        currentUser(context, payload){
           context.commit("currentUser",payload)
=======
            if(state.user == null){
                return false;
            }else{
                return true;
            }
            // return state.user !== null ? true : false
>>>>>>> parent of afccb34 (header sidebar vs yapıldı loginde vuex hatası)
        }
    }
}