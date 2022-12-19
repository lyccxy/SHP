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
    state,
    mutations,
    actions,
    getters
}