1.面包屑处理分类操作
    1.1 展示数据
    <!--bread：面包屑，带有x的结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword()">×</i></li>
          </ul>
        </div>
    通过v-if动态判断是否展示面包屑数据

    1.2 删除分类名字
    removeCategoryName(){
      <!-- 把带给服务器的参数置空，还需要向服务器发请求 -->
      <!-- 带给服务器参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器 -->
      <!-- 但是把相应的字段变为undefined，当前这个字段不会带给服务器 -->
      this.searchParams.category1Id=undefined;
      this.searchParams.category2Id=undefined;
      this.searchParams.category3Id=undefined; 
      this.searchParams.categoryName=undefined;
      this.getData();
    }
    
    1.3 地址栏修改 （进行路由跳转） 编程式导航路由跳转
      1.3.1 删除三级分类（删除路由query参数，保存params参数）
      let location={name:"search"}
      if(this.$route.params){
        location.params=this.$route.params
      }
      this.$router.push(location)
      
      1.3.2 删除关键字查询（删除路由params参数，保留query参数）
       <!-- 删除关键字 -->
        removeKeyword(){
          this.searchParams.keyword=undefined;
          let location={name:"search"}
          if(this.$route.query){
            location.query=this.$route.query
          }
          this.$store.dispatch("head/removeKeyword")
          this.$router.push(location)
        }
    
    1.4 删除关键字搜索内容关联输入框清空
      <!-- 第一种方法：使用vuex中的store进行组件通信 -->
      1.4.1 创建本地store/head库
      1.4.2 通过dispatch、commit操作本地库 head模块下state中的keyword属性
      1.4.3 在head模块中通过计算属性computed：{}方法 计算keyword对象，通过keyword对象中的get()方法进行获取本地库state数据，通过set()方法进行修改本地库State数据   
        computed:{
          keyword:{
            get(){
              return this.$store.state.head.keyword;
            },
            set(value){
              this.$store.dispatch("head/updateKeyword",value)
            }
          }
        }
    1.4.4 在search模块下removeKeyword方法中调用this.$store.dispatch("head/removeKeyword") 清空state中数据
      第二种方法：使用$bus 全局事件总线进行组件通信
      <!-- main.js实例化vue对象中配置 -->
        beforeCreate() {
        Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
        },
      <!-- head模块中使用生命周期mouted初始化中配置this.$bus.$on -->
        this.$bus.$on("removeKeyword",(data)=>{
          this.keyword=data
        })
      <!-- search模块中调用this.$bus.$emit -->
        this.$bus.$emit("removeKeyword",data)
      
    1.4.5 设计组件通信：
      props:父子
      自定义事件：子父
      vuex：万能
      插槽：父子
      pubsub-js：万能
      $bus:全局事件总线

2.面包屑处理品牌信息
  2.1<!-- 第一种方法使用全局事件总线 -->
    2.1.1 使用$bus全局事件总线
        在searchSelector子组件中，对于点击品牌信息设置单击点击事件@click="showTrademark"
          showTrademark(data){
            this.$bus.$emit("showTrademark",data)
          }
    
    2.1.2 在search初始化生命周期mouted中配置全局总线事件
        this.$bus.$on("showTrademark",this.showTrademark)
    
    2.1.3 methods方法中编写showTrademark执行方法 （在search组件中重新向服务器发送请求）
        <!-- 通过全局事件总线获取品牌名称 -->
        showTrademark(data){
          <!--  将品牌名称通过面包屑方式展示数据 -->
          this.searchParams.trademark=data
          <!-- 重新获取后台数据 -->
          this.getData()
        }

    2.1.4 删除品牌信息面包屑
        removeTrademark(){
          this.searchParams.trademark=undefined;
          this.getData()
        }

  2.2<!-- 第二种方法使用自定义事件 -->
    2.2.1 使用自定义事件
      <!--selector-->
      <!-- 使用自定义事件 获取子组件传递的品牌信息 -->
      <SearchSelector
        :trademarkList="trademarkList"
        :attrsList="attrsList"
        @showTrademark="showTrademark"
      ></SearchSelector>
    
    2.2.2 searchSelector子组件中编写showTrademark自定义事件
      showTrademark(data){
        // 第二种方法使用自定义事件传递品牌信息
        this.$emit("showTrademark",data)
      }

    2.2.3 methods方法中编写showTrademark执行方法 （在search组件中重新向服务器发送请求）
       显示品牌面包屑
        showTrademark(data){
          this.searchParams.trademark=data.tmId+":"+data.tmName
          // 重新向服务器发请求
          this.getData()
          this.searchParams.trademark=data.tmName
        }
      
    2.2.4 删除品牌信息面包屑
        removeTrademark(){
          this.searchParams.trademark=undefined;
          this.getData()
        }
