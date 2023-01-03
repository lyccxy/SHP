<<<<<<< HEAD
import { getCategoryList, reqGetBannerList,reqGetFloorList } from "@/api";
// home模块的小仓库
const state = {
    // Home仓库中存储三级菜单数据
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    //楼层数据
    floorList:[]
};
const mutations = {
    categoryList(state, data) {
        state.categoryList = data
    },
    getBannerList(state, data) {
        state.bannerList = data
    },
    getFloorList(state,data){
        state.floorList=data
    }
};
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList(context) {
        await getCategoryList().then((res) => {
            context.commit('categoryList', res.data)
        })
    },
    async getBannerList(context) {
       let result= await reqGetBannerList();
       if(result.code===200)
       context.commit('getBannerList',result.data)
    },
    async getFloorList(context){
        let result=await reqGetFloorList();
        if(result.code===200){
            context.commit('getFloorList',result.data)
        }
    }
};
const getters = {

};

export default {
    namespaced: true,
=======
import { getCategoryList } from "@/api";
// home模块的小仓库
const state={
    categoryList:[]
};
const mutations={
    categoryList(state,data){
        state.categoryList=data
     
    }
};
const actions={
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  
    categoryList(context){
     getCategoryList().then((res)=>{
        context.commit('categoryList',res.data)
      })
      
    }
};
const getters={

};

export default{
    namespaced:true,
>>>>>>> c88172b30c69a1c93f8647f2fa0cbbe9a1924fa9
    state,
    mutations,
    actions,
    getters
}