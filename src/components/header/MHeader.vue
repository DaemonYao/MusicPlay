<template>
  <div class="m-box">
    <div class="m-login">
      <img src="../../assets/logo_black.png" alt="" />
    </div>
    <div class="m-content">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          @click="getClassValue(index, item.to)"
          :class="path(item.to)"
        >
          <router-link :to="item.to">
            {{ item.contant }}
          </router-link>
        </li>
      </ul>
      <div class="sou">
        <el-input v-model="input" placeholder="搜索音乐" class="inp"></el-input>
        <i class="el-icon-search" @click="getSouValue"></i>
      </div>
    </div>
    <div class="m-register">
      <router-link to="/login" v-if="!$store.state.isLogin">
        <p>请登录</p></router-link
      >
      <router-link to="/account" v-if="$store.state.isLogin">
        <el-dropdown>
          <img :src="$store.state.img" alt="" />
          <el-dropdown-menu slot="dropdown">
            <router-link to="/account">
              <el-dropdown-item>
                <i class="el-icon-medal-1"></i> 个人详情</el-dropdown-item
              >
            </router-link>
            <router-link to="/login">
              <el-dropdown-item @click="close">
                <i class="el-icon-switch-button"></i> 点击退出</el-dropdown-item
              >
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "MHeader",
  data() {
    return {
      classValue: 0,
      list: [
        { to: "foundMusic", contant: "发现音乐" },
        { to: "MusicList", contant: "排行榜" },
        { to: "SongList", contant: "歌单" },
        { to: "Song", contant: "歌手" },
        { to: "Play", contant: "视频" },
        { to: "Mv", contant: "MV" },
      ],
      input: "",
      routerPath: this.$route.path,
    };
  },
  methods: {
    getClassValue(index, v) {
      this.classValue = index;
      this.routerPath = `/${v}`;
    },
    getSouValue() {
      let path = this.$route.path;
      if (path == "/sou") return;
      this.$store.commit("OperatesouValue", this.input);
      this.$router.push("./sou");
    },
    // 退出登录
    close() {
      localStorage.removeItem("MusicToken");
      localStorage.removeItem("MusicImg");
      this.$axios.get(`http://localhost/logout`);
    },
  },
  computed: {
    path() {
      return function (value) {
        if (`/${value}` == this.routerPath) return "is-show";
      };
    },
  },
};
</script>

<style lang="scss" scope>
.m-box {
  width: 1282px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
}
.m-login {
  margin-left: -1px;
  background-color: white;
  width: 42px;
  & img {
    margin-top: 18px;
  }
}
.m-content {
  display: flex;
  width: 75%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  & ul {
    padding: 0;
    & li {
      display: inline-block;
      margin-left: 25px;
      margin-right: 15px;
      font-size: 16px;
    }
    .is-show {
      color: red !important;
      position: relative;
      transition: 0.5s;
      & a{
        color: red;
      }
    }
    .is-show::after {
      position: absolute;
      bottom: -9px;
      left: 50%;
      content: "";
      width: 3px;
      height: 3px;
      background-color: red;
      border-radius: 50%;
    }
  }

  & .sou {
    width: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    & i {
      font-weight: bold;
      margin-left: 5px;
    }
    & i:hover {
      color: red;
    }
    & .el-input__inner {
      height: 30px;
    }
  }
}
.m-register {
  & img {
    margin-top: 9px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
