<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派|事件委托 -->
      <div @mouseenter="enterShow" @mouseleave="leaveShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式导航进行路由跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(category, index) of categoryList"
                :key="category.categoryId"
                :class="{ cur: index == currentIndex }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="category.categoryName"
                    :data-category1Id="category.categoryId"
                    >{{ category.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="childs of category.categoryChild"
                    :key="childs.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="childs.categoryName"
                          :data-category2Id="childs.categoryId"
                          >{{ childs.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <!-- 一级 -->
                        <em
                          v-for="child of childs.categoryChild"
                          :key="child.categoryId"
                        >
                          <a
                            :data-categoryName="child.categoryName"
                            :data-category3Id="child.categoryId"
                            >{{ child.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入方式：是把lodash全部功能函数引入
// import _ from 'lodash';
// 引入方式：按需引入
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  computed: {
    // 第一种写法：数组形式
    // ...mapState('home',['categoryList'])
    // 第二种写法：对象形式
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  data() {
    return {
      // 存储用户鼠标移上那个索引
      currentIndex: -1,
      show: true,
    };
  },
  mounted() {
    // 当组件挂载完毕，让show属性变成false
    // 如果不是Home路由组件，将typeNav进行隐藏
    if (this.$route.name != "home") {
      this.show = false;
    }
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex
    changeIndex: throttle(function (index) {
      // index：鼠标以上某一个一级的元素的索引值
      // 正常情况（用户慢慢的操作）：鼠标进入，每一个一次分类h3,都会触发鼠标进入时间
      // 非正常情况（用户操作过快）：本身全部的一级分类都应该触发鼠标事件，但是经过测试，只有部分h3出发了
      // 就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能出现卡顿现象
      this.currentIndex = index;
    }, 50),
    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的解决方法 使用编程式导航 + 事件委派
      // 利用事件委派存在一些问题 ：

      // 1、怎么确定点击的一定是A标签：
      // 解决：把子节点当中a标签，加上自定义属性data-categoryName，其他子节点是没有
      // 获取到当前触发这个事件的节点【h3、a、dt、dl】，需要带有data-categoryname这样节点【一定是a标签】
      let element = event.target;
      // 节点有一个属性dataset属性，可以获取节点自定义属性与属性值
      //let categoryname= event.target.dataset.categoryname
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      // 如果标签身上拥有categoryname肯定是A标签
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 2、如何确定是一级、二级、三级 A标签 如何获取参数【1、2、3级分类的产品的名字、ID】：
        // 解决：把子节点当中a标签，加上自定义属性data-category1Id,data-category2Id，data-category3Id 通过event.target.dataset判断
        if (category1id) {
          //整理路由跳转的参数
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 整理完参数
        // 判断：如果路由跳转的时候，带有params参数，需要一起传递过去
        if(this.$route.params){
          location.params=this.$route.params
        }
        location.query = query;
        this.$router.push(location);
      }
    },
    enterShow() {
      //如果当前路由不是Home组件
      if (this.$route.name != "home") {
        this.show = !this.show;
      }
    },
    leaveShow() {
      //如果当前路由不是Home组件
      if (this.$route.name != "home") {
        this.show = !this.show;
      }
      this.currentIndex = -1;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .cur {
          background-color: skyblue;
        }
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
            }
          }
          // :hover{
          //         background: skyblue;
          //     }
          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //   &:hover {
          //     .item-list {
          //       display: block;
          //     }
          //   }
        }
      }
    }
    // 过度动画的样式
    // 过度动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }
    // 过度动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
      // 旋转360度
      // transform: rotate(360de);
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>