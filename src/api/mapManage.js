import $http from '../assets/js/http';
import Qs from 'qs';
/*
 * 
 */
//图层列表
export const getLayerList = params => $http('get','/map/layer/list',params)
//修改图层等级
export const updataLevel = params => $http('post','/map/layer/update/level',Qs.stringify(params, {arrayFormat: 'repeat'}))
//新增图层
export const addLayer = params => $http('post','/map/layer/save',Qs.stringify(params, {arrayFormat: 'repeat'}))
//删除图层
export const delLayer = params => $http('post','/map/layer/deleteBatch',Qs.stringify(params, {arrayFormat: 'repeat'}))
//更新地图
export const updateMap = params => $http('post','/map/layer/update',params)
// 获取图层详情
export const getLayerDetail = params => $http('get', '/map/layer/' + params)

//地图详情
export const mapDetail = params => $http('get','/map/'+params)
//加载图层 属性表 分页
export const layerFileds = params => $http('get','/datasource/data/properties/'+params.id,params.data)

//数据图层的属性列字段
export const mapFields= params => $http('get','/datasource/data/fields/'+params)
export const getFieldsDetail= params => $http('get','/datasource/data/fielddata/'+params.id, params.filed)
//字体
export const wordFont= params => $http('get','/map/style/font',params)
//
export const getJson= params => $http('get',params)
//
export const tileLoad= params => $http('get',params.url,params.params)

