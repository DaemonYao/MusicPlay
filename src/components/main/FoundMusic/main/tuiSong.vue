<template>
  <div class="tuiSong">
    <el-row :gutter="20">
      <el-col :span="3" v-for="(item, i) in SongDate" :key="i">
        <router-link :to="{ name: 'SongHot', params: { id: item.id } }">
          <div class="tuiSong-content">
            <img :src="item.img1v1Url" alt="" />
            <p>{{ item.name }}</p>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  GetEveryDaySong,
  
} from "../../../../MusicEvent/API/server";
export default {
  name: "tuiSong",
  data() {
    return {
      SongDate: "",
    };
  },
  mounted() {
    this.GetSong();
  },
  methods: {
    async GetSong() {
      try {
        let value = await GetEveryDaySong();
        this.SongDate = value.data.artists;
      } catch (err) {
        console.log("················数据获取错误············");
        console.log("err:", err);
      }
    },
  },
};
</script>

<style lang="scss" scope>
.tuiSong-content {
  width: 100px;
  height: 120px;
  & img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  & p {
    line-height: 5px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
