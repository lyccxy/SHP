import {reqGetSearchInfo} from '@/api'
// search模块的小仓库
const state={
    searchList:{}
};
const mutations={
    GETSEARCHLIST(state,data){
        state.searchList=data
    }
};
const actions={
    // 获取search模块数据
    async getSearchList(context,params){
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
      let result= await reqGetSearchInfo(params)
      if(result.code===200){
        context.commit("GETSEARCHLIST",result.data)
      }
    }
};
// 计算属性，在项目当中，为了简化数据而生
// 项目当中getters主要的作用是：简化仓库中的数据
const getters={
    // 当前形参state,当前仓库中的state，并非大仓库中的那个state
    attrsList(state){
        return state.searchList.attrsList
    },
    goodsList(state){
        return state.searchList.goodsList
    },
    trademarkList(state){
        return state.searchList.trademarkList
    }
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}