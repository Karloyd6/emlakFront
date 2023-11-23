export default {
    namespaced :true,
    state : {
        user : {},
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
    },
    actions : {
        async currentUser(context, payload){
            await context.commit("currentUser",payload)
        }
    }
}