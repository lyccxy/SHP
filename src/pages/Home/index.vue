<template>
  <div>
    <!-- 三级联动全局组件 ：三级联动已经注册为全局组件，因此不需要再引入 -->
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank/>
    <Like/>
    <Floor v-for="floor of floorList" :key="floor.id" :floor="floor"/>
    <Brand/>
  </div>
</template>

<script>
// 引入其余组件
import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
import { mapState } from "vuex";
export default {
  name:'Home',
  computed: {
    ...mapState("home", ["floorList"]),
  },
  components:{
    ListContainer,
    TodayRecommend,
    Rank,
    Brand,
    Like,
    Floor
  },
   mounted() {
    this.$store.dispatch("home/getFloorList");
  },
}
</script>

<style>

</style>