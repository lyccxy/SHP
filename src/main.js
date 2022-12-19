import Vue from 'vue'
import App from './App.vue'
//三级联动组件 ---全局组件
import TypeNav from '@/components/TypeNav'
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)

// 引入路由
import router from '@/router'
Vue.config.productionTip = false

import store from './store'

const vm=new Vue({
  render: h => h(App),
  // 注册路由：底下的写法KV一致省略V
  // 注册路由后，组件中都具有$router,$router
  router,
  // 注册store仓库
  store
}).$mount('#app')