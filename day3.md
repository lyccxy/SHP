复习：
1）商品分类的三级列表由静态变为动态形式【获取服务器数据：解决代理跨域问题】
vue.config.js配置文件中配置代理跨域
  //代理跨域
  devServer:{
    proxy:{
      '/api':{
        //跳转真实服务器地址
        target:'http://gmall-h5-api.atguigu.cn',
        // 路径重写
        pathRewrite:{'^/api':''}   
      }
    }
  }

2）函数防抖与节流【面试频率很高】
通过按需引入lodash方法
节流：import throttle from 'lodash/throttle';
防抖：import debounce from 'lodash/debounce';
    1.函数的防抖与节流  底层原理使用【闭包+延迟器】
        节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
            使用_.throttle(要节流的函数,需要节流的毫秒)

        防抖：前面的所有触发都被取消，最后一次执行在规定的时间之后才触发，也就是说如果连续快速的触发，只会执行一次
            lodash插件：里面封装函数的防抖与节流的业务【闭包+延迟器】
            lodash对外暴露的是一个_函数
            使用_.debounce(要防抖的函数，需要延迟的时间)

        区别:防抖：用户操作很频繁，但是只是执行一次
            节流：用户操作很频繁，但是会把频繁的操作变为少量的操作【可以给浏览器有充裕的时间解析代码】

3)路由的跳转
    1.声明式导航：<router-link to="/xxxx"></router>
        是一个组件，如果频繁生成可能出现卡顿现象，使用编程式导航解决
    2.编程式导航：this.$router.push|replace 
        可配合事件委派使用，通过自定义属性绑定，通过event.target中的dataset获取属性名与值
        <a :data-categoryName="category.categoryName" :data-category1id="category.categoryId">
        let categoryname= event.target.dataset.categoryname
        let {categoryname,category1id,category2id,category3id}=element.dataset
    3.整合路由参数
        let categoryname= event.target.dataset.categoryname
        let {categoryname,category1id,category2id,category3id}=element.dataset
         <!-- 整理完参数 -->
        location.query=query
        this.$router.push(location)

1.开发Search模块中的TypeNav商品分类菜单（过度动画）
    1.1.创建一个响应式数据show用来判断是否隐藏，在需要进行隐藏与显示的标签中添加v-show属性绑定show
        data{
            return {
                show:true
            }
        }
    1.2.在TypeNav组件mouted挂载时进行路由判断 如果不是home组件则将响应数据show 改为false使得标签进行隐藏
         <!-- 如果不是Home路由组件，将typeNav进行隐藏 -->
        if(this.$route.name!='home'){
        this.show=false
        }
    1.3.添加鼠标移出移入动作  @mouseenter @mouseleave

    1.4.过渡动画：前提组件|元素务必要有v-if|v-show指令才可以进行过渡动画
        <transition name="sort">
        </transition>
        <!-- 过度动画的样式 -->
        <!-- 过度动画开始状态（进入） -->
            .sort-enter{
            height: 0px;
            }
        <!-- 过度动画结束状态（进入） -->
            .sort-enter-to{
            height: 461px;
            // 旋转360度
            // transform: rotate(360de);
            }
        <!-- 定义动画时间、速率 -->
            .sort-enter-active{
            transition: all .5s linear;
            }
    
    1.5.优化商品三级分类列表 *
    将获取数据放在APP组件mounted挂载中
    //派发acation 获取商品分类的三级列表的数据 
    this.$store.dispatch('home/categoryList')

    1.6.合并params与query参数
        通过判断当前路由是否包含params或者query参数
        传递params参数时包含query (传递query时含有params参数同理)
        let location={name:'xxx',query:{xxx:xxx}}
        if(this.$route.query){
        location.query=this.$route.query
        }

2.开发Home首页当中的ListContainer组件与Floor组件
    https://docschina.org/
    需要知道：服务器返回的数据（接口）只有商品分类菜单分类数据，对于ListContainer组件与Floor组件数据服务器没有提供
    mock数据（模拟）：如果你想mock数据，需要用到插件mockjs
    
    2.1 安装mockjs插件
        2.1.1.npm改为淘宝镜像
        npm config set registry https://registry.npm.taobao.org
        2.1.2 下载mockjs
        npm install mockjs
    
    2.2 使用步骤：
        2.2.1 在项目当中src文件夹中创建mock文件夹 （提供假数据）
        2.2.2 准备json数据（mock文件夹中创建相应的json文件）
        2.2.3 将mock数据需要的图片放置道Public文件夹中【public文件夹在打包的时候，会把相应的资源原封不动打包道dish文件夹中】
        2.2.4 开始mock（虚拟的数据），创建mockServe.js通过mockjs插件
            // 引入Mockjs模块
            import Mock from 'mockjs'
            // 把JSON数据格式引入进来[JSON数据格式没有对外暴露但是可以引入]
            // webpack默认对外暴露的：图片、JSON数据格式
            import banner from './banner.json';
            import floor from './floor.json';
            // mock数据 :第一个参数请求地址  第二个参数：请求数据
            Mock.mock("/mock/banner",{code:200,data:banner}); //模拟首页大的轮播图的数据
            Mock.mock("/mock/floor",{code:200,data:floor}) 
        2.2.5 mockServer.js文件在入口main.js文件中引入（至少需要执行一次，才能执行数据）
            api中重新重写针对Mock request、respone请求与响应

3.ListContainer组件开发重点
    3.1 安装Swiper插件：安装的是swiper@5
        3.1.1.npm改为淘宝镜像
        npm config set registry https://registry.npm.taobao.org

        3.1.2 下载swiper 参照文档
        npm install --save swiper@5
        https://www.swiper.com.cn/usage/index.html

        3.1.3 引包与样式
        import Swiper from "swiper";
        样式在main.js中引入swiper样式
        import "swiper/css/swiper.css"

        3.1.4 实例化swiper无法使用（异步请求，结构没有）
        第一种解决方案：使用定时器
        // 在new Swiper实例之前，页面中结构必须有
        setTimeout(()=>{
            var mySwiper = new Swiper ('.swiper-container', {
            //   direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // 如果需要滚动条
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            })
            } ,2000)
        },
        
        第二种解决方案：最完美解决方案 watch+nextTick
        watch:数据监听：监听已有数据变化
         watch: {
        // 监听bannerList数据的变化：因为这条数据发生过变化-----由空数组变为数组里面由四个元素
        bannerList: {
            handler(newValue, oldValue) {
                // 现在通过watach监听属性值发生变化
                // 如果执行Handler方法，代表组件实例这个属性的属性值已经有了
                // 当前这个函数执行：只能保证BannerList数据已经有了，但是v-for是否执行完成并不能保证
                // v-for执行完毕，才有结构【在watch当中无法保证】
                // nextTick：在下次Dom更新 循环结束之后，执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的Dom
                this.$nextTick(function(){
                // 当执行这个回调：保证服务器数据回来了，v-for执行完毕了【轮播图一定有数据了】
                var mySwiper = new Swiper(".swiper-container", {
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
                })
            },
            },
        },
