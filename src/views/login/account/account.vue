<template>
  <div class="account">
    <div class="account-up">
      <img src="../../../assets/personal.jpg" alt="" />
    </div>
    <div class="account-down">
      <div class="account-down_left">
        <p class="account-down_left_p"> <i class="el-icon-collection-tag"></i> 听歌排行<span>(喜欢歌曲数量：{{userLoveMusicLenght}}首)</span></p>
        <get-song-list
          :listMuisID="userLoveMusicID"
          :listMuisVlau="UserMuisListValue"
          :SongWeight="170"
        ></get-song-list>
      </div>
      <div class="account-down_right">
        <div class="one">
          <div class="img">
            <img :src="UserValue.backgroundUrl" alt="" />
          </div>
          <div class="name">
            <img :src="UserValue.avatarUrl" alt="" />
            <p>{{ UserValue.nickname }}</p>
            <div>
              <el-button type="danger" round size="mini" class="butn"
                >签到</el-button
              >
            </div>
          </div>
          <div class="feature">
            <p>
              <i class="el-icon-star-off"></i> 等级：<i
                class="el-icon-trophy"
              ></i>
              7
            </p>
            <p><i class="el-icon-star-off"></i>年龄：21</p>
            <p>
              <i class="el-icon-star-off"></i>签名：{{ UserValue.signature }}
            </p>
          </div>
          <div class="deng">
            <el-button type="danger">个人设置</el-button>
            <el-button type="danger" class="buttt">我的等级</el-button>
          </div>
        </div>
        <div class="two">
          <p class="two-p">
            <i class="el-icon-collection-tag"></i> 我喜欢的歌单
          </p>

          <el-row :gutter="20">
            <el-col
              :span="12"
              v-for="(item, i) in buildSong"
              :key="i"
              class="col"
            >
              <router-link
                :to="{ name: 'foundMusic', params: { id: item.id } }"
              >
                <div class="two-tuiList_img">
                  <img :src="item.coverImgUrl" alt="" />
                  <p>{{ item.name }}</p>
                </div>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getSongList from "../../../compontStar/getSongList/getSongList.vue";
import {
  UserValue, //
  UserLoveMusicId,
} from "../../../MusicEvent/API/login"; //
import { GetMusicDetail } from "../../../MusicEvent/API/server";
export default {
  components: { getSongList },
  name: "account",
  data() {
    return {
      UserID: "", //存放用户id
      buildSong: [], //用户创建歌单
      UserValue: "",
      userLoveList: [], //用户喜欢歌单
      userLoveMusicLenght: "", //用户歌曲长度
      UserMuisListValue: [], //用户歌单列表详情
      userLoveMusicID: [], //用户喜欢歌单的id
    };
  },
  mounted() {
    this.GetUserValue();
  },
  methods: {
    async GetUserValue() {
      try {
        let { data } = await UserValue();
        let { profile } = data;
        this.UserValue = profile;
        console.log(profile);
        this.GetUserID(profile.userId);
        this.GetUserLoveSong(profile.userId);
      } catch (err) {
        console.log("········请求出现错误···········");
        console.log("err", err);
      }
    },
    // 获取用户喜欢的音乐id
    async GetUserID(value) {
      try {
        let { data } = await UserLoveMusicId(value);
        let { ids } = data;
        this.userLoveMusicLenght = ids.length - 1;
        this.userLoveMusicID = ids.slice(0, 40);
        console.log(this.userLoveMusicID);
        this.userLoveMusicID.forEach((element) => {
          this.GetMusicList(element);
        });
      } catch (err) {
        console.log("········请求出现错误···········");
        console.log("err", err);
      }
    },
    // 获取用户歌单的详情内容
    async GetMusicList(value) {
      try {
        let { data } = await GetMusicDetail(value);
        let { songs } = data;
        this.UserMuisListValue.push(songs[0]);
        //  console.log(" this.UserMuisListValue-->", this.UserMuisListValue);
      } catch (err) {
        console.log("········请求出现错误···········");
        console.log("err", err);
      }
    },
    // 获取用户喜欢的歌单
    GetUserLoveSong(value) {
      this.$axios
        .get(`http://localhost:3000/user/playlist?uid=${value}`)
        .then((res) => {
          let { data } = res;
          let { playlist } = data;
          this.buildSong = playlist.slice(0, 3);
          this.userLoveList = playlist.slice(3, 5);
        })
        .catch((err) => {
          console.log("········请求出现错误···········");
          console.log("err", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.account {
  & .account-up {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 350px;
    overflow: hidden;
    & img {
      width: 100%;
    }
  }
  & .account-down {
    margin-top: 296px;
    width: 100%;
    display: flex;
    flex-direction: row;
    & .account-down_left {
      width: 65%;
      margin-right: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      & .account-down_left_p{
        font-weight: 900;
        & span{
          font-size: 13px;
          color: #b8b4b4;
        }
      }
    }
    & .account-down_right {
      width: 30%;
      & .one {
        width: 100%;
        height: 400px;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        margin-bottom: 30px;
        & .img {
          background-color: bisque;
          width: 100%;
          height: 140px;
          overflow: hidden;
        }
        & .name {
          display: flex;
          flex-direction: row;
          margin: 0 10px;
          & img {
            margin-left: 20px;
            margin-top: -15px;
            width: 64px;
            height: 64px;
          }
          & p {
            font-weight: 900;
            font-size: 17px;
            line-height: 20px;
            margin-left: 20px;
          }
        }
        & .feature {
          width: 100%;
          margin-left: 30px;
          & p {
            line-height: 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }
        & .deng {
          margin-top: 40px;
          margin-left: 50px;
        }
      }
      & .two {
        width: 100%;
        height: 450px;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        margin-bottom: 30px;
        overflow: hidden;
        & .two-p {
          font-weight: 900;
        }
        & .two-tuiList_img {
          margin-left: 20px;
          width: 100px;
          & img {
            width: 130px;
            height: 130px;
            border-radius: 5px;
            box-shadow: 5px 5px 2px 1px rgba(32, 31, 31, 0.2);
          }
          & p {
            // width: 100%;
            // line-height: 0px;
            text-align: center;
            font-weight: 900;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
.clear_fix:after {
  /* 要加的属性 */
  content: ""; /* 添加内容 */
  clear: both; /* 清楚两侧浮动 */
  display: block; /* 转换元素类型为块元素 */
  height: 0;
  overflow: hidden; /* 溢出隐藏属性 */
  visibility: hidden; /* 隐藏属性 */
}
.butn {
  background-color: red !important;
  margin-top: 10px;
  margin-left: 125px;
}
.el-icon-trophy {
  color: rgb(92, 92, 92);
}
.el-icon-star-off {
  color: rgb(248, 109, 109);
  margin-right: 8px;
}
.buttt {
  margin-left: 50px;
}
.col {
  margin-top: 0px;
  margin-bottom: 0px;
}
.el-icon-collection-tag {
  color: red;
  margin-right: 10px; //
  margin-left: 5px;
}
</style>
