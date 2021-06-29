<template>
    <div class="box">
         <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(item,i) in imglist" :key="i">
                    <h3 class="medium"><img :src="item.imageUrl" alt=""></h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
import {SwiperImg} from '../../MusicEvent/API/server'
export default {
    name:'swiper',
    data() {
        return {
            imglist:[]
        }
    },
    methods:{
        // 获取轮播图图片
    async Swiper(){
        try{
            let img = await SwiperImg();
            if(img.status == 200){
                this.imglist = img.data.banners
            }
        }catch(err){
            console.log("········出现错误·············");
            console.log(err);
        }
      }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted () {
     this.Swiper()
    },
}
</script>

<style  scoped>

 .el-carousel__item h3 {
    font-size: 14px;
    line-height: 250px;
    margin: 0;
  }
.medium img{
    width: 100%;
    height: 250px;
}
</style>