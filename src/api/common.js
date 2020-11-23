import $http from '../assets/js/http';
/*
 * 公共的api
 *直接获取内容，res
 */
//获取电子券类型
export const getTkType = params => $http('post','/voucher/type/',params);
/*订单查询条件模糊匹配*/
//激活码
export const activationCode = params => $http('post','/voucher/order/query/activationCode',params);
//订单名称
export const orderName = params => $http('post','/voucher/order/query/name',params)
//商家名称
export const businessName = params => $http('post','/business/query/name',params)
//活动名称
export const activityName = params => $http('post','/business/activity/query/name',params)
/*电子券查询条件模糊匹配*/
//电子券模糊匹配
export const queryTicket = params => $http('post','/voucher/code/get/code',params)
//昵称模糊匹配
export const queryNickName = params => $http('post','/wx/user/get/username',params)
/*批次查询条件模糊匹配*/
//批次编号模糊匹配
export const queryBtCode = params => $http('post','/voucher/batch/get/code',params)
//压缩包名称模糊匹配
export const queryZip = params => $http('post','/voucher/batch/get/zipName',params)
