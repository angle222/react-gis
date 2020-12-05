import React, { useState } from "react";
// import { connect } from "react-redux";
import { Form, Table, Button ,Modal, Input, DatePicker, Checkbox,Radio,Select,message} from "antd";
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
const Myform1 = (props) => {
  console.log('from组件：',props)
  const {visible,dep,role,formData,isEdit,onCancel,tableFun} = props
  
  // hooks里面的form方法，
  const [form] = Form.useForm();
  
  console.log(Form.useForm())
  // 弹框弹出事件
  if(isEdit){
    form.setFieldsValue(formData)
  }
  const handleOk = e => {
    console.log(e);

    form.validateFields().then((fieldsValue) => {
      if(fieldsValue['validDate']){
        fieldsValue['validDate'] =  fieldsValue['validDate'].format('YYYY-MM-DD')
      }
      fieldsValue.password = md5(fieldsValue.password)
      addUser(fieldsValue).then(res=>{
        console.log(res)
        message.success('添加成功');
        form.resetFields();
        // 刷新列表
        tableFun()
      })
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };
// 弹框取消事件
  const handleCancel = e => {
    // 清空form表单
    form.resetFields()
    onCancel()
    
  };
  return (
    <Modal
          title={isEdit?'编辑数据':'新建数据'}
          visible={visible}
          onOk={handleOk}
          onCancel={onCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              确定
            </Button>,
          ]}
        >
          
        
    <Form
      {...layout}
      name="basic"
      form={form}

    >
      <Form.Item label="用户名" name="username"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item label="登录名" name="username">
        {getFieldDecorator("username",
          {
            rules: [
              {
                required: true,
                message: 'Please input your username!',
              },
            ],
            initialValue: moment(data.StartDate),
          }
                  )(
                    <Input />
                  )}
       
      </Form.Item> */}

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
              dep&&dep.map(d=><Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>)
            }
          </Select>
      </Form.Item>
      <Form.Item label="所属角色" name="roleId">
          <Select>
            {
             role&& role.map(d=><Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>)
            }
          </Select>
      </Form.Item>
      {!isEdit&&
      <div>
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
      </div>
      }
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
        
      {/* <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item> */}
      {/* <input value={value} placeholder="请输入" onChange={(e)=>inputChange(e)} onInput={(e)=>inputChange(e)}/>
      <span>{value}</span> */}
    </Form>
    </Modal>
  );
};
class Myform extends React.Component{
  form = React.createRef();
  handleOk = e => {
    console.log(e);

    this.form.current.validateFields().then((fieldsValue) => {
      if(fieldsValue['validDate']){
        fieldsValue['validDate'] =  fieldsValue['validDate'].format('YYYY-MM-DD')
      }
      fieldsValue.password = md5(fieldsValue.password)
      addUser(fieldsValue).then(res=>{
        console.log(res)
        message.success('添加成功');
        this.form.current.resetFields();
        // 刷新列表
        tableFun()
      })
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };
// 弹框取消事件
  handleCancel = e => {
    // 清空form表单
    this.form.current.resetFields()
    this.props.onCancel()
    
  };
  componentDidMount(){
    console.log('modal加载',this.props.formData)
  }
  componentDidUpdate(){
    console.log('modal更新',this.props.formData,this.props.isEdit,this.props.visible)
    if(this.props.isEdit&&this.props.visible)this.form.current.setFieldsValue(this.props.formData)
  }
  render(){
    const {visible,dep,role,formData,isEdit,onCancel,tableFun} = this.props
    // const { getFieldDecorator } = this.props.form;
    console.log('form属性',this.form)
    return (
      <Modal
            title={isEdit?'编辑数据':'新建数据'}
            visible={visible}
            onOk={this.handleOk}
            onCancel={onCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                取消
              </Button>,
              <Button key="submit" type="primary" onClick={this.handleOk}>
                确定
              </Button>,
            ]}
          >
            
          
      <Form
        {...layout}
        name="basic"
        ref={this.form}
  
      >
        <Form.Item label="用户名" name="username"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item label="登录名" name="username">
          {getFieldDecorator("username",
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ],
              initialValue: moment(data.StartDate),
            }
                    )(
                      <Input />
                    )}
         
        </Form.Item> */}
  
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
                dep&&dep.map(d=><Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>)
              }
            </Select>
        </Form.Item>
        <Form.Item label="所属角色" name="roleId">
            <Select>
              {
               role&& role.map(d=><Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>)
              }
            </Select>
        </Form.Item>
        {!isEdit&&
        <div>
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
        </div>
        }
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
      </Form>
      </Modal>
    );
  }
}
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
      formData:{isAuth:'false'},
      isEdit:false
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
    this.setState({
      loading: true
    });
    let postData = {pageNumber:this.state.pageNumber,pageSize:this.state.pageSize,name:this.state.searchValue}
    let res = await getUserList(postData);
    this.setState({
      visible:false,
      total:res.totalElements,
      dataSource:res.content,
      loading: false
    });
  }
  // 新建弹框
  showModal = () => {
    this.setState({
      visible: true,
      isEdit:false
    });
  }
  setVisible = (val) => {
    this.setState({
      visible: val
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
        visible: true,
        isEdit:true
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
    const {visible,dataSource,pageSize,pageNumber,total,loading ,selectedRowKeys,formData,dep,role,isEdit} = this.state;
    console.log('render',dep)
    const stationStateDict = {
      1:"we",
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
 
        <Myform isEdit={isEdit} dep={dep} role={role} formData={formData} tableFun={this.getData.bind(this)} visible={visible}
        onCancel={() => {
          this.setVisible(false);
        }} />

      </div>
    );
    
  }
}


