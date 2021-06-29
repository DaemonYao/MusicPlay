<template>
  <div class="sousou">
    <div class="sousou-up">
      <img src="../../assets/personal.jpg" alt="" />
    </div>
    <div class="sou">
      <el-input v-model="input" placeholder="搜索音乐"></el-input>
      <i class="el-icon-search" @click="SearchMusic"></i>
    </div>
    <div class="sousou-list">
        <get-song-list :listMuisID="Searchid" :listMuisVlau="startValue" :MusicWeight="340" :SongWeight="300" :tableIcon="180" :TimeWeight="180"></get-song-list>
    </div>
  </div>
</template>

<script>
import getSongList from '../../compontStar/getSongList/getSongList.vue';
import { Search } from "../../MusicEvent/API/server";
export default {
  components: { getSongList },
  name: "sou",
  data() {
    return {
      input: "", //本页搜索内容
      startValue: [], //搜索的内容
      Searchid:[],//搜索到的音乐ID
    };
  },
  mounted() {
    this.getSearch(this.$store.state.souValue);
  },
  methods: {
    async getSearch(value) {
      try {
        let { data } = await Search(value);
        let { result } = data;
        let { songs } = result
        this.startValue = songs;
        this.startValue.forEach(element => {
            this.Searchid.push(element.id);
        })
      } catch (err) {
        console.log("·········请求出现问题·········");
        console.log("err:", err);
      }
    },
    // 搜索音乐
    SearchMusic(){
        this.getSearch(this.input)
    }
  },
};
</script>

<style lang="scss" scoped>
.sousou {
  & .sousou-up {
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
  & .sou {
    width: 500px;
    position: absolute;
    left: 33%;
    top: 25%;
    z-index: 1;
    display: flex;
    flex-direction: row;
    & i {
      font-size: 30px;
      font-weight: 900;
      margin-top: 5px;
      margin-left: 5px;
      color: white;
    }
    & i:hover{
        color: red;
    }
  }
  & .sousou-list {
    margin-top: 290px;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  }
}
</style>
