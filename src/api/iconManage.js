

import $http from '../assets/js/http';
import Qs from 'qs';
/*
 * 接口管理
 */

//分页
export const iconList = params => $http('get','/icon/page',params)
//删除图标
export const deleteIcon = params => $http('delete','/icon/deleteById/'+params)
//批量删除
export const deleteBatchIcon = params => $http('post','/icon/deleteBatch?ids='+params)
//查询标签
export const labelList = params => $http('get','/imgSign/list/',params)
//新建图标
export const fileUp = params => $http('file','/icon/save',params)
//所有图标
export const allIcon = params => $http('get','/icon/list',params)
//获取用户列表
export const shareUserList = params => $http('get','/share/getUserList',params)
