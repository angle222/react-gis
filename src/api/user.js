import $http from '../assets/js/http';
import Qs from 'qs';
/*
 * 登录
 */

export const getUserInfo = params => $http('get','/privilege/admin/query/ticket',params)

export const userLogin = params => $http('post', '/user/login', '', {params: params})
export const userLoginByTel = params => $http('post', '/user/telphone/login','', {params: params})
export const getCode = params => $http('get','/user/verify',params)
export const codeCheck = params => $http('get','/user/verify/check',params)
export const autoLogin = params => $http('post', '/user/remeberme', '', {params: params})
// export const loginOut = params => $http('get','/user/logout',params)
// export const loginOut = params => $http('get','/map/logout ',params)
export const loginOut = params => $http('get','/privilege/admin/logout',params)


/********************/
/*部门*
/********************/
//获取部门列表
// export const getDepart = params => $http('get','/dept/list',params)
export const getDepart = params => $http('get','/privilege/dept/list',params)
//获取部门分页列表
// export const getDepartList = params => $http('get','/dept/page',params)
export const getDepartList = params => $http('get','/privilege/dept/page',params)
//新增部门
// export const addDepart = params => $http('post','/dept/save',params)
export const addDepart = params => $http('post','/privilege/dept/save',params)
//批量删除部门
// export const batchDelDepart = params => $http('post','/dept/batchdel',Qs.stringify(params, {arrayFormat: 'repeat'}))
export const batchDelDepart = params => $http('post','/privilege/dept/batchdel',Qs.stringify(params, {arrayFormat: 'repeat'}))
//删除部门
// export const delDepart = params => $http('delete','/dept/'+params)
export const delDepart = params => $http('delete','/privilege/dept/'+params)
//过滤掉当前部门的子部门
// export const updateDepart = params => $http('get','/dept/listRemoveChild',params)
export const updateDepart = params => $http('get','/privilege/dept/listRemoveChild',params)
//组织架构图
// export const treeDepart = params => $http('get','/dept/tree',params)
export const treeDepart = params => $http('get','/privilege/dept/tree',params)



/********************/
/*角色*
/********************/
//获取角色列表
// export const getRole = params => $http('get','/role/list',params)
export const getRole = params => $http('get','/privilege/role/list',params)
//获取角色分页列表
// export const getRoleList = params => $http('get','/role/page',params)
export const getRoleList = params => $http('get','/privilege/role/page',params)
//新增角色
// export const addRole = params => $http('post','/role/save',params)
export const addRole = params => $http('post','/privilege/role/save',params)
//角色详情
// export const detailRole = params => $http('get','/role/'+params)
export const detailRole = params => $http('get','/privilege/role/'+params)
//删除角色
// export const delRole = params => $http('delete','/role/'+params)
export const delRole = params => $http('delete','/privilege/role/'+params)
//批量删除角色
// export const batchDelRole = params => $http('post','/role/batchdel',Qs.stringify(params, {arrayFormat: 'repeat'}))
export const batchDelRole = params => $http('post','/privilege/role/batchdel',Qs.stringify(params, {arrayFormat: 'repeat'}))



/********************/
/*用户*
/********************/
//新增用户
// export const addUser = params => $http('post','/admin/save',params)
export const addUser = params => $http('post','/privilege/admin/save',params)
//获取用户分页列表
// export const getUserList = params => $http('get','/admin/page',params)
export const getUserList = params => $http('get','/privilege/admin/page',params)
//删除用户
// export const delUser = params => $http('delete','/admin/'+params)
export const delUser = params => $http('delete','/privilege/admin/'+params)
//批量删除用户
// export const batchDelUser = params => $http('post','/admin/batchdel',Qs.stringify(params, {arrayFormat: 'repeat'}))
export const batchDelUser = params => $http('post','/privilege/admin/batchdel',Qs.stringify(params, {arrayFormat: 'repeat'}))
export const userLock = params => $http('get','/privilege/admin/updateLocked', params)
//查询用户
// export const findUser = params => $http('get','/admin/'+params)
export const findUser = params => $http('get','/privilege/admin/'+params)
//用户修改密码
// export const updatepwd = params => $http('post','/admin/resetpassword',params)
export const updatepwd = params => $http('post','/privilege/admin/resetpassword',params)
//用户名校验
export const userNameCheck = params => $http('get','/user/query/ticket',params)
//用户数量统计
// export const getUserNum = params => $http('get','/admin/assignnum',params)
export const getUserNum = params => $http('get','/privilege/admin/assignnum',params)

/********************/
/*权限*
/********************/
//资源列表
// export const getSourceList = params => $http('get','/resource/page',params)
export const getSourceList = params => $http('get','/privilege/resource/page',params)
export const getSourceChild = params => $http('get','/privilege/resource/child',params)
//资源树
// export const getSourceTree = params => $http('get','/resource/list',params)
export const getSourceTree = params => $http('get','/privilege/resource/list',params)
//获取用户权限
// export const getMenuTree = params => $http('get','/user/query/privileges',params)
export const getMenuTree = params => $http('get','/privilege/admin/query/privileges',params)
/* * 版本管理 */
export const getVersion = () => $http('get', '/privilege/admin/query/version')
export const getVersionList = params => $http('get', '/privilege/version/page', params)
export const addVersion = params => $http('post', '/privilege/version/save', params)
export const updateVersion = params => $http('post', '/privilege/version/update', params)
export const batchDelVersion = params => $http('post', '/privilege/version/batchdel', Qs.stringify(params, { arrayFormat: 'repeat'}))
export const delVersion = params => $http('delete', 'privilege/version/' + params)
export const detailVersion = params => $http('get', 'privilege/version/' + params)
