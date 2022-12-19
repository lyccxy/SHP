// 当前这个模块：API接口进行统一管理
import requests from "./request";

// 三级联动接口
// api/product/getBaseCategoryList get 无参数

export const getCategoryList=()=>{
    //发请求:axios发请求返回结果Promise对象
    return  requests({
        method:'get',
        url:"/product/getBaseCategoryList"
    })
}
