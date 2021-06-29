<template>
<!-- 这个是主界面中推荐歌单 -->
  <div class="m-tuiList">
    <el-row :gutter="25">
      <el-col :span="3" v-for="(item, i) in song" :key="i">
        <router-link :to="{ name: 'foundMusic', params: { id: item.id } }">
          <div class="m-tuiList_img">
            <img :src="item.picUrl" alt="" >
            <p>{{item.name}}</p>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { TuijianSongList } from "../../../../MusicEvent/API/server";

export default {
  name: "MTuilist",
  mounted() {
    this.SongList();
  },
  data() {
    return {
      song: [],
    };
  },
  methods: {
    async SongList() {
      try {
        let list = await TuijianSongList();
        if (list.data.code == 200) {
          this.song = list.data.result;
        }
      } catch (err) {
        console.log("···········获取后台数据出现错误···········");
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scope>
.m-tuiList{
  margin-bottom: 60px;
}
.m-tuiList_img {
  width: 123px;
  height: 123px;
  box-shadow: 5px 5px 2px 1px rgba(32, 31, 31, 0.2);
  margin-bottom: 20px;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  & p {
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.el-col {
  margin-top: 24px;
  margin-bottom: 24px;
}
</style>
