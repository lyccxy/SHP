1:vue-cli脚手架初始化项目

      node + webpack + 淘宝镜像 

      node_modules文件夹：项目依赖

      public文件夹：一般放置一些静态资源（图片），需要注意，放在Public文件夹中的静态资源，webpack进行打包的时候，
      会原封不动打包到dist文件夹中

      src文件夹（程序员源代码文件夹）：
          assets文件夹：一般也是放置静态资源（一般放置多个组件共用的静态资源），需要注意，放置在assets文件夹里面静态资源
          在webpack打包的时候，webpack会把静态资源当作一个模块，打包JS文件里面。

          components文件夹：一般放置的是非路由组件（全局组件）

          App.vue：唯一的根主键，Vue当中的组件（.vue）

          main.js:程序入口文件，也是程序最先执行的文件

      babel.config.js:配置文件（babel相关）

      package.json文件：认为项目身份证，记录项目叫做什么、项目当中有哪些依赖、项目如何运行。

      package-lock.json：缓存性文件

      README.md：说明性文件

2：项目配置

      2.1 项目运行起来的时候让浏览器自动打开
      --package.json
       "scripts": {
          "serve": "vue-cli-service serve --open",    //  --open设置自动打开
          "build": "vue-cli-service build",
          "lint": "vue-cli-service lint"
        },

      2.2 eslint校验工具的关闭
      ---在根目录下，创建vue.config.js文件
      比如：声明变量但是没有使用eslint校验工具报错
      lintOnSave:false // 关闭eslint

      2.3src文件夹简写方式，配置别名。 @ [@代表但是src文件夹，将来文件过多，找的时候方便很多]
       "compilerOptions": {
          "target": "es5",
          "module": "esnext",
          "baseUrl": "./",
          "moduleResolution": "node",
          "paths": {
            "@/*": [
              "src/*"
            ]
          }

3:项目路由的分析
    vue-router
      前端所谓路由：KV键值对。
      key：Url(地址栏中的路径)
      value：相应的路由组件

      注意：项目上中下结构
      路由组件：
      Home首页路由组件、Serch路由组件、login登录路由、register注册路由
      非路由组件：
      Header【首页、搜索页】
      Footer【在首页、搜索页】,但是在登录|注册界面是没有的

4、完成非路由组件Header与Footer业务
      在项目当中，不在以HTML+CSS为主，主要搞业务、逻辑
      在开发项目的时候：
      1：书写静态页面（HTML+CSS)
      2: 拆分组件
      3：获取服务器的数据动态展示
      4：完成相应的动态业务逻辑

      注意1：创建组建的时候，组件结构 + 组件的样式 + 图片资源
      注意2：项目采用的less样式。浏览器不识别less样式，需要通过less、less-loader进行处理
      less，把less样式变为css，浏览器才能使用 
      npm改为淘宝镜像
      npm config set registry https://registry.npm.taobao.org
      下载安装less依赖
      npm install --save less less-loader@5  

      注意3：如果想让组件识别less样式，需要在style标签身上加上lang="less"属性

      注意4：在public文件夹下放入reset.css清楚默认样式，在Index文件夹中引入reset.css样式

      4.1 使用组件的步骤（非路由组件）
      -创建或者定义组件
      -引入 import xxx from '组件路径'
      -注册 components属性下注册 xxx
      -使用 template标签下使用<xxx/>


5.路由组建的搭建
    根据3.路由组件分析知：路由组件应该有四个：Home,Search,Login,Register 

      npm改为淘宝镜像
      npm config set registry https://registry.npm.taobao.org
      下载安装vue-router@3版本依赖 （不加版本号vue-router将下载最新版本，最新版本不支持vue2.0）
      npm install vue-router@3

      -components文件夹：经常放置的非路由组件（共用全局组件）
      -page|views文件夹：经常放置路由组件

      5.1 配置路由
      项目当中配置的路由一般放置在router文件夹中

      5.2总结
      路由组件与非路由组件的区别？
      1：路由组件一般放置在pages|views文件夹下，非路由组件一般放置components文件夹下
      2：路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字）<例：<router-view/>>，非路由组件在使用的时候，一般使用标签进行使用<例：<footer/>
      3：注册完路由，不管路由是路由组件、还是非路由组件，身上都有$router、$route属性

      $route：一般获取路由信息【路径、query、params等等】
      $router：一般进行编程式导航进行路由跳转【push|replace】
      
      5.3路由的跳转？
      路由的跳转有两种形式：
      1：声明式导航router-link,可以进行路由的跳转
      <!-- 声明式导航：务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
       
      2：编程式导航push|replace，可以进行路由跳转
            methods: {
          // 搜索按钮的回调函数：需要向search路由进行跳转
            goSearch(){
            this.$router.push('/search')
            }
        }
      编程式导航：声明式导航能做的，编程式导航都能做
      但是编程时导航除了可以进行路由跳转，还可以做其他的一些业务逻辑

6.Footer组件显示与隐藏
显示或者隐藏：v-if|v-show
Footer组件：在Home、Search显示Footer组件
            在登陆、注册时消失

      6.1 可以根据组件身上的$route获取当前路由的信息，通过路由路径判断Footer显示与隐藏（不推荐）
        computed:{
           isShow(){
              return this.$route.path==="/home"||this.$route.path==="/search"
            }
        }
      6.2 配置路由的时候，可以给路由添加路由元信息【meta】，路由需要配置对象，它的key不能乱定义（推荐）
            name:'home',
            path:'/home',
            component:Home,
            meta:{show:true}  ******
          通过在组件中使用v-show="this.$route.meta.show"进行隐藏与显示

7.路由传参

      7.1：路由跳转有几种方式？
      比如：A->B
      声明式导航：router-link（务必要有to属性）,可以实现路由的跳转
      编程式导航：利用的是组件实例的$router.push|replace方法，可以实现路由的跳转。（可以书写一些自己的业务）

      7.2：路由传参，参数有几种写法？
      params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
      query参数：不属于路径当中的一部分，类似于ajax中的queryString  /home?k=v&kv=,不需要占位
        1：字符串形式 params路由路径占位 例：path:'/search/:keyWord' query使用?
        this.$router.push('/search/'+this.keyWord+"?k="+this.keyWord.toUpperCase())
        2：模板字符串  使用``可以使用${}获取data数据
        this.$router.push(`/search/${this.keyWord}?k=${this.keyWord.toUpperCase}`)

        3. 对象形式传参    ****（常用） 需要使用对象形式传参 需要配置路由名称 使用编程式路由 接收参数{{this.$route.params.keyWord}}
        this.$router.push({
          name:'search',
          params:{
            keyWord:this.keyWord
          },
          query:{
            k:this.keyWord.toUpperCase()
          }
        })）

8.路由报错
      8.1：编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误？
      --路由跳转有两种形式：声明式导航、编程式导航
      --声明式导航没有这类问题的，因为vue-router底层已经处理好了

        1.1：为什么编程式导航进行路由跳转的时候，就有这种警告错误？
        "vue-router":"^3.5.3":最新的vue-router引入promise

        function push(){
          return new Promise((resolve,reject)=>{
          })
        }

        解决办法：通过给push方法传递相应的成功、失败方法(success)=>,(error)=>
        this.$router.push({name: "search",params: {keyWord: this.keyWord,},query: {k: this.keyWord.toUpperCase()}},()=>{},()=>{});

        1.2通过上一步解决方法，可以实现解决错误
        但是这种写法：治标不治本，将来在别的组件当中push|replace，编程式导航还是有类似错误。

        1.3 
        this:当前组件实例（search）
        this.$router属性：当前的这个属性，属性值VueRouter类的一个实例，当在入口文件router/index.js注册路由的时候，给组件实例添加的$router|$route
        this.$router.push:VueRouter类的一个实例

        最终解决方法~~！！！！！！！！
        // 先把VueRouter原型对象的push方法，先保存一份
        let originPush=VueRouter.prototype.push

        //重写push|replace
        // 第一个参数：告诉原来Push方法，你往哪里跳转（传递哪些参数）
        VueRouter.prototype.push=function(location,resolve,reject){
            if(resolve && reject){
                // call||apply区别：
                // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
                // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
                originPush,call(this,location,resolve,reject)
            }else{
                originPush.call(this,location,()=>{},()=>{})
            }
        }


9.路由传参相关面试题
      1：路由传递参数（对象写法）path是否可以结合params参数一起使用？
      this.$router.push({path:'/search',params:{keyWord:"this.keyWord"},query:{k:this.keyWord.toUpperCase()}})
      答：路由跳转传参的时候，对象的写法可以是Name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用

      2.如何指定params参数可传可不传
      比如：配置路由的时候，占位了（params参数），但是路由跳转的时候就不传参
      路径未出现问题
      http://localhost:8080/#/?k=QWE(错误路径)
      http://localhost:8080/#/search?k=QWE（正确路径）
      答：在配置路由的时候，在占位的后面加上一个问好【params可以传递或者不传递】

      3.params参数可以传递也可以不传递，但是如果传是空串，如何解决？
      答：使用undefined解决：params参数可以传递、不传递（空的字符串）
      this.$router.push({name:'search',params:{keyWord:''||undefined},query:{k:this.keyWord}})

      4.路由组件能不能传递props数据？
      答：可以的：三种写法
          4.1布尔值写法:params 只能传递params参数
          路由组件中设置props属性 ，在跳转的组件中接收props参数，例：props:['keyWord']
            props:true
          
          4.2对象写法：额外的给路由组件传递一些props 在跳转的组件中接收props参数，例：props:['a','b']
            props:{a:1,b:2}

          4.3函数写法：在跳转的组件中接收props参数，例：props:['keyword','k']
          props:($route)=>{
                return {keyword:$route.params.keyword,k:$route.query.k}
          }