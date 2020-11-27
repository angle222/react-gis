import { Button ,Form, Input,  Checkbox,message} from "antd";
import React, { useState,useEffect } from "react";
import md5 from 'js-md5'
import {userLogin,getMenuTree,getUserInfo} from '../../api/user';
import {setCookie} from "../../utils/cookie"
import stylelogin from "./Login.module.css"
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const Login = (props) => {
    const onFinish = async values => {
      
        let postData = {
            'username': values.username,
            'password': md5(values.password)
        }
        let data = await userLogin(postData)
        console.log(setCookie,data);
        setCookie('dataUser',`COOKIE_USER_TICKET_DATAGDSW_${data}`)
        message.success('登陆成功');
        // 跳转路由
        props.history.push("/setting")
        // 获取权限
        permission()
    };
    const permission = async ()=>{
      let data = await getMenuTree()
      console.log(data)
    }
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return (
        <div className={stylelogin.login}>
        <div className={stylelogin.loginForm}>
            <img style={{width:'460px'}} className="left" src={require('@/images/link_bg.png')} alt="logo" />
            <div className={stylelogin.container}>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
          <h2 className="text-center">登录</h2>
        <Form.Item
          label="用户"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
      </div>
      </div>
      </div>
    );
  };
  export default Login