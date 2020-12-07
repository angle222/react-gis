
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
class Login extends Component {
  render() {
    console.log('loginpage',this.props)
    // const {login,isLogin,location} = this.props;
    // const redirect = location.state?location.state.redirect:'/Workspace';
    // console.log(redirect)
    // if(isLogin){
    //   // 登录之后要跳转到location的state
    //   return <Redirect to={redirect}></Redirect>
    // }
    const { location, isLogin, login } =this.props;
    const redirect=location.state.redirect||"/"; //重定向地址
    if (isLogin) { return <Redirect to={redirect} />; }
    return (
      <div>
        <h2>this is login page</h2>
        <h2>当前的登录状态：{isLogin?'登录了':'未登录'}</h2>
        <button onClick={login}>login</button>
      </div>
    )
  }
}

export default connect(
  state=>({isLogin:state.isLogin}),
  {login:()=>({type:'loginSuccess'})}
)(Login)