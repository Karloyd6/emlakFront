export default  {
    state : {
        advert : {},
        newAddId : ""
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
    }
}