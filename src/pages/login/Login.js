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
    let newArry = []
    const onFinish = async values => {
        let postData = {
            'username': values.username,
            'password': md5(values.password)
        }
        let data = await userLogin(postData)
        console.log(setCookie,data);
        setCookie('dataUser',`COOKIE_USER_TICKET_DATAGDSW_${data}`)
        message.success('登录成功');
        // 获取用户和权限
        permission()
    };
    const permission = async ()=>{
      let userInfo = await getUserInfo()
      let menudata = await getMenuTree()
      // 把属性菜单结构化为list
      beList(menudata)
      sessionStorage.setItem('premissions', JSON.stringify(newArry))
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      // 获取首页菜单
      let indexUrl = await getIndexUrl()
      // 跳转路由
      props.history.push(indexUrl)
    }
    // 获取首页
    const getIndexUrl = ()=> {
      return new Promise(resolve => {
        let temp = newArry.filter(temp => {
          return parseInt(temp.resourceType) === 0
        })
        let index = temp.filter(index => {
          return index.resourceUrl === '/workspace'
        })
        if (temp.length === 0) {
          return '/403'
        } else if (index.length === 0) {
          index = temp[0]
        } else {
          index = index[0]
        }
        resolve(index.resourceUrl)
      })
    }
    const beList=(data)=> {
      for (var i = 0; i < data.length; i++) {
        if (data[i].childs.length > 0) {
          beList(data[i].childs)
          data[i].childs = []
        }
        newArry.push(data[i])
      }
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