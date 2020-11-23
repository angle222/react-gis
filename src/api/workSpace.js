import $http from '../assets/js/http';
import Qs from 'qs';
/*
 *
 */
//工作空间列表
export const getList = params => $http('get','/workspace/list',params)
//新建工作空间
export const newSpace = params => $http('post','workspace/save',Qs.stringify(params))
//删除工作空间
export const deleteSpace = params => $http('post','/workspace/deleteBatch',Qs.stringify(params))

/*
 * 地图
 */
//地图分页
export const mapList = params => $http('get','/map/page',params)
// 所有地图
export const getAllMap = params => $http('get','/map/list',params)
//新建地图
export const newMaps = params => $http('post','/map/save',params)
//删除地图
export const deleteMap = params => $http('delete','/map/'+params)
//批量地图
export const deleteBatchMap = params => $http('post','/map/deleteBatch?ids='+params)
//地图发布
export const mapPublish = params => $http('get','/map/publish', params)
//分享地图
export const shareMap = params => $http('post','/share/save',params)

//名称查重
export const mapName = params => $http('post','/map/checkName',params)
export const getMapSrs = params => $http('get','/map/srsInfo/'+params)

/*
 * 数据
 */
//数据分页
export const datasList = params => $http('get','/workspace/data/page',params)
/*
* 瓦片缓存
* */
// 瓦片缓存任务分页列表
export const getAllTask = params => $http('get', '/workspace/task/page', params)
// 新增缓存任务
export const saveTask = params => $http('post', '/workspace/task/save', params)
// 获取缓存任务详情
export const getTaskDetail = params => $http('get', '/workspace/task/' + params)
// 删除单个任务
export const deleteTask = params => $http('delete', '/workspace/task/' + params)
// 批量删除
export const deleteTaskBatch = params => $http('post', '/workspace/task/deleteBatch?ids=' + params)
export const runTask = params => $http('get', '/workspace/task/runTask', params)
