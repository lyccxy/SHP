import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库注册
import store from './store'
//三级联动组件 ---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel';
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.config.productionTip = false
// 引入MockServer.js----mock数据
import '@/mock/mockServe'
//引入swiper样式
import "swiper/css/swiper.css"

const vm=new Vue({
  beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
  render: h => h(App),
  // 注册路由：底下的写法KV一致省略V
  // 注册路由后，组件中都具有$router,$router
  router,
  // 注册store仓库
  store
}).$mount('#app')