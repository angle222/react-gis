import $http from '../assets/js/http';

import Qs from 'qs';


/**
 *
 * 所有数据
 */
//分页
export const dataList = params => $http('get','/datasource/data/page',params)
//删除
export const deleteData = params => $http('delete','/datasource/data/'+params)
//批量删除
export const deleteBatchAll = params => $http('post','/datasource/data/deleteBatch?ids='+params)
//坐标系
// export const dataSrs = params => $http('get','/datasource/data/srs',params)
export const dataSrs = params => $http('get','/map/srs',params)

/**
 *
 * 查询
 */
//单个查询所有数据
export const queryAll = params => $http('get','/datasource/data/mapdata/id?id='+params)
//单个查询所有数据 - 批量
export const queryAlls = params => $http('get','/datasource/data/mapdata/ids?ids='+params)

//单个查询 数据库 文件 服务
export const query = params => $http('get','/datasource/data/mapdata/datasourceId?datasourceId='+params)
//单个查询 数据库 文件 服务- 批量
export const querys = params => $http('get','/datasource/data/mapdata/datasourceIds?datasourceIds='+params)



/*
 * 数据库
 */
//服务类型
export const databaseType = params => $http('get','/datasource/db/dbtype',params)
//分页
export const databaseList = params => $http('get','/datasource/db/page',params)
//测试连接
export const databaseTest = params => $http('post','/datasource/db/testConnection',params)
// 获取数据源详情
export const getDatabase = params => $http('get','/datasource/db/'+params)
//删除
export const deleteDatabase = params => $http('delete','/datasource/db/'+params)
//批量删除
export const deleteBatchDatabase = params => $http('post','/datasource/db/deleteBatch?ids='+params)
//保存数据库
export const databaseAdd = params => $http('post','/datasource/db/save',params)
// 查询所有空间数据表
export const getAllTable = params => $http('post', '/datasource/db/tableList', params)
// SQL查询
export const queryBySql = params => $http('post', '/datasource/db/queryBySql', params)
/*
 * 服务
 */
//服务类型
export const serviceType = params => $http('get','/datasource/mapservice/servicetype',params)
//分页
export const serviceList = params => $http('get','/datasource/mapservice/page',params)
//测试连接
export const testConnection = params => $http('post','/datasource/mapservice/testConnection',Qs.stringify(params))
//删除
export const deleteServer = params => $http('delete','/datasource/mapservice/'+params)
//批量删除
export const deleteBatchServer = params => $http('post','/datasource/mapservice/deleteBatch?ids='+params)
//新建
export const newServer = params => $http('post','/datasource/mapservice/save', Qs.stringify(params) )

//解析web服务数据
export const parseWebServerData = params => $http('post','/datasource/mapservice/save',params)

// 获取预制的tms类型数据
export const getTmsListService = () => $http('get', '/datasource/mapservice/internalTmslist');


/*
 * 文件
 */
//服务类型
export const fileType = params => $http('get','/datasource/file/filetype',params)
//分页
export const fileList = params => $http('get','/datasource/file/page',params)
//删除
export const deleteFile = params => $http('delete','/datasource/file/'+params)
//批量删除
export const deleteBatchFile = params => $http('post','/datasource/file/deleteBatch?ids='+params)
//文件上传
export const fileUp = (params,config) => $http('file','/datasource/file/save',params,config)
//文件上传之前的同名校验
//export const checkFileName = params => $http('post','/datasource/file/checkNames',{params,paramsSerializer:function(params){return Qs.stringify(params,{arrayFormat:'repeat'})}})

export const checkFileName = params => $http('post','/datasource/file/checkNames',Qs.stringify(params, {arrayFormat: 'repeat'}))
// 获取全部字符集
export const getCharset = () => $http("get", "/datasource/file/charset")

// 修改字符集的函数
export const updateCharsetService = ( id, params ) =>　$http("get", `/datasource/file/update/charset/${id}`, params );



// 获取用户列表信息
export const getUserListService = params => $http('get','/share/getUserList',params)

// 分享数据源
export const shareDataSourceService = params => $http('post', '/share/save', params );


