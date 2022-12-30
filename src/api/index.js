// 当前这个模块：API接口进行统一管理
import requests from "./request";
import mockRequests from './mokeAjax'

// 三级联动接口
// api/product/getBaseCategoryList get 无参数

export const getCategoryList=()=>{
    //发请求:axios发请求返回结果Promise对象
    return  requests({
        method:'get',
        url:"/product/getBaseCategoryList"
    })
}

// 获取Banner（Home首页轮播图接口）
export const reqGetBannerList=()=>{
    //发请求:axios发请求返回结果Promise对象
    return  mockRequests({
        method:'get',
        url:"/banner"
    })
}

// 获取Floor（Home楼层数据接口）
export const reqGetFloorList=()=>{
    //发请求:axios发请求返回结果Promise对象
    return  mockRequests({
        method:'get',
        url:"/floor"
    })
}

// 获取搜索模块数据 地址：/api/list 请求方式：post
/* 
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
// 当前这个函数需不需要接收外部传递参数
// 当前这个接口（获取搜索模块数据），给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo=(params)=>{
    return requests({
        method:'post',
        url:"/list",
        data:params? params:{}
    })
}



