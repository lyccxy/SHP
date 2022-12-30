1.Home模块组件拆分
--先把静态页面完成
--拆分出静态组件
--获取服务器的数据进行展示
--动态业务

    1.1 三级联动组件完成
    --- 由于三级联动，在Home、Search、Detail，把三级联动注册为全局组件。
    好处：只需要注册一次，就可以在项目任意地方使用
    
        在main.js中注册全局组件
            //三级联动组件 ---全局组件
            import TypeNav from '@/pages/Home/TypeNav'
            // 第一个参数：全局组件的名字 第二个参数：哪一个组件
            Vue.component(TypeNav.name,TypeNav)

        在需要使用的组件中
            <!-- 三级联动全局组件 ：三级联动已经注册为全局组件，因此不需要再引入 -->
            <TypeNav />

    1.2 完成其余静态组件
    HTML + CSS + 图片资源  ----细心【结构、样式、图片资源】
    
2.POSTMAN测试接口
--POSTMAN测试接口无问题
--如果服务器返回数据code字段200，代表服务器返回数据成功
--整个项目，接口前缀都有/api字样

3.axios二次封装
XMLHttpRequest、fetch、JQ、axios
    3.1为什么需要进行二次封装axios？
        请求拦截器：请求拦截器，可以在发请求之前可以处理一些业务
        响应拦截器：响应拦截器，当服务器数据返回之后，可以处理一些事情
    
    3.2 安装axios
        1.npm改为淘宝镜像
         npm config set registry https://registry.npm.taobao.org
        2.npm install --save axios

    3.3 在项目新建API文件夹【axios】 创建request.js 引入axios并对其进行二次封装
        1.引入axios
        import axios from 'axios'

        2.配置request
        接口当中：路径都带有/api
        baseURL:"api"
        代表请求超时的时间5S
        timeout:5000

        3.对外暴露
        export default requests;
    
    3.4 axios可以参考git|NPM关于axios的文档

4.接口统一管理    在API文件夹下创建index.js进行统一管理

项目很小：完全可以在组建的生命周期函数中去发请求

项目很大：axios.get('xxx')

    在APi文件夹中配置index.js封装axios请求，通过export const xxx进行暴露
    需要使用的组件使用 import {} from '@/api/index.js'
                    例：import {getCategoryList} from '@/api'
                    使用：getCategoryList.then((res)=>{
                            res.data 响应数据
                            res.code 响应状态码
                    })

    4.1 跨域问题
    什么是跨域：协议、域名、端口号不同请求，称之为跨域
    http://localhost:8080/#/home  ----前端项目本地服务器
    http://gmall-h5-api.atguigu.cn  ----后台服务器

    解决方法：
    JSONP、CROS、代理
    使用代理解决跨域问题： 在vue.config中配置  配置后需要重启服务
      //代理跨域
        devServer:{
            proxy:{
            '/api':{
                //跳转的服务器地址
                target:'http://gmall-h5-api.atguigu.cn',
                // 路径重写
                // pathRewrite:{'^/api':''}   
            }
            }
        }

5. nprogress进度条的使用
    5.1 安装nprogress
        1.npm改为淘宝镜像
         npm config set registry https://registry.npm.taobao.org
        2.npm install --save nprogress
    
    5.2 在API文件夹request.js中 利用请求拦截器以及响应拦截器对nprogress进度条进行使用
        1.引入进度条 以及 进度条样式
        import nprogress from 'nprogress'
        import 'nprogress/nprogress.css'

        2.使用进度条
        请求拦截器中使用：nprogress.start():进度条开始
        响应拦截器中使用：nprogress.done():进度条结束

        3.修改nprogress进度条颜色
        在nprogress文件夹下nprogress.css中修改 nprogress .bar中的背景色

6. vuex状态管理库

    6.1 vuex是什么？
        vuex是官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据。
        切记，并不是全部项目都需要Vuex，如果项目很小，完全不需要Vuex，如果项目很大，组件很多、数据很大，数据维护很费劲使用Vuex
        VueX中的重要属性
        1.state：仓库存储数据的地方
        const state={};
        2.mutations：修改state的唯一手段
        const mutations={};
        3.actions：处理action的地方，可以书写自己的业务逻辑，也可以处理异步
        const actions={};
        4.getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
        const getters={};
        5.modules
    
    6.2 安装Vuex
        1.npm改为淘宝镜像
        npm config set registry https://registry.npm.taobao.org
        2.npm install --save vuex@3

    6.3 vuex基本使用
        1.src目录下创建store/index.js

        2.引入vue以及vuex 并且 vue使用插件
        import Vue from 'vue'
        import Vuex from 'vuex'
        Vue.use(Vuex)

        3.对外暴露store类的一个实例
        export default new Vuex.Store({
            
        })

        4.注册store仓库
        在main.js中引入store并在vue实例化对象中进行注册（注意：组件实例的身上会多了一个属性$store属性）

        5.使用vuex参数
            1.store 
                需要使用的组件引入vuex中的mapstate方法
                import {mapState} from 'vuex'
                利用计算属性computed进行使用
                ...mapState['xxx','xxx']  (xxx为state中存储的数据，并且需要计算属性名与其想等才能使用)
                方法体中调用actions
                this.$store.dispatch('add',number) (第一个参数add为actions中对应的方法名,number为需要传递给actions方法的值)

            2.actions 
                可以修改业务逻辑，但是不能修改state
                actions方法中能接收两个参数
                (第一个参数context为操作体，里面包含commit方法调用mutations中的方法。第二个参数number为传来的参数，不传则为undefined)
                add(context,number){
                    提交commit mutations
                    (第一个参数add为mutations中对应的方法名,number为需要传递给mutations方法的值)
                    context.comit('add',number)
                }

            3.mutations
                （第一个参数为store仓库中的state对象，第二个参数number为actions方法传来的值）
                add(state,number){
                state.number+=number    //store仓库中的number属性值修改成功
                } 

    6.4 vuex实现模块化开发
        如果项目过大，组件过多，接口也很多，数据很大
        1.根据每个模块创建文件夹/index.js
            例： home模块的小仓库
                const state={};
                const mutations={};
                const actions={};
                const getters={};

                export default{
                    namespaced:true,//开启命名空间  *****
                    state,
                    mutations,
                    actions,
                    getters
                }
        2.store/index引入小仓库
            import xxx from './xxx'
            注册模块化
            modules:{
            Home,
            Search
            }
        3.开启命名空间后，组件中读取state数据：
            //方式一：自己直接读取
            this.$store.state.personAbout.list
            //方式二：借助mapState读取：
            ...mapState('countAbout',['sum','school','subject']),

        4.开启命名空间后，组件中读取getters数据：
            //方式一：自己直接读取
            this.$store.getters['personAbout/firstPersonName']
            //方式二：借助mapGetters读取：
            ...mapGetters('countAbout',['bigSum'])
        5.开启命名空间后，组件中调用dispatch
            //方式一：自己直接dispatch
            this.$store.dispatch('personAbout/addPersonWang',person)
            //方式二：借助mapActions：
            ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
        6.开启命名空间后，组件中调用commit
            //方式一：自己直接commit
            this.$store.commit('personAbout/ADD_PERSON',person)
            //方式二：借助mapMutations：
            ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),

7.完成TypeNav三级联动展示数据业务
    7.1 TypeNav生命周期mouted中调用 store中home模块的actions进行axios访问数据业务逻辑
         this.$store.dispatch('home/categoryList')
    
    7.2 store的home模块引入api中getCategoryList方法 actions发送axios拿到数据 通过mutations对state进行存储
        import { getCategoryList } from "@/api";
        getCategoryList().then((res)=>{
        context.commit('categoryList',res.data)
        })
      
    7.3 TypeNav组件中 通过引入mapState 设置计算属性 获取state中存储的catetoryList数据 通过v-for进行遍历
         computed:{
            <!-- 第一种写法：数组形式 -->
            ...mapState('home',['categoryList'])
            <!-- 第二种写法：对象形式 -->
            //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            ...mapState(
                {
                //注入一个参数state,其实即为大仓库中的数据
                 catetoryList:(state)=>{
                   return state.home.catetoryList
                 }   
                }
            )
        }
    
    7.4 完成一级分类动态添加背景颜色
    第一种解决方案：采用样式完成（.item{:hover{background:bluesky}}）
    第二种解决方案：通过JS完成
        1.添加响应式数据 currentIndex=-1 默认索引不选中

        2.document添加 @mouseenter鼠标移动到某个范围 动作 将遍历中的索引与响应式数据currentIndex关联
        例：<h3 @mouseenter="changeIndex(index)"></h3> 
        this.currentIndex=index

        3.添加:class="{cur:index===currentIndex}" 当index===currentIndex时 添加class属性cur

        4.在css中添加cur样式 cur:{background-color=skyblue}

        5.添加鼠标移出事件 @mouseleave(leaveIndex)

        6.事件委派将子元素事件委派给父级div
            给两个兄弟子元素添加div 在div中进行事件委派
    
    7.5 通过JS控制二三级商品分类的显示与隐藏
        1.通过CSS样式进行显示与隐藏
            display:none
            &:hover {
            .item-list {
              display: block;
            }

        2.通过JS控制二三级商品分类的显示与隐藏
            :style="{display:currentIndex==index?'block':'none'}

    7.6 演示卡顿现象
        正常：事件触发频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，name很可能出现浏览器卡顿）
        正常情况（用户慢慢的操作）：鼠标进入，每一个一次分类h3,都会触发鼠标进入时间
        非正常情况（用户操作过快）：本身全部的一级分类都应该触发鼠标事件，但是经过测试，只有部分h3出发了
        就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能出现卡顿现象
        
        1.函数的防抖与节流  底层原理使用【闭包+延迟器】
             节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
                    使用_.throttle(要节流的函数,需要节流的毫秒)

             防抖：前面的所有触发都被取消，最后一次执行在规定的时间之后才触发，也就是说如果连续快速的触发，只会执行一次
                    lodash插件：里面封装函数的防抖与节流的业务【闭包+延迟器】
                    lodash对外暴露的是一个_函数
                    使用_.debounce(要防抖的函数，需要延迟的时间)

            区别:防抖：用户操作很频繁，但是只是执行一次
                节流：用户操作很频繁，但是会把频繁的操作变为少量的操作【可以给浏览器有充裕的时间解析代码】

8. 三级联动组件的路由跳转与传递参数

    三级联动用户可以电机的：一级分类、二级分类、三级分类，当你点击的时候
    Home模块跳转到Search模块，一级会把用户选中的产品（产品的名字、产品的ID）在路由跳转的时候，进行传递。
    
    路由跳转：
    声明式导航：router-link
    编程式导航：push|replace

    三级联动：如果使用声明式导航router-link，可以实现路由的跳转与传递参数
    但是需要注意，出现卡顿现象。
    
    router-link：是一个组件，当服务器的数据返回之后，循环出很多的router-link组件【创建组件实例】1000+
    
    创建组件实例的时候，一瞬间创建1000+很耗内存，因此出现了卡顿现象

    最好的解决方法 使用编程式导航 + 事件委派
    在需要点击事件的就近父节点添加点击事件
    利用事件委派存在一些问题 ： 

       1.怎么确定点击的一定是A标签：
      <!-- 解决：把子节点当中a标签，加上自定义属性data-categoryName，其他子节点是没有
       获取到当前触发这个事件的节点【h3、a、dt、dl】，需要带有data-categoryname这样节点【一定是a标签】 -->
      let element=event.target;
      <!-- 节点有一个属性dataset属性，可以获取节点自定义属性与属性值 -->
      let categoryname= event.target.dataset.categoryname
      let {categoryname,category1id,category2id,category3id}=element.dataset
      <!-- 如果标签身上拥有categoryname肯定是A标签 -->
      <!-- 一定是A标签 -->
      if(categoryname){
        let location={name:'search'}
        let query ={categoryName:categoryname}   
        <!-- 2、如何确定是一级、二级、三级 A标签 如何获取参数【1、2、3级分类的产品的名字、ID】：
        解决：把子节点当中a标签，加上自定义属性data-category1Id,data-category2Id，data-category3Id 通过event.target.dataset判断 -->
        <!-- 一定是A标签 一级目录 -->
        if(category1id){
             整理路由跳转的参数
             query.category1Id=category1id
        <!-- 一定是A标签 二级目录 -->
        }else if(category2id){
             query.category2Id=category2id
        <!-- 一定是A标签 三级目录 -->
        }else{
             query.category3Id=category3id
        }
        <!-- 整理完参数 -->
        location.query=query
        this.$router.push(location)
      }