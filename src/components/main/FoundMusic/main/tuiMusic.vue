<template>
  <!-- 主界面中推荐音乐 -->
  <div>
    <el-row :gutter="20">
      <el-col :span="12" v-for="(item, i) in Music" :key="i">
        <div class="tuiMusic" @click="getPlayMusic(item, i)">
          <div class="tuiMusic_img">
            <img :src="item.picUrl" />
          </div>
          <div class="tuiMusic_content">
            <p class="tuiMusic_content_music">{{ item.name }}</p>
            <p class="tuiMusic_content_name">{{ item.song.album.name }}</p>
          </div>
          <div class="tuiMusic_time">
            <i class="iconfont icon-yinle" v-if="index == i"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 这里是调用音乐播放器 -->
    <div>
      <music-play  :songData="getAllId[0]" :songId="nowItemUrl"  @PlayIndex="getIndex" v-if="value"></music-play>
    </div>
  </div>
</template>

<script>
import MusicPlay from '../../../../compontStar/MusicPlay/MusicPlay/MusicPlay.vue';
import {
  EveryDayMusic,
  GetMusicDetail,
  GetMusicURL,
} from "../../../../MusicEvent/API/server";
export default {
  components: { MusicPlay },
  name: "tuiMusic",
  data() {
    return {
      Music: null,
      playMusicID: [],
      getAllId:'', //当前播放音乐的所有信息
      nowItemUrl: null, //当前播放音乐URL
      getNowId: [],
      value: false,
      MusicDetailsURL: [], //存放所有音乐url
      MusicDetails: [], //所有ID查询音乐的详情,
      index:"",
      showValue:''
    };
  },
  mounted() {
    this.EveryDay();
    this.updownData();
  },
  computed: {},
  methods: {
    async EveryDay() {
      //获取每日推荐音乐
      try {
        let list = await EveryDayMusic();
        if (list.data.code == 200) {
          this.Music = list.data.result;
          this.Music.forEach((element) => {
            this.playMusicID.push(element.id);
          });
        }
      } catch (err) {
        console.log("···········获取后台数据出现错误···········");
        console.log(err);
      }
      this.getMuisDetails(this.playMusicID);
    },
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

    updownData() {  //将音乐列表 音乐URL提交给Vuex
      this.$store.commit("OperateMusicPlayURL", this.MusicDetailsURL);
      this.$store.commit("OperateMusicPlayList", this.MusicDetails);
    },
    getPlayMusic(item, i) {
      this.playMusicID = i;
      this.index = i;
      this.value = true;
      this.getMuisUrl(item.id);
    },
     async getMuisUrl(value) {  //用于获取当前点击的音乐，直接将其传送给音乐播放器
      try {
        let url = await GetMusicURL(value);
        this.nowItemUrl = url.data.data[0].url;
        let data = await GetMusicDetail(value);
        this.getAllId = data.data.songs;
      } catch (err) {
        console.log("················数据获取错误············");
        console.log("err:", err);
      }
    },
    //获取子组件中切换音乐 来改变 播放图标
    getIndex(value){
        this.index = value;
    }
  },
  watch: {},
};
</script>

<style lang="scss" scope>
// 旋转动画
@keyframes rotate {
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg); /* IE 9 */
    -moz-transform: rotate(0deg); /* Firefox */
    -o-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg); /* IE 9 */
    -moz-transform: rotate(360deg); /* Firefox */
    -o-transform: rotate(360deg);
  }
}

@-webkit-keyframes rotate {
  0% {
    -moz-transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
  }
}

.tuiMusic {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 5px;
  padding: 10px 10px;
  cursor: pointer;
  & .tuiMusic_img {
    width: 70px;
    height: 70px;
    & img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  & .tuiMusic_content {
    width: 340px;
    height: 70px;
    padding-left: 10px;
    & :first-child {
      font-size: 14px;
      font-weight: bold;
    }
    & :nth-child(2) {
      font-size: 10px;
    }
  }
  & .tuiMusic_time {
    height: 70px;
    width: 200px;
    & i {
      margin-left: 160px;
      font-size: 40px;
      display: inline-block;
      animation: rotate 10s linear infinite; //音乐动画
    }
  }
}
</style>
