import { get } from "./ajax.js";

// 获取主界面轮播图界面图片
const SwiperImg = () => get("banner?type=0");

// 获取推荐歌单
const TuijianSongList = () => get("personalized?limit=24");

// 获取每日推荐10首歌曲
const EveryDayMusic = () => get("personalized/newsong");

// 根据ID获取音乐详情
// 在播放器中使用
const GetMusicDetail = (id) => get(`song/detail?ids=${id}`, {});

// 根据id查询音乐的url
const GetMusicURL = (id) => get(`song/url?id=${id}`, {});

// 获取每日推荐歌手
const GetEveryDaySong = () => get(`top/artists?offset=0&limit=24`);

// 获取发现音乐界面中推荐歌单中的详情信息中
const GettuiListDetail = (id) => get(`playlist/detail?id=${id}`, {});

// 获取喜欢这个歌单的人
const LoveSongListData = (id) => get(`playlist/subscribers?id=${id}&limit=28`)

// 推荐推荐相似歌单
const SimilarSongList = (id) => get(`related/playlist?id=${id}`)

// 获取歌手的热门50首歌曲
const GetSongHotMusic = (id) => get(`artist/songs?id=${id}&limit=30`)

// 获取歌手的详情信息
const GetSongData = (id) => get(`artist/detail?id=${id}`);

// 排行榜
// 获取排行榜中榜单详情
const GetrankingList = () => get(`toplist`)

// 音乐歌单(只使用了精品歌单)
// 根据传入的对应的标签（古风）查询对应歌单 
// before:(分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据),limit: 取出歌单数量 , 默认为 20,cat:{cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "}
const GetMusicListTitle = (cat,limit) =>get(`top/playlist?cat=${cat}&limit=${limit}`) //&limit=${limit}

// 用户搜索音乐
// 用户根据传入的关键字进行音乐的搜索
const Search = (value) => get(`/cloudsearch?keywords= ${value}`);

// 主界面中歌手界面
const MianSong = (type,initial) => get(`/artist/list?type=${type}&area=${initial}`)
export {
  SwiperImg,
  TuijianSongList,
  EveryDayMusic,
  GetMusicDetail,
  GetMusicURL,
  GetEveryDaySong,
  GettuiListDetail,
  LoveSongListData,
  SimilarSongList,
  GetSongHotMusic,
  GetSongData,
  GetrankingList,
  GetMusicListTitle,
  Search,
  MianSong
};
