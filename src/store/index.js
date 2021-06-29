import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    MusicPlayList:[],  //存放用于音乐播放上下切换音乐歌单
    MusicPlayURL:[],    //存放用于音乐播放上下切换音乐URL
    PlayMusicIndex:null,  //用于获取音乐播放位置，改变小图标,
    MusicListDetails:'', //存放音乐列表数组
    isLogin:'',//判断登录状态
    img:'',//用户头像
    souValue:''//搜索歌曲信息内容
  },
  mutations: {
    OperateMusicPlayList(state,paylodd){  //修改MusicPlayList
      state.MusicPlayList = paylodd;
    },
    OperateMusicPlayURL(state,paylodd){   //修改MusicPlayURL
      state.MusicPlayURL = paylodd;
    },
    OperatePlayMusicIndex(state,paylodd){   //修改MusicPlayURL
      state.MusicPlayURL = paylodd;
    },
    OperateMusicListDetails(state,paylodd){   //修改MusicPlayURL
      state.MusicListDetails = paylodd;
    },
    OperateisLogin(state,paylodd){   //判断登录状态
      state.isLogin = paylodd;
    },
    OperateImg(state,paylodd){   //判断登录状态
      state.img = paylodd;
    },
    OperatesouValue(state,paylodd){   //搜索歌曲信息
      state.souValue = paylodd;
    },
   
  },
  actions: {},
  modules: {},
});
