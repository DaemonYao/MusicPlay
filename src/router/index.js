import Vue from "vue";
import store from '../store/index'
import VueRouter from "vue-router";
// 发现音乐
import MFmusic from '../components/main/FoundMusic/MFmusic'
// 排行榜
import rankingList from '../components/main/rankingList/main/rankingList'
// 歌单
import MusicListDetails from '../components/main/MusicListDetails/main/MusicListDetails'
// 登录界面路由
import login from '../views/login/login'
// 主页面中歌手页面
import MusicSong from '../components/main/MusicSong/MusicSong'

// 404页面
import fault from '../views/404'
// 路由懒加载歌单详情界面
const MainSongListdetails = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/main/FoundMusic/second/tuiList')
const MainSongHotdetails = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/main/FoundMusic/second/SongHot')


// 排行榜
const PaiMuiscList = () => import(/* webpackChunkName: 'ImportFuncDemo' */'.././components/main/rankingList/second/rankingListDetails')

// 歌单详情
const listDetails = () => import(/* webpackChunkName: 'ImportFuncDemo' */'../components/main/MusicListDetails/second/listDetails')
//用户详情界面
const account =() => import(/* webpackChunkName: 'ImportFuncDemo' */'../views/login/account/account')
// 用户搜索音乐界面
const sou =() => import(/* webpackChunkName: 'ImportFuncDemo' */'../views/sou/sou')

Vue.use(VueRouter);

const routes = [
  // 默认路由界面
  {path:'/',redirect: '/foundMusic'},
  // 主页面中发现音乐的界面
  {
    path:'/foundMusic',
    component:MFmusic
  },
  // 主界面推荐歌单详情界面
  { 
    name: "foundMusic",
    path: '/foundMusic/:id/',
    component:MainSongListdetails
  },
  // 主页面中推荐歌手详情界面
  {
    name:"SongHot",
    path:'/SongHot/:id/',
    component:MainSongHotdetails
  },

  // 排行榜
  {
    path:'/MusicList',
    component:rankingList
  },
  // 排行榜歌单详情页面
  { 
    name: "MusicList",
    path: '/MusicList/:id/',
    component:PaiMuiscList
  },

  // 歌单
  {
    path:'/SongList',
    component:MusicListDetails
  },
  //歌单列表二级路由
  { 
    name: "SongList",
    path: '/SongList/:id/',
    component:listDetails
  },
// 歌手详情界面
// 主页面菜单中的歌手详情界面
{ 
  name: "Song",
  path: '/Song',
  component:MusicSong
},

  // 登录
  // 登录界面路由
  { 
    name: "login",
    path: '/login',
    component:login
  },
  // 用户详情界面路由
  { 
    name: "account",
    path: '/account',
    component:account
  },
  // 搜索音乐界面
  { 
    name: "sou",
    path: '/sou',
    component:sou
  },
  // 404页面
  { 
    name: "Play",
    path: '/Play',
    component:fault
  },
  { 
    name: "Mv",
    path: '/Mv',
    component:fault
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // 判断是否为登录状态
  const isLogin = localStorage.getItem("MusicToken") ? true : false ;
  const img = localStorage.getItem("MusicImg")
  // 不是登录状态不能访问 视频 Mv界面
  if(to.path == '/foundMusic' || to.path == '/MusicList' || to.path == '/SongList' || to.path == '/Song') {
    store.commit('OperateImg', img);
    store.commit('OperateisLogin', isLogin);
    next();
  }else if(to.path == '/Play' || to.path == '/Mv') {
    store.commit('OperateisLogin', isLogin);
    if(isLogin == false){ localStorage.removeItem("MusicImg") };
    isLogin ? next() : next('/login')
  }
    store.commit('OperateisLogin', isLogin);
    next();
  
})

export default router;
