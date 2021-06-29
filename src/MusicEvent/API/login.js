import { get } from "./ajax.js";

const longin = (phone,password) => get(`login/cellphone?phone=${phone}&password=${password}}`);
// 获取用户信息
const UserValue = () => get(`user/account`);
// 获取用户喜欢音乐列表id
const UserLoveMusicId = (id) => get(`likelist?uid=${id}`);

// 获取用户创建的歌单
const UserbuildList = (id) => get(`playlist?uid=${id}`)
export {
    longin,
    UserValue,
    UserLoveMusicId,
    UserbuildList
}