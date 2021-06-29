<template>
  <div class="SongHot">
    <div class="SongHot-up">
      <div class="content">
        <img :src="songTitle.cover" alt="" />
        <p class="p1">{{ songTitle.name }}</p>
        <i>关注他+</i>
      </div>
      <div class="p2">
        {{ songTitle.briefDesc }}
      </div>
      <div class="MusicNumber">
        <div>
          <p>歌曲数</p>
          <p>{{ songTitle.musicSize }}</p>
        </div>
        <div>
          <p>专辑数</p>
          <p>{{ songTitle.albumSize }}</p>
        </div>
        <div>
          <p>MV数</p>
          <p>{{ songTitle.mvSize }}</p>
        </div>
      </div>
      <div class="bottom-img"></div>
    </div>
    <div class="SongHot-down">
      <get-song-list :listMuisID="songMuiscID" :listMuisVlau="SonTableValue" :MusicWeight="340" :SongWeight="300" :tableIcon="180" :TimeWeight="180"></get-song-list>
    </div>
  </div>
</template>

<script>
import GetSongList from '../../../../compontStar/getSongList/getSongList.vue';

import {
  GetSongData,
  GetSongHotMusic,
  GetMusicDetail,
} from "../../../../MusicEvent/API/server";
export default {
  components: {  GetSongList },
  name: "SongHot",
  data() {
    return {
      tableVaule: [],
      songID: this.$route.params.id,
      songValue: "", //歌手详情
      songMuiscID: [], //歌手的热门30首歌曲ID
      songTitle: "", //存放歌手姓名头像等信息
      MusicInoc: false,
      nowItemUrl: "",
      getALLMusic: "",
      listMuisID: "",
      showPlayBar: false,
      loading: true,
      SonTableValue:[],//存放要给子组件的音乐详情信息
    };
  },
  mounted() {
    this.GetSongDataValue();
    this.GetSongHot();
  },
  computed: {
   
  },
  methods: {
    async GetSongDataValue() {
      //获取歌手的详情信息
      try {
        let value = await GetSongData(this.songID);
        this.songValue = value.data.data;
        this.songTitle = value.data.data.artist;
      } catch (err) {
        console.log("················数据获取错误············");
        console.log("err:", err);
      }
    },
    async GetSongHot() {
      //获取歌手热门30首歌曲
      try {
        let value = await GetSongHotMusic(this.songID);
        value.data.songs.forEach((element,index) => {
          if(index>30) return;
          this.songMuiscID.push(element.id);
          this.getSongListVlau(element.id)
        });
      } catch (err) {
        console.log("········出现错误·········");
        console.log("err:", err);
      }
      this.getSongListVlau();
    },
   
    async getSongListVlau(valu) {
      //获取30首歌曲的详情信息
      try {
          let value = await GetMusicDetail(valu);
          this.SonTableValue.push(value.data.songs[0]);
      } catch (err) {
        console.log("················数据获取错误············");
        console.log("err:", err);
      }
      console.log(this.SonTableValue);
    },

   
  },
};
</script>

<style lang="scss" scoped>
.SongHot-up {
  width: 100%;
  background-image: url("../../../../assets/top-bg.jpg");
  & .content {
    margin: 0 auto;
    width: 500px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    & .p1 {
      line-height: 30px;
      font-weight: 900;
      color: rgb(241, 241, 241);
    }
    & i {
      font-size: 12px;
      color: rgb(241, 241, 241);
      line-height: 30px;
      text-align: center;
      width: 90px;
      height: 30px;
      border: 1px white solid;
      border-radius: 19px;
      cursor: pointer;
    }
  }
  & .p2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 500;
    font-size: 14px;
    margin: 0 360px;
    margin-top: -30px;
    color: white;
  }
  & .MusicNumber {
    width: 400px;
    height: 100px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & div {
      & p {
        text-align: center;
        line-height: 11px;
        font-weight: 500;
        color: white;
      }
    }
  }
  & .bottom-img {
    width: 100%;
    height: 137px;
    background-image: url("../../../../assets/arrow-lr.png");
    background-position: center;
  }
}
.SongHot-down {
  margin-top: 30px;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
}
.el-icon-headset {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
</style>
