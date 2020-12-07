var funs = [fn1,fn2,fn3];
function fn1(x){
  console.log('1')
  return x+1
}
function fn2(x){
  console.log('2')
  return x+2
}
function fn3(x){
  console.log('3')
  return x+3
}
// fn3(fn2(fn1))
var ff = funs.reduce(function(left,right){
  return function(...args){
    return right(left(...args))
  }
})
function compose(...funs){
  return funs.reduce(
    (left,right)=>(args)=>right(left(args))
    )
}

var aa = [1,2,3];
var s = aa.reduce(function(prev,curr){
  return prev+curr
});
console.log(s,compose(fn1,fn2,fn3)(3))