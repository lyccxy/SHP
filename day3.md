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
