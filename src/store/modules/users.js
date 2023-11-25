export default {
    // namespaced: true,
    state : {
        user : {},
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
        }
    }
}