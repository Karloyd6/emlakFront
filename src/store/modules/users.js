export default {
    state : {
        user : null,
    },
    mutations : {
        currentUser(state,user){
            state.user=user;
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
            return state.user !== null ? true : false
        }
    }
}