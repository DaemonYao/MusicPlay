<template>
    <div>
    <el-row :gutter="25">
      <el-col :span="3" v-for="(item, i) in songListData" :key="i">
        <router-link :to="{ name: 'SongList', params: { id: item.id } }">
          <div class="tuiList_img">
            <img :src="item.coverImgUrl" alt="" >
            <p>{{item.name}}</p>
          </div>
        </router-link>
      </el-col>
    </el-row>
    </div>
</template>

<script>
export default {
    name:'SongList',
    data() {
        return {
            
        }
    },
    mounted(){
        this.a()
    },
    props:{
        songListData:{}
    },
    methods: {
       a() {
        
       } 
    },
}
</script>

<style lang="scss" scoped>
.tuiList{
  margin-bottom: 60px;
}
.tuiList_img {
  width: 123px;
  height: 123px;
  box-shadow: 5px 5px 2px 1px rgba(32, 31, 31, 0.2);
  margin-bottom: 20px;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  & p {
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.el-col {
  margin-top: 24px;
  margin-bottom: 24px;
}
</style>