<template>
  <div class="MusicSong">
    <div class="MusicSong-one">
      <ul class="MusicSong-one_ul">
        <li>歌手类型：</li>
        <li
          v-for="(item, i) in WordSong"
          :key="i"
          :class="liText(item.word)"
          @click="getWord(item.word, item.id)"
        >
          {{ item.word }}
        </li>
      </ul>
    </div>
    <div class="MusicSong-two">
      <ul class="MusicSong-two_ul">
        <li>歌手分类：</li>
        <li
          v-for="(item, i) in Sex"
          :key="i"
          :class="SongSex(item.name)"
          @click="getSex(item.name, item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="MusicSong-three">
      <div
        v-if="index"
        v-loading="index"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.1)"
        class="index"
      ></div>
      <el-row :gutter="20">
        <el-col :span="3" v-for="(item, i) in SongDate" :key="i">
          <router-link :to="{ name: 'SongHot', params: { id: item.id } }">
            <div class="MusicSong-three-content">
              <img :src="item.img1v1Url" alt="" />
              <p>{{ item.name }}</p>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { MianSong } from "../../../MusicEvent/API/server";
export default {
  name: "MusicSong",
  data() {
    return {
      WordSong: [
        {
          word: "全部",
          id: -1,
        },
        {
          word: "华语",
          id: 7,
        },
        {
          word: "欧美",
          id: 96,
        },
        {
          word: "日本",
          id: 8,
        },
        {
          word: "韩国",
          id: 16,
        },
        {
          word: "其他",
          id: 0,
        },
      ],
      Sex: [
        {
          name: "全部",
          id: -1,
        },
        {
          name: "男歌手",
          id: 1,
        },
        {
          name: "女歌手",
          id: 2,
        },
        {
          name: "乐队",
          id: 3,
        },
      ],
      wordVlaue: "全部", //用于歌手类型
      SexValueL: "全部", //判断歌手性别
      SongDate: [], //歌手详情信息
      wordIndex: -1, //存放歌手类型下标
      SexIndex: -1, //存放歌手性别下标
      index: "",
    };
  },
  computed: {
    liText() {
      return function (value) {
        if (this.wordVlaue == value) return "color";
      };
    },
    SongSex() {
      return function (value) {
        if (this.SexValueL == value) return "color";
      };
    },
  },
  mounted() {
    this.GetSong(this.SexIndex, this.wordIndex);
      this.time()
  },
  methods: {
    getWord(value, id) {
        
      this.wordVlaue = value;
      this.wordIndex = id;
      this.GetSong(this.SexIndex, this.wordIndex);
        this.time()
    },
    getSex(value, id) {
      this.SexValueL = value;
      this.SexIndex = id;
      this.GetSong(this.SexIndex, this.wordIndex);
      this.time()
    },
    //   获取歌手详情
    async GetSong(sex, area) {
      try {
        let { data } = await MianSong(sex, area);
        let { artists } = data;
        this.SongDate = artists;
      } catch (err) {
        console.log("···········请求出现错误···········");
        console.log("err:", err);
      }
    },
    time() {
      this.index = true;
      const that = this;
      setTimeout(function () {
        that.index = false;
        console.log("this.index-->", this.index);
      }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped>
.MusicSong {
  margin-top: -20px;
  width: 100%;
  & .MusicSong-one {
    width: 100%;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 5px;
    & .MusicSong-one_ul {
      height: 40px;
      width: 30%;
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
  & .MusicSong-two {
    margin-top: 10px;
    width: 100%;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 5px;
    & .MusicSong-two_ul {
      height: 40px;
      width: 24%;
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
  & .MusicSong-three {
    & .index {
      width: 100%;
      height: 600px;
      background-color: rgba($color: #ffffff, $alpha: 0);
    }
    .MusicSong-three-content {
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
  }
}
.color {
  color: red;
}
</style>
