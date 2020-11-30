import React, { useState } from "react";
// import { connect } from "react-redux";
import { Table, Button ,Modal,Form, Input,  Checkbox} from "antd";
import "./TokenGrant.css";
import {getUserList} from "../../api/user"
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
const Myform = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const [value,setValue] = useState()
  function inputChange(e){
    console.log(e.target,e.target.value)
    setValue(e.target.value)
  }
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
      {/* <input value={value} placeholder="请输入" onChange={(e)=>inputChange(e)} onInput={(e)=>inputChange(e)}/>
      <span>{value}</span> */}
    </Form>
  );
};
// export default Myform
export default class MapService extends React.Component {
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
      searchValue:''
    };
  }
  componentDidMount(){
    console.log('componentDidMount')
    getUserList().then((res)=>{
      console.log(res)
    })
    // 请求数据
    this.getData()
  }
  async getData(){
    this.setState({
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
  showModal = () => {
    this.setState({
      visible: true
    });
  };

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
  banchDel = ()=>{
    // 批量删除
    const {selectedRowKeys} = this.state;
    console.log('要删除的行',selectedRowKeys)
  }
  singleDel = (id)=>{
    // 批量删除
    return function(){
      console.log('要删除的行',id)
    }
    
  }
  onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
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
    console.log('render')
    const {visible,dataSource,pageSize,pageNumber,total,loading ,selectedRowKeys} = this.state;
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
            <a className="ant-dropdown-link">
              更多 
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
          <Myform/>
        </Modal>
      </div>
    );
    
  }
}


