复习
1）完成商品分类的三级列表路由跳转一级路由传参（合并参数）
2）完成search模块中对typeNav使用（过度动画）
3）对于typeNav请求次数也进行了优化 （放在APP.vue根组件中）
4）swiper插件的使用
    swiper插件：经常制作轮播图（移动端|PC端也可以使用）
使用步骤：
第一步：引入相应依赖包（swiper.js|swiper.css）
第二步：页面中的结构务必要要有
第三步：初始化swiper实例，给轮播图添加动态效果
5）mock数据，通过mockjs模块实现的

1.floor组件开发 
    1.1 编写api接口获取mock数据
    // 获取Floor（Home楼层数据接口）
    export const reqGetFloorList=()=>{
        //发请求:axios发请求返回结果Promise对象
        return  mockRequests({
            method:'get',
            url:"/floor"
        })
    }
    1.2 通过mouted钩子函数获取mock数据传入store的state中 （需要在home路由组件当中发）
    1.3 通过计算属性computed中...mapState('仓库模块名',['floorList'])
    获取仓库中的floorList数据进行前台遍历
    1.4 在Floor组件mouted钩子函数中实例化swiper轮播图
        // 当执行这个回调：保证服务器数据回来了，v-for执行完毕了【轮播图一定有数据了】
        var mySwiper = new Swiper(this.$refs.floorSwiper, {
        //   direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
            el: ".swiper-pagination",
            clickable: true, //点击小球的时候也切换图片
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        // 如果需要滚动条
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        });
    1.5组件通信的方式有哪些？（面试频率极高）
    props：用于父子组件通信
    自定义事件：@on @emit 可以实现子给父通信
    全局事件总线：$bus
    插槽
    vuex

2.把首页中的轮播图拆分为一个共用全局组件