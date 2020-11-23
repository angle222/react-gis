

import $http from '../assets/js/http';
import Qs from 'qs';
/*
 * 接口管理
 */

//我分享的
export const mySharePage = params => $http('get','/share/page',params)
//分享给我的
export const shareToMePage = params => $http('get','/share/shareToMe/page',params)
//分享详情
export const shareDetail = params => $http('get','/share/'+params)
//分享删除
export const shareDelete = params => $http('delete','/share/'+params)
//批量删除
export const deleteBatchShare = params => $http('post','/share/deleteBatch?ids='+params)

//获取分享的用户列表
export const shareUserList = params => $http('get','/share/getUserList',params)
