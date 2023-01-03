<template>
  <div class="outer">
    <Header />
    <router-view></router-view>
    <!-- 在Home、Search下显示，在登录、注册隐藏 -->
<<<<<<< HEAD
    <Footer v-show="this.$route.meta.show" />
=======
    <Footer v-show="this.$route.meta.show"/>
>>>>>>> c88172b30c69a1c93f8647f2fa0cbbe9a1924fa9
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
  name: "App",

  components: {
    Header,
    Footer,
  },
  mounted() {
<<<<<<< HEAD
    //派发acation 获取商品分类的三级列表的数据
    this.$store.dispatch("home/categoryList");
  },
};
=======
    //派发acation 获取商品分类的三级列表的数据 
    this.$store.dispatch('home/categoryList')
  },
}
>>>>>>> c88172b30c69a1c93f8647f2fa0cbbe9a1924fa9
</script>

<style>
</style>