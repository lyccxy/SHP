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

3.开发Search模块
    1.1 根据不同参数返回不同结果数据
        mounted生命周期只在组件挂载完毕执行一次【仅仅执行一次】
        创建响应式数据searchParams处理初始化传参数据
        在beforeMount生命周期中先初始化数据
        复杂写法
        let query = this.$route.query;
        this.searchParams.category1Id = query.category1Id;
        this.searchParams.category2Id = query.category2Id;
        this.searchParams.category3Id = query.category3Id;
        this.searchParams.categoryName=query.categoryName
        this.searchParams.keyword = this.$route.params.keyword;

    1.2 Object.assign:ES6新增的语法，合并对象
        Object.assign(需要被合并对象，合并对象1，合并对象2)
        Object.assign(searchParams,query,params)

    2 Search完成进度
        2.1 Search模块需要的服务器数据，已经请求到并且存储于vuex仓库中，有一些数组数据【已经通过getters】进行简化
           切记：仓库中的getters用于简化数据而生
        2.2 商品列表、平台售卖属性已经动态数据（来自于服务器数据）

    3. 监听路由的变化再次发起请求
        3.1数据监听：监听组件实例身上的属性的属性值变化
        watch:{
            <!-- 监听路由信息是否发生变化，如果发生变化，再次发起请求 -->
            $route(newValue,oldValue){
                <!-- 整理路由传递参数与接口参数数据 -->
            Object.assign(this.searchParams,this.$route.query,this.$route.params)
            this.getData()
            }
        }

        3.2 什么时候需要开启深度监听
            当数据十分复杂时，例如：一个数组中有着许多对象，对象中又包含许多数据