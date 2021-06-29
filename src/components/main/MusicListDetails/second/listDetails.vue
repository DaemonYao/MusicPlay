<template>
  <!-- 这个界面存放主界面推荐音乐的详情界面 -->
  <div class="tuiList">
    <el-row :gutter="30">
      <el-col :span="16" class="newCol">
        <div class="tuiList-left">
          <div class="tuiList-left_up">
            <img :src="Data.playlist.coverImgUrl || ''" alt="" />
            <div class="title">
              <h3>{{ Data.playlist.name }}</h3>
              <div>
                标签：
                <el-button
                  type="danger"
                  round
                  size="mini"
                  v-for="(item, i) in title"
                  :key="i"
                  >{{ item }}</el-button
                >
              </div>
              <p class="p">
                {{ titleText }}
              </p>
              <i @click="prompt">全部 >> </i>
            </div>
          </div>
        </div>
        <div class="tuiList-leftDonw">
          <get-song-list :listMuisID="SongID" :listMuisVlau="SonTableValue"></get-song-list>
        </div>
      </el-col>
      <el-col :span="8" class="newCol">
        <div class="tuiList-right">
          <div class="LoveSongList">
            <p><i class="el-icon-grape"></i> 喜欢这个歌单的人</p>
            <div class="LoveSongListImg">
              <ul>
                <li v-for="(item, i) in LoveSongList" :key="i">
                  <img :src="item.avatarUrl" alt="" />
                </li>
              </ul>
            </div>
          </div>
          <div class="tuiList">
            <p><i class="el-icon-sunny"></i>相关推荐</p>
            <div class="tuiList-contant" v-for="(item,i) in tuiList" :key="i">
              <img :src="item.coverImgUrl" alt="">
              <div>
                <p>{{item.name}}</p>
                <p class="autor">{{item.creator.nickname}}</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GetSongList from "../../../../compontStar/getSongList/getSongList";
import {
  GettuiListDetail,
  LoveSongListData,
  SimilarSongList,
  GetMusicDetail
} from "../../../../MusicEvent/API/server";
export default {
  components: { GetSongList },
  name: "listDetails",
  data() {
    return {
      songListID: this.$route.params.id, //存放用于查询歌单详情的ID
      Data: "", //存放获取的内容
      title: "", //标签标题
      titleText: "",
      SongID: [], //获取播放列表中音乐信息
      LoveSongList: "", //喜欢这个歌单的人
      tuiList: "", //相关推荐
      SonTableValue:[],//需要向子组件中传递的音乐详情数据
    };
  },
  mounted() {
    this.GetMusicListValue();
    this.LoveSong();
    this.SimilarSong();
  },
  methods: {
    // 获取歌单内容详情
    async GetMusicListValue() {
      var arr = []
      try {
        let value = await GettuiListDetail(this.songListID);
        this.Data = value.data;
        this.title = value.data.playlist.tags;
        this.titleText = value.data.playlist.description;
        value.data.playlist.trackIds.forEach((element,index) => {
          if(index>30) return;
         arr.push(element.id);
         this.GetMuiscValue(element.id)
        });
      } catch (err) {
        console.log("··········调用出错了··············");
        console.log("err:", err);
      }
       this.SongID =  arr.slice(0,29);
    },
    // 获取喜欢这个歌单的人数
    async LoveSong() {
      try {
        let data = await LoveSongListData(this.songListID);
        this.LoveSongList = data.data.subscribers;
      } catch (err) {
        console.log("··········调用出错了··············");
        console.log("err:", err);
      }
    },
    // 推荐相似歌单
    async SimilarSong() {
      try {
        let data = await SimilarSongList(this.songListID);
        this.tuiList = data.data.playlists;
      } catch (err) {
        console.log("··········调用出错了··············");
        console.log("err:", err);
      }
    },
    // 查找音乐的详情
    async GetMuiscValue(valu){
        try{
            let value = await GetMusicDetail(valu);
            this.SonTableValue.push(value.data.songs[0]);
        }catch(err){
          console.log("·············数据请求出现问题···········");
          console.log("err-->",err);
        }
    },
    //消息提示框
    prompt() {
      this.$alert(this.titleText, {
        confirmButtonText: "确定",
      });
    },
  },
};
</script>

<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.tuiList-left {
  & .tuiList-left_up {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 300px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    & img {
      margin-top: 15px;
      margin-left: 15px;
      width: 200px;
      height: 200px;
      border-radius: 5px;
      box-shadow: 7px 7px 1px 1px rgba(0, 0, 0, 0.2);
    }
    & .title {
      width: 100%;
      margin-left: 43px;
      margin-right: 130px;
      & h3 {
        line-height: 20px;
        // text-align: center;
      }
      & div {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      & .p {
        line-height: 25px;
        color: #414141;
        margin-right: 20px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      & i {
        color: red;
        cursor: pointer;
      }
    }
  }
}

// 歌曲列表
.tuiList-leftDonw {
  width: 100%;

  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  margin-top: 30px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

// 右边的内容
.tuiList-right {
  & .LoveSongList {
    width: 100%;
    height: 300px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    padding-top: 0.5px;
    padding-left: 10px;
    & .LoveSongListImg {
      & ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
        padding: 0;
        & li {
          width: 45px;
          height: 45px;
          padding: 0 5px 10px;
          & img{
            width: 100%;
            height: 100%;
            border-radius: 4px;
          }
        }
      }
    }
    & p {
      font-weight: 900;
    }
  }
  & .tuiList {
    padding-left: 10px;
    padding-top: 0.5px;
    margin-top: 30px;
    width: 100%;
    height: 400px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
     & p{
      font-weight: 900;
    }
    & .tuiList-contant{
      margin-top: 8px;
        display: flex;
        flex-direction: row;
        & img{
           width: 55px;
          height: 55px;
          border-radius: 4px;
        }
        & div{
          margin-left: 20px;
           & p{
              line-height: 7px;
           }
           & .autor{
             color: #9e9e9e;
             font-size: 14px;
             font-weight: 100;
           }
        }
    }
  }
}

// 修改element样式
.newCol {
  margin-top: 0 !important;
}
.button {
  width: 15px !important;
  height: 15px !important;
  color: white !important;
}
.el-icon-grape {
  color: red;
  font-size: 17px;
  font-weight: 600;
}
.el-icon-sunny{
color: red;
  font-size: 17px;
  font-weight: 600;
  margin-right: 5px;
}
.LoveSong {
  margin-left: 0px !important;
  margin-right: 0px !important;
  margin-top: 5px !important;
  margin-bottom: 5px !important;
}
</style>
