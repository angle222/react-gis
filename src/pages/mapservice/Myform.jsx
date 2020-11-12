import { Button ,Form, Input,  Checkbox} from "antd";
import React, { useState,useEffect } from "react";
import axios from 'axios';
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
  const Myform = (myval) => {
    console.log('form',myval)
    const onFinish = values => {
      console.log('Success:', values);
    //   传值给子组件
    myval.handleEmail('我是父组件传给你的值')
      axios.post("/crawler/user/login",values)
    };
  
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    const [value,setValue] = useState()
    const [count,setCount] = useState(0)
    function inputChange(e){
      console.log(e.target,e.target.value)
      setValue(e.target.value)
    }
    useEffect(() => {
        // let timer = setInterval(()=>{
           
        //    setCount(count+1)
        // },1000)
        // return ()=>{
        //     clearInterval(timer)
        // }
      });
      useEffect(() => {
     
      })
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户"
          name="myname"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
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
              message: 'Please input your password!',
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
        <input value={value} placeholder="请输入" onInput={(e)=>inputChange(e)}/>
        <span>{value}</span>
        <Button type="primary" htmlType="button">
            计时器{count}
        </Button>
      </Form>
    );
  };
  export default Myform