<template>
  <div>
    <div class="rankingList-up">
      <p class="p1"> <i class="el-icon-collection"></i> 云村特色榜</p>
      <el-row :gutter="20">
        <el-col :span="3" class="deletTop" v-for="(item,i) in feature" :key="i">
          <router-link :to="{ name: 'MusicList', params: { id: item.id } }">
            <div class="rankingList-up_contant">
              <img
                :src="item.coverImgUrl"
                alt=""
              />
              <p>{{item.name}}</p>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div class="rankingList-down">
      <p class="p1"> <i class="el-icon-present"></i> 全球媒体榜</p>
       <el-row :gutter="20">
        <el-col :span="3" class="deletTop" v-for="(item,i) in word" :key="i">
          <router-link :to="{ name: 'MusicList', params: { id: item.id } }">
            <div class="rankingList-down_contant">
              <img
                :src="item.coverImgUrl"
                alt=""
              />
              <p>{{item.name}}</p>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { GetrankingList } from "../../../../MusicEvent/API/server";
export default {
  name: "rankingList",
  data() {
    return {
      feature: [], //特色榜，
      word: [], //全球榜
    };
  },
  computed: {},
  mounted() {
    this.GetrankingListValue();
  },
  methods: {
    async GetrankingListValue() {
      try {
        var value = await GetrankingList();
        value.data.list.forEach((element, index) => {
          if (index < 4) {
            this.feature.push(element);
          } else {
            this.word.push(element);
          }
        });
      } catch (err) {
        console.log("·········数据请求出现问题···········");
        console.log("err->>", err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rankingList-up {
  & .p1 {
    line-height: 16px;
  }
  & .rankingList-up_contant {
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
}
.rankingList-down{
     & .p1 {
    line-height: 16px;
  }
  & .rankingList-down_contant {
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
}
.deletTop {
  margin-top: 0 !important;
}
.el-icon-collection{
    margin-right: 10px;
    font-size: 20px;
    color: red;
    font-weight: 700;
}
.el-icon-present{
     margin-right: 10px;
    font-size: 20px;
    color: red;
    font-weight: 700;
}
</style>
