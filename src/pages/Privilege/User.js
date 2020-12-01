import React, { useState } from "react";
// import { connect } from "react-redux";
import { Form, Table, Button ,Modal, Input, DatePicker, Checkbox,Radio,
  Select,message} from "antd";
import "./Privilege.module.css";
import {getUserList,getRole,getDepart,addUser,delUser,batchDelUser,findUser} from "../../api/user"
import md5 from 'js-md5'
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 18,
  },
};
const Myform = (props) => {
  console.log(props)
  const {dep,role,formData} = props
  
  // hooks里面的form方法，
  const [form] = Form.useForm();
  // 弹出框之后默认选中某个值
  form.setFieldsValue({
    isAuth: 'false',
  });
  Object.keys(formData).forEach(fd=>{
    form.setFieldsValue({
      [fd]: formData[fd],
    });
  })
  // 表单提交成功方法
  const onFinish = fieldsValue => {
    console.log('Success:', fieldsValue);
    if(fieldsValue['validDate']){
      fieldsValue['validDate'] =  fieldsValue['validDate'].format('YYYY-MM-DD')
    }
    fieldsValue.password = md5(fieldsValue.password)
    addUser(fieldsValue).then(res=>{
      console.log(res)
      message.success('添加成功');
      // 刷新列表
      tableFun()
    })
  };
  // 表单提交失败方法
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="登录名" name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="用户名" name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="所属部门" name="deptIds">
          <Select allowClear mode="multiple">
            {
              dep.map(d=><Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>)
            }
          </Select>
      </Form.Item>
      <Form.Item label="所属角色" name="roleId">
          <Select>
            {
              role.map(d=><Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>)
            }
          </Select>
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
      <Form.Item
        label="确认密码"
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
      <Form.Item label="用户权限" name="isAuth">
          <Radio.Group>
            <Radio value="true">受限</Radio>
            <Radio value="false">不受限</Radio>
          </Radio.Group>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.isAuth !== currentValues.isAuth}
      >
        {
        ({ getFieldValue }) => {
          return getFieldValue('isAuth') === 'true' ? (
            <div>
              <Form.Item label="生效日期" name="validDate">
                <DatePicker />
              </Form.Item>
              <Form.Item label="有效期" name="valid">
                <Select>
                  <Select.Option value="30">30天</Select.Option>
                  <Select.Option value="60">60天</Select.Option>
                  <Select.Option value="90">90天</Select.Option>
                </Select>
              </Form.Item>
            </div>
          ) : null;
        }
        }
      </Form.Item>
        
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
      {/* <input value={value} placeholder="请输入" onChange={(e)=>inputChange(e)} onInput={(e)=>inputChange(e)}/>
      <span>{value}</span> */}
    </Form>
  );
};
// export default Myform
export default class Myuser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataSource:[],
      columns:[],
      selectedRowKeys:[],
      pageNumber:1,
      pageSize: 10,
      total:0,
      loading:false,
      searchValue:'',
      formData:null
    };
  }
  componentDidMount(){
    console.log('componentDidMount')
    getUserList().then((res)=>{
      console.log(res)
    })
    // 请求数据
    this.getData()
    // 获取部门列表    
    // 获取角色列表
    this.getUserData()
  }
  // 表格数据
  async getData(){
    console.log(this)
    this.setState({
      visible:false,
      loading: true
    });
    console.log(this.state.searchValue)
    let postData = {pageNumber:this.state.pageNumber,pageSize:this.state.pageSize,name:this.state.searchValue}
    let res = await getUserList(postData);
    console.log(res)
    this.setState({
      total:res.totalElements,
      dataSource:res.content,
      loading: false
    });
  }
  // 新建弹框
  showModal = () => {
    this.setState({
      visible: true
    });
  }
  // 获取新增用户需要的数据
  async getUserData(){
    let dep = await getDepart()
    let role = await getRole()
    this.setState({
      dep,
      role
    });
  }
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  banchDel = async ()=>{
    // 批量删除
    const {selectedRowKeys} = this.state;
    await batchDelUser({ids:selectedRowKeys})
    message.success('删除成功')
    this.getData()
    console.log('要删除的行',selectedRowKeys)
  }
  // 单个删除
  singleDel = (id)=>{
    const self = this;
    // 批量删除
    return async function(){
      console.log('要删除的行',id)
      await delUser(id)
      message.success('删除成功')
      self.getData()
    }
    
  }
  // 编辑
  edit = (id)=>{
    return async ()=>{
      let data = await findUser(id)
      this.setState({
        formData:data,
        visible: true
      });
    }  
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  inputChange=(e)=>{
    console.log(e.target,e.target.value)
    this.setState({
      value : e.target.value
  })
  }
  render() {
    // const { homeData={} } = this.props;
    const {visible,dataSource,pageSize,pageNumber,total,loading ,selectedRowKeys,formData,dep,role} = this.state;
    
    const stationStateDict = {
      2:'成功',
      1:'失败'
    }
    const formatter = (val, dict) => {
      return val ? dict[val] : ''
    }
    const columns = [
      {
        title: '登录名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: '所属部门',
        dataIndex: 'deptNames',
        key: 'deptNames',
        render: (deps) => (
          <div>
          {deps.map(dep => {
            return (
              <span className="block" key={dep}>{dep}</span>
            );
          })}
          </div>
         
        )
      },
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: '创建事件',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
        key: 'action',
        sorter: true,
        render: (text, record) => (
          
          <span>
            <a onClick={this.singleDel(record.id)} style={{ marginRight: 16 }}>删除</a>
            <a onClick={this.edit(record.id)} style={{ marginRight: 16 }} >
              编辑 
            </a>
          </span>
        ),
      },
    ];
    const pagination = {
      pageSize,
      current:pageNumber,
      total:total,
      onChange:()=>{

      }
    }
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const { Search } = Input;
    const onSearch = value =>{
      
      this.setState({searchValue:value},function(){
        this.getData()
      });
      
    } 
    return (
      <div className="content">
        <div className="toolbar">
        <Button type="primary" onClick={this.showModal}>新建</Button>
        <Button type="danger"  onClick={this.banchDel}>批量删除</Button>
        <Search
          placeholder="输入关键词搜索"
          allowClear
          onSearch={onSearch}
          style={{ width: 200, margin: '0 10px' }}
        />
        </div>
        {/* <input value={this.state.value}  placeholder="请输入" onChange={this.inputChange} onInput={this.inputChange}/> */}
        <b>{this.state.value}</b>
        
        <Table bordered loading={loading} rowKey="id" rowSelection={rowSelection} dataSource={dataSource} pagination={pagination} columns={columns} />
        <Modal
          title="新建数据"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              确定
            </Button>,
          ]}
        >
          <Myform dep={dep} role={role} formData={formData} tableFun={this.getData.bind(this)} />
        </Modal>
      </div>
    );
    
  }
}


