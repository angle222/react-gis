import React from "react";
import "./layout.less";
import { NavLink  } from 'react-router-dom';
import { Row, Col ,Dropdown,Menu} from 'antd';
import {$_menuData} from '../menu';
import {loginOut} from "../../api/user"
import { connect } from "react-redux";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData:[],
      visible: false
    };
  }
  // 生命周期函数
  componentWillMount(){
    // console.log('willmounted')
    const pms = sessionStorage.getItem('premissions')
    
    this.setState({
      menuData: pms?JSON.parse(pms):[]
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
  // 退出事件
  logout = e => {
    console.log("要退出啦")
    loginOut()
  };

  render() {
    // const { homeData={} } = this.props;
    const { img, visible,menuData } = this.state;
    const {mystate} = this.props
    console.log('状态',mystate)
    const listItem = menuData.map(md=>{
      if(md.resourceType==0){
        return  <li key={md.name}> 
        
        <NavLink  to={md.resourceUrl} className="nav-link" activeClassName="nav-active">{md.name}</NavLink> 
      </li>
      }
        
    } 
    )
    const userInfo = sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):null
    const menu = (
      <Menu>
      <Menu.Item><span onClick={this.logout}>退出</span></Menu.Item>
      </Menu>
    );
    return (
      <div className="header">        
        <div className="container">
        <Row>
          <Col span={4} className="logos">
            <img src={require('@/images/logo.png')} alt="logo" />
            <span className="title">景轩地图服务引擎</span>
          </Col>
          <Col span={20}>
              <ul className="list">
              {listItem}
              </ul>
              <Dropdown overlay={menu} trigger={['click']}>
    <span className="user-name">{userInfo?userInfo.name:'未登录'}</span>
                
              </Dropdown>
          </Col>
        </Row>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  // ... 从state中处理的一些数据，以及可选的ownProps
  console.log(state)
  return{
    mystate:state
  }
};
// 这里要定义修改store的方法
const mapDispatchToProps = {
  // ... 通常是action creators构成的对象
  changeName:()=>(
    {
      type:'setName',
      payload:'marry'
    }
    ),
  toggle:()=>{
    return {
      type:'toggle',
    }
  }
};
// 把上面的两个对象当成属性传递到组件中
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(NavBar)