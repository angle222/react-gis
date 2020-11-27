// 获取cookie
export function getCookie (name) {
  let arr = []
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (document.cookie.match(reg)) {
    arr = document.cookie.match(reg)
    return arr[2]
  } else {
    return null
  }
}
/**
 * @description 设置cookie
 * @param name cookie的名称
 * @param value cookie的值
 * @param expireDays 过期时间，单位：天
 */
export function setCookie (name, value, expireDays) {
  let exdate = new Date()
  let time = expireDays ? expireDays * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000
  exdate.setTime(exdate.getTime() + time)
  document.cookie = name + '=' + value + ';path=/;expires=' + exdate.toGMTString()
}

/**
 * @description 删除cookie
 * @param name 要删除的cookie的名称
 */
export function delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval !== null) {
    document.cookie = name + '=' + cval + ';path=/;expires=' + exp.toGMTString()
  }
}
