// 配置路由的地方
// 引入vue
import Vue from 'vue'

// 引入路由插件
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)
//配置路由
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

// 先把VueRouter原型对象的push方法，先保存一份
let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace

//重写push|replace
// 第一个参数：告诉原来Push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve && reject){
        // call||apply区别：
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,this.replace)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
} 

export default new VueRouter({
    routes:[
        {
            name:'home',
            path:'/home',
            component:Home,
            meta:{
                show:true,
            }
        },
        {
            name:'search',
            path:'/search:keyword?',
            component:Search,
            meta:{show:true},
            //路由组件能不能传递props数据？
            //布尔值写法:params 只能传递params参数
            // props:true,
            //对象写法：
            // props:{a:1,b:2}
            //函数写法
            props:($route)=>{
                return {keyword:$route.params.keyword,
                    k:$route.query.k
                }
            }
        },
        {
            name:'login',
            path:'/login',
            component:Login,
            meta:{show:false}
        },
        {
            name:'register',
            path:'/register',
            component:Register,
            meta:{show:false}
        }
        ,
        //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
        {
            path:'/',
            redirect:'/home'
        }
        ]
})