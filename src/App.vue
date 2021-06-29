<template>
  <div id="app">
    <el-container>
      <el-header>
        <m-header></m-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
       <heel></heel>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import "./themeClass/css/global.css";
import MHeader from "./components/header/MHeader.vue";
import heel from './components/footer/heel.vue';
export default {
  name: "app",
  data() {
    return {};
  },
  components: { MHeader, heel},
  methods: {},
};
</script>

<style scope>
.el-container {
  margin-left: 100px;
  margin-right: 100px;
}
.el-header {
  position: fixed;
  z-index: 3;
  margin-left: -100px !important;
  margin-right: 0 !important;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-main {
  margin-top: 60px;
}
</style>
