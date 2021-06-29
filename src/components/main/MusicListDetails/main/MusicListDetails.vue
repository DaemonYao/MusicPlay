<template>
  <!-- 只存热门推荐歌单标签 -->
  <div class="MusicListDetails">
    <div class="MusicListDetails-contant">
      <ul class="MusicListDetails-ul">
        <li>热门标签：</li>
        <li
          v-for="(item, i) in title"
          :key="i"
          @click="ListTitle(item)"
          :class="liText(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- 存放音乐播放列表组件 -->
    <div class="MusicListDetails-maddle">
      <div
        v-if="index"
        v-loading="index"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.1)"
        class="index"
      >
      </div>
      <songlist v-if="!index" :songListData="pagerValue[page]"></songlist>
    </div>
    <!-- 存放分页符 -->
    <div class="MusicListDetails-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="30"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { GetMusicListTitle } from "@/MusicEvent/API/server.js";
import Songlist from "../second/Songlist.vue";
export default {
  components: { Songlist },
  name: "MusicListDetails",
  data() {
    return {
      title: [
        "全部",
        "华语",
        "流行",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "综艺",
        "影视原声",
        "ACG",
      ],
      clickValue: "全部",
      songListAllValue: [], //存放所有数据
      pagerValue: [], //将数据分页存储起来
      page: 0, //页数
      index: '',
    };
  },
  mounted() {
    this.get(this.clickValue);
    this.time();
  },
  computed: {
    liText() {
      return function (value) {
        if (this.clickValue == value) return "color";
      };
    },
  },
  methods: {
    ListTitle(value) {
      this.clickValue = value;
      this.get(value);
      this.time()
    },
    async get(valu) {
      try {
        let value = await GetMusicListTitle(valu, 200);
        this.songListAllValue = value.data.playlists;
        this.pagerValue[0] = this.songListAllValue.slice(0, 39);
        this.pagerValue[1] = this.songListAllValue.slice(39, 79);
        this.pagerValue[2] = this.songListAllValue.slice(79, 100);
      } catch (err) {
        console.log("···········请求出现错误···········");
        console.log("err:", err);
      }
    },

    handleCurrentChange(value) {
      this.time()
      this.page = value - 1;
    },
    time() {
      this.index = true
      const that = this;
      setTimeout(function () {
        that.index = false;
      }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped>
.MusicListDetails {
  margin-top: -20px;
  width: 100%;
  & .MusicListDetails-contant {
    width: 100%;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 5px;
    & .MusicListDetails-ul {
      height: 40px;
      width: 50%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      & li:not(:first-child) {
        cursor: pointer;
      }
      & li:not(:first-child):hover {
        color: red;
      }
      & li:nth-of-type(1) {
        font-weight: 900;
        color: red;
      }
    }
  }
  & .MusicListDetails-maddle {
    width: 100%;
    & .index {
      width: 100%;
      height: 600px;
      background-color: rgba($color: #ffffff, $alpha: 0);
    }
    margin-bottom: 20px;
  }
  & .MusicListDetails-pagination {
    margin-left: 40%;
  }
}
.color {
  color: red !important;
}
.el-icon-loading{
  font-size: 30px !important;
}
</style>
