<template>
  <div class="login">
    <div class="v">
      <video class="f" id="bgvid" playsinline="" autoplay muted loop="">
        <source
          src="https://vodkgeyttp9c.vod.126.net/vodkgeyttp8/LvC1f4Ay_3178552633_shd.mp4?ts=1919130567&rid=7859AE92117216E8AD0E345795682128&rl=0&rs=hshSERxELyHpcTtlhBmAihKBMJdHpCDj&sign=6ef716a5997cbbfd306f07f45a9c4abf&coverId=Oq3EQRMgwK2AYvp3hlXlpQ==/109951165418425655&infoId=265044"
          type="video/mp4"
        />
      </video>
    </div>
    <div class="loginCont">
      <div class="loginCont-1">
        <img src="../../assets/logo-a.png" alt="" />
      </div>
      <div class="loginCont-2">
        <el-input
          v-model="account"
          placeholder="请输入账号信息"
          class="input"
        ></el-input>
        <el-input
          placeholder="请输入密码"
          v-model="password"
          show-password
        ></el-input>
        <el-button class="button" @click="subit">点击登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import jwd_decode from 'jwt-decode'
export default {
  name: "login",
  data() {
    return {
      account: "",
      password: "",
      token: "",
      JwdToken: "", //解析后的token
      userValue: "", //用户信息
      img: "", //存放用户图片
    };
  },
  methods: {
    subit() {
      this.PostLogin(this.account, this.password);
    },
    PostLogin(account, password) {
      this.$axios
        .get(
          `http://127.0.0.1:3000/login/cellphone?phone=${account}&password=${password}`
        )
        .then((res) => {
          const { data } = res;
          if (data.code == 400 || data.code == 502) {
            this.$message("密码或者账号出现错误,请重新登录！");
          } else {
            this.token = data.token;
            this.$message("恭喜您，登录成功！");
            this.$router.push("/foundMusic");
            localStorage.setItem("MusicToken", data.token);
            localStorage.setItem("MusicImg", data.profile.avatarUrl);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 89%;
  left: 0;
  position: absolute;
  & .v {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  & .v:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  & .loginCont {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 360px;
    height: 450px;
    background-color: white;
    z-index: 3;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
    background-image: url("../../assets/logbg.jpg");
    & .loginCont-1 {
      width: 80px;
      height: 60px;
      & img {
        width: 100%;
        height: 100%;
      }
    }
    & .loginCont-2 {
      width: 70%;
    }
  }
}
#bgvid {
  width: 100%;
}
.el-input {
  margin-top: 15px;
}
.button {
  margin-top: 20px;
  width: 100% !important;
}
</style>
