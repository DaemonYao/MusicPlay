<!-- 使用音乐播放器需要
    1.this.$store.commit("OperateMusicPlayURL", this.MusicDetailsURL);//该歌单中所有URL
    2. this.$store.commit("OperateMusicPlayList", this.MusicDetails);//该歌单中所有数据内容
    3. let musicData = await GetMusicDetail(value[i]);  所有数据请求  let url = await GetMusicURL(value[i]); url请求
    4.需要单独播放的时候要将 url取出 给songID  音乐内容给songData 内容只要 要用song中的干净的
    5.PlayIndex()事件用来获取左右切换音乐位置
 -->
<template>
  <div class="m-musicplay">
    <!-- 音乐播放标签 -->
    <audio
      :src="Muiscurl"
      type="audio/mp3"
      ref="maudio"
      @timeupdate="watchMusicTime"
      muted="muted"
      @ended="MusicEnd"
      loop="loop"
    ></audio>
    <div class="m-musicplay_conter">
      <div class="left">
        <div class="one" @click="Up">
          <i class="iconfont icon-shangyishouweidianji"></i>
        </div>
        <div class="two" @click="playStar"><i :class="[playIcon]"></i></div>
        <div class="three" @click="Down">
          <i class="iconfont icon-xiayishouweidianji"></i>
        </div>
      </div>
      <!-- 存放中间显示区域 -->
      <div class="conter">
        <img :src="MusicImg " alt="" />

        <div class="info">
          <div class="conter-up">
            <h4>{{ MusicName }}</h4>
            <p>{{ Minute }}:{{ Second }}</p>
          </div>
          <!-- 进度条 -->
          <div class="conter-down">
            <span class="demonstration"></span>
            <el-slider
              v-model="MusiPlan"
              @change="getProgressValue"
              @mousedown.native="ProgressDrag = true"
              @mouseup.native="ProgressDrag = false"
            ></el-slider>
          </div>
        </div>
      </div>
      <!-- 右边音乐播放区域 -->
      <div class="right">
        <div class="right_letf">
          <i :class="[voiceIcon]" id="voice"></i>
          <!-- 音量进度条 -->
          <div class="right_letf-content">
            <span class="demonstration"></span>
            <el-slider v-model="PlanVoice" @change="voice"></el-slider>
          </div>
        </div>
        <div class="right_right">
          <i :class="[Musicloop]" @click="MusicLoop"></i>
          <i class="iconfont icon-geciweidianji"></i>
          <i class="iconfont icon-ai-list"></i>
        </div>
      </div>
    </div>
    <!-- 关闭界面 -->
    <div class="close" @click="close"><i class="el-icon-close"></i></div>
  </div>
</template>

<script>
export default {
  name: "MusicPlay",
  data() {
    return {
      // globel:false,//控制显示隐藏
      AudioEvent: "", //存放audio元素标签
      play: false, //播放按钮控制
      MusiPlan: 0, //音乐进度条
      PlanVoice: 50, //控制音量进度条
      audio: this.$refs.audio,
      Second: "00", //获取音乐播放秒数
      Minute: "00", //获取音乐播放分钟
      AllMusicTime: "", //播放的音乐总时间
      musicNowTime: "", //存储音乐当前播放时间
      ProgressDrag: false, //控制进度条拖动屏蔽进度条实时更新
      VoiceI: true, //判断音乐图标
      loop: false, //音乐循环播放
      fatherMusicIndex: null, //标记播放位置
      Muiscurl: "", //存放播放音乐的url
      Muiscdata: "", //存放播放音乐的数据
      MusicImg: this.songData, //存放音乐照片
      MusicName: this.songData, //音乐名字
    };
  },
  props: {
    songData: {
      //当前用户点击音乐数据
    },
    songId: {
      //当前用户点击音乐URL
      type: String,
    },
  },
  computed: {
    playIcon() {
      if (this.play) {
        return "el-icon-video-pause";
      } else {
        return "el-icon-video-play";
      }
    },
    // 判断音乐图标
    voiceIcon() {
      if (this.VoiceI) {
        return "el-icon-headset";
      } else {
        return "el-icon-close-notification";
      }
    },
    // 音乐循环播放
    Musicloop() {
      if (this.loop == false) {
        return "el-icon-sort";
      } else {
        return "el-icon-refresh";
      }
    },
  },
  methods: {
    // 获取音乐元素标签
    getAudioHtml() {
      this.AudioEvent = document.querySelector("audio");
      document.querySelector("audio").volume = this.PlanVoice / 100;
    },
    // 音乐播放函数
    Play() {
      this.AudioEvent.play();
    },
    // 音乐暂停函数
    Stop() {
      this.AudioEvent.pause();
    },
    // 音乐播放
    playStar() {
      this.play = !this.play;
      this.play ? this.Play() : this.Stop();
    },
    // 音乐的播放进度时间 时间动态显示
    MusicProgressTime(time) {
      // 分钟
      this.Minute = parseInt(time / 60);
      if (this.Minute < 10) {
        this.Minute = "0" + this.Minute;
      }
      // 秒数
      this.Second = Math.round(time % 60);
      if (this.Second < 10) {
        this.Second = "0" + this.Second;
      }
    },
    watchMusicTime(e) {
      var time = Math.round(e.target.currentTime * 100) / 100; //音乐当前秒数
      this.AllMusicTime = Math.round(this.AudioEvent.duration); //获取音乐全部时间
      this.MusicProgressTime(time);
      this.MusicProgress(time);
    },
    // 获取进度条的值 在这里进行了拖拽鼠标的操作
    getProgressValue(value) {
      this.AudioEvent.currentTime = (this.AllMusicTime / 100) * value;
    },
    // 进度条事件
    MusicProgress(time) {
      if (this.AllMusicTime == "" || this.ProgressDrag == true) return;
      let prog = Number(((time / this.AllMusicTime) * 100).toFixed(2));
      this.MusiPlan = Math.floor(prog);
    },
    // 控制音量
    voice(value) {
      this.AudioEvent.volume = value / 100;
      if (value / 100 == 0.0) {
        this.VoiceI = false;
      } else {
        this.VoiceI = true;
      }
    },
    // 音乐播放结束
    MusicEnd() {
      this.play = false;
      this.MusiPlan = 0;
    },
    // 音乐循环播放
    MusicLoop() {
      this.loop = !this.loop;
    },
    //遍历出当前音乐在播放列表中的位置
    traverseMusicList() {
      this.$store.state.MusicPlayURL.forEach((element, index) => {
        if (element == this.songId) {
          this.fatherMusicIndex = index;
        }
      });
    },
    //在这里将播放时间，照片，都取出来，以免报错 这个函数的作用是将事先存放到Vuex中的数据取出来放到页面中  这个是给上下切换用的
    getVuex(value1) {
      let url = this.$store.state.MusicPlayURL;
      let data = this.$store.state.MusicPlayList;
      this.Muiscurl = url[value1];
      this.Muiscdata = data[value1][0];
      this.MusicImg = data[value1][0].al.picUrl;
      this.MusicName = data[value1][0].name;
    },
    // 切换上一首歌曲
    Up() {
      this.MusiPlan = 0;
      this.Play();
      this.play = false;
      if (this.fatherMusicIndex == undefined) {
        //使用单个搜索音乐播放的时候没有上下切换
        // 显示警告的操作
        this.$message({
          message: "这里不允许左右切换哦",
          type: "warning",
        });
        return;
      }
      if (this.fatherMusicIndex < 0) {
        this.fatherMusicIndex = this.$store.state.MusicPlayURL.length - 1;
      }
      this.fatherMusicIndex--;
      this.getVuex(this.fatherMusicIndex);
      this.upIndex()
    },
    // 切换下一首歌曲
    Down() {
      this.MusiPlan = 0;
      this.Play();
      this.play = false;
      if (this.fatherMusicIndex == undefined) {
        //使用单个搜索音乐播放的时候没有上下切换
        // 显示警告的操作
        this.$message({
          message: "这里不允许左右切换哦",
          type: "warning",
        });
        return;
      }
      if (this.fatherMusicIndex > this.$store.state.MusicPlayURL.length - 1) {
        this.fatherMusicIndex = 0;
      }
      this.fatherMusicIndex++;
      this.getVuex(this.fatherMusicIndex);
      this.upIndex()
    },
    // 向父组件中传当前播放音乐坐标，告诉父组件中播放图标的位置
    upIndex(){
      this.$emit('PlayIndex',this.fatherMusicIndex)
    },
    // 控制显示隐藏
    close(){
      this.globel = false;
    }
  },
  watch: {
    songId(newValue) {
      this.Muiscurl = newValue;
      this.traverseMusicList();
      this.getVuex(this.fatherMusicIndex);
    },
  },
  // 在DOM初始化进行获取audio元素的标签
  mounted() {
    this.getAudioHtml();
  },
};
</script>

<style lang="scss">
.m-musicplay {
  width: 100%;
  height: 72px;
  position: fixed;
  left: 0px;
  bottom: 0px;
  background-color: rgba($color: #ffffff, $alpha: 0.9);
  z-index: 100;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
// 中间内容区
.m-musicplay_conter {
  min-width: 1000px;
  display: flex;
  width: 1280px;
  flex-direction: row;
  // 暂停 左右切换按钮
  & .left {
    width: 156px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & .one {
      width: 30px;
      height: 30px;
      font-size: 25px;
      font-weight: bold;
      cursor: pointer;
      color: #d63031;
      & i {
        font-size: 15px;
      }
    }
    & .two {
      width: 50px;
      height: 50px;
      margin-right: 15px;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      font-size: 50px;
      color: #d63031;
    }
    & .three {
      width: 30px;
      height: 30px;
      font-size: 25px;
      font-weight: bold;
      cursor: pointer;
      color: #d63031;
      & i {
        font-size: 15px;
      }
    }
  }
  // 音量调节 歌词
  & .right {
    display: flex;
    flex-direction: row;
    width: 356px;
    height: 100%;
    & .right_letf {
      padding-left: 30px;
      height: 100%;
      width: 182px;
      & .right_letf-content {
        margin-left: 40px;
        z-index: 10;
        & .el-slider__runway {
          width: 70% !important;
          top: 20px;
        }
      }
    }

    & .right_right {
      height: 100%;
      width: 182px;
      display: flex;
      align-items: center;
      font-size: 25px;
      & i {
        font-size: 20px;
        margin-left: 27px;
        cursor: pointer;
      }
    }
  }
  // 歌词 歌曲头像 音乐进度条
  & .conter {
    display: flex;
    flex-direction: row;
    width: 768px;
    & img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      margin-top: 5px;
    }
    & .info {
      margin-left: 10px;
      width: 100%;
      & .conter-up {
        display: flex;
        flex-direction: row;
        line-height: 7px;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
//element UIh中音乐进度条
.el-slider__bar {
  height: 3px !important;
  background-color: #fa2800 !important;
}
.el-slider__runway {
  height: 3px !important;
}
.el-slider__button {
  width: 8px !important;
  height: 8px !important;
  border-color: #fa2800 !important;
}
// 图标样式修改区域
#voice {
  position: absolute;
  top: 27px;
  font-size: 20px;
  font-weight: bold;
}
// 关闭播放器
.close{
  z-index: 200;
  position: absolute;
  width: 10px;
  height: 10px;
  color: black;
  left: 98%;
  top: 2px;
  cursor: pointer;
}
</style>
