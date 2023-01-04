const state={
    keyword:""
}
const mutations={
    removeKeyword(state){
        state.keyword=""
    },
    updateKeyword(state,data){
        state.keyword=data
    }
}
const actions={
    removeKeyword(context){
        context.commit("removeKeyword")
    },
    updateKeyword(context,data){
        context.commit("updateKeyword",data)
    }
}
const getters={

}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}