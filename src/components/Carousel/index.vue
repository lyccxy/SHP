<template>
  <!--banner轮播-->
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel of list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引包
import Swiper from "swiper";
export default {
  name: "Carsousel",
  props:['list'],
  watch: {
    list: {
      // 无论数据是否有变化，第一次立即监听一次
      immediate: true,
      handler() {
        this.$nextTick(function () {
          // 当执行这个回调：保证服务器数据回来了，v-for执行完毕了【轮播图一定有数据了】
          var mySwiper = new Swiper(this.$refs.cur, {
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
        });
      },
    },
  },
};
</script>

<style>
</style>