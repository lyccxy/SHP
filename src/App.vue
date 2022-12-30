<template>
  <div class="outer">
    <Header />
    <router-view></router-view>
    <!-- 在Home、Search下显示，在登录、注册隐藏 -->
    <Footer v-show="this.$route.meta.show" />
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
    //派发acation 获取商品分类的三级列表的数据
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style>
</style>