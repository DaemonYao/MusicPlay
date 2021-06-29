<template>
  <div>
    <swiper></swiper>
    推荐歌单
    <m-tuilist></m-tuilist>
    推荐歌曲
  <tui-music></tui-music>
    推荐歌手
    <tui-song></tui-song>
  </div>
</template>

<script>
import MTuilist from "./main/MTuilist.vue";
import tuiMusic from './main/tuiMusic';
import TuiSong from './main/tuiSong.vue';
import Swiper from "../../../compontStar/Swiper/swiper.vue";
export default {
  components: { MTuilist, Swiper,TuiSong ,tuiMusic },
  name: "MFmusic",
};
</script>

<style lang="scss"></style>
