import React, { useState } from "react";
// import { connect } from "react-redux";
import { Table, Button ,Modal,Form, Input,  Checkbox} from "antd";
import "./Menu1.css";
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
      <input value={value} placeholder="请输入" onInput={(e)=>inputChange(e)}/>
      <span>{value}</span>
    </Form>
  );
};
export default class Menu1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataSource:[],
      columns:[],
      selectedRowKeys:[],
      loading:false,
      value:''
    };
  }
  componentDidMount(){
    console.log('componentDidMount')
    // 请求数据
    this.getData()
  }
  getData(){
    this.setState({
      loading: true
    });
    setTimeout(() => {
      this.setState({
        dataSource:[{
          id: '1',
          name: '胡彦斌',
          state:1,
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          id: '2',
          name: '胡彦祖',
          state:2,
          age: 42,
          address: '西湖区湖底公园1号',
        }],
        loading:false
      })
    }, 500);
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
    const {visible,dataSource,loading ,selectedRowKeys} = this.state;
    const stationStateDict = {
      2:'成功',
      1:'失败'
    }
    const formatter = (val, dict) => {
      return val ? dict[val] : ''
    }
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        render:(text, record)=>{

        return <span>{record>18?'已成年':'未成年'}</span>
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (val) => {
          let sate=""
          if(val===1){
            sate="11111"
          }else{
            sate="22222"
          }
          return sate
        }
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
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
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <div className="menu1">
        <input value={this.state.value}  placeholder="请输入" onInput={this.inputChange}/>
        <b>{this.state.value}</b>
        <Button onClick={this.showModal}>新建</Button>
        <Button onClick={this.banchDel}>批量删除</Button>
        <Table bordered loading={loading} rowKey="id" rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
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


