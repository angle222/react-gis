import { Button ,Form, Input,  Checkbox,message} from "antd";
import React, { useState,useEffect } from "react";
import md5 from 'js-md5'
import {userLogin} from '../../api/user';
import "./login.css"
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
      console.log('Success:', values);
        let postData = {
            'username': values.username,
            'password': md5(values.password)
        }
        let data = await userLogin(postData)
        console.log(data)
        message.success('登陆成功');
        // 跳转路由
        console.log(props)
        props.history.push("/setting")
    };
  
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return (
        <div className="login">
        <div className="login-form">
            <img style={{width:'460px'}} className="left" src={require('@/images/link_bg.png')} alt="logo" />
            <div className="container">
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