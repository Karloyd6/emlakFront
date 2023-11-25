export default  {
    // namespaced: true,
    state : {
        advert : {},
        newAddId : "",
        advertList : []
    },
    mutations : {
        currentAdvert(state,advert){
            state.advert = advert
        },
        setNewAddId(state,id){
            state.newAddId = id
        },
        setAdvertList(state,advertList){
            state.advertList = advertList
        }
    },
    getters : {
        _getCurrentAdvert(state){
            return state.advert
        },
        _getNewAddId(state){
            return state.newAddId
        }
    }
}