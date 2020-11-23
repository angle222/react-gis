import $http from '../assets/js/http';
import Qs from 'qs';

// 获取token授权列表
export const getTokenListService = params => $http('get','/tokengrant/page', params);

// 获取地图列表树
export const getMapsListService = () => $http('get', '/map/treeNode');

// 获取单个id的地图信息
export const getMapDetailService = ( id ) => $http('get', `/map/${id}`);

// 新增token
export const addTokenService = ( params ) => $http('post', '/tokengrant/save', params );

// 批量删除操作
export const doBatchDelService = ( params ) => $http('delete', '/tokengrant/deleteBatch?ids='+params );

// 删除指定ID的选项
export const delTokenItemService = ( id ) =>　$http('delete', `/tokengrant/${id}`);

// 暂停服务
export const doPauseService = ( id ) => $http('get', `/tokengrant/pause/${id}`);

// 重启服务
export const doRestoreService = ( id ) => $http('get', `/tokengrant/restore/${id}`);

// 延期服务
export const doDelayService = ( params ) => $http('get', `/tokengrant/delay/${ params.id }?expireTime=${ params.expireTime }`);


