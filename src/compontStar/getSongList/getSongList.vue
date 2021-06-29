<template>
  <!-- 这个组件是将接受到的音乐以表格的形式列出来 -->
  <div>
    <el-table
      stripe
      style="width: 100%"
      :data="listMuisVlau"
      v-loading="loading"
      @cell-click="TableIn"
    >
      <el-table-column label="序号" width="80" type="index"> </el-table-column>
      <el-table-column :width="tableIcon" type="index">
        <template slot-scope="scope" v-if="scope.row.id == MusicInoc">
          <div>
            <a href="#"><i class="el-icon-headset"></i></a>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="歌曲" :width="MusicWeight" height="30px">
        <template v-slot="scope">
          <div class="songName">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="歌手" :width="SongWeight">
        <template v-slot="scope">
          <div>{{ scope.row.ar[0].name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="专辑" :width="SpecilWeight">
        <template v-slot="scope">
          <div>{{ scope.row.al.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="时长" :width="TimeWeight">
        <template v-slot="scope">
          <div>{{ getTime(scope.row.dt) }}</div>
        </template>
      </el-table-column>
    </el-table>
    <music-play
      :songId="nowItemUrl"
      :songData="getALLMusic"
      @PlayIndex="getIndex"
      v-if="showPlayBar"
    ></music-play>
  </div>
</template>

<script>
import MusicPlay from "../MusicPlay/MusicPlay/MusicPlay.vue";
import { GetMusicDetail, GetMusicURL } from "../../MusicEvent/API/server.js";
export default {
  name: "getSongList",
  data() {
    return {
      songValue: [], //获取的音乐信息
      loading: true,
      tableVaule: [],
      MusicInoc: false,
      MusicDetailsURL: [], //存放所有音乐url
      MusicDetails: [], //所有ID查询音乐的详情,
      nowItemUrl: "", //获取当前点击音乐的url
      getALLMusic: "", //获取当前点击音乐的全部信息
      showPlayBar: false,
    };
  },
  props: {
    listMuisVlau:{},//查询出的所有音乐详情
    listMuisID: {}, //接受要存放到音乐列表中的音乐ID
    MusicWeight: {
      //歌曲栏长度
      type: Number,
      default: 240,
    },
    SongWeight: {
      //歌手栏长度
      type: Number,
      default: 200,
    },
    SpecilWeight: {
      //专辑栏长度
      type: Number,
      default: 180,
    },
    TimeWeight: {
      //歌曲栏长度
      type: Number,
      default: 80,
    },
    tableIcon: {
      //歌曲栏长度
      type: Number,
      default: 65,
    },
  },
  mounted() {
    // this.getMuiscData();
    this.getMuisDetails(this.listMuisID);
    this.updownData();
    this.loding();
  },
  components: { MusicPlay },
  computed: {
    getTime() {
      return function (value) {
        var time = value / 1000;
        var Minute = parseInt(time / 60);
        var Second = Math.round(time % 60);
        return `${Minute}:${Second}`;
      };
    },
  },
  methods: {
    // loading状态
    loding() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    //表格点击函数
    TableIn(row) {
      this.MusicInoc = row.id;
      this.getMuisUrl(row.id);
      this.showPlayBar = true;
    },

    // 这里下面的函数是用来控制音乐播放器的
    // 查询每日推荐音乐 用于提交给播放器
    async getMuisDetails(value) {
      try {
        for (let i = 0; i < value.length; i++) {
          let musicData = await GetMusicDetail(value[i]);
          let url = await GetMusicURL(value[i]);
          this.MusicDetailsURL.push(url.data.data[0].url);
          this.MusicDetails.push(musicData.data.songs);
        }
      } catch (err) {
        console.log("················数据获取错误············");
        console.log("err:", err);
      }
    },

    updownData() {
      //将音乐列表 音乐URL提交给Vuex
      this.$store.commit("OperateMusicPlayURL", this.MusicDetailsURL);
      this.$store.commit("OperateMusicPlayList", this.MusicDetails);
    },
    async getMuisUrl(value) {
      //用于获取当前点击的音乐，直接将其传送给音乐播放器
      try {
        let url = await GetMusicURL(value);
        this.nowItemUrl = url.data.data[0].url;
        let data = await GetMusicDetail(value);
        this.getALLMusic = data.data.songs;
      } catch (err) {
        console.log("················数据获取错误············");
        console.log("err:", err);
      }
    },
    // 获取当前播放音乐的位置用来改变音乐播放图标
    getIndex(value) {
      this.MusicInoc = this.listMuisID[value];
    },
  },
};
</script>

<style lang="scss" scoped>
.table-row {
  width: 100%;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: -webkit-box;
  white-space: nowrap !important;
  line-clamp: 1 !important;
}
.songName {
  width: 70%;
  overflow: hidden !important;
  display: -webkit-box;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.el-icon-headset {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
</style>
