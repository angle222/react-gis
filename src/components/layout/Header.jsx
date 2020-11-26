import React from "react";
import "./layout.less";
import { NavLink  } from 'react-router-dom';
import { Row, Col ,Dropdown,Menu} from 'antd';
import {$_menuData} from '../menu';
import {loginOut} from "../../api/user"
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData:$_menuData,
      visible: false
    };
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
    const listItem = menuData.map(md=>
      <li key={md.name}> 
        <i className={md.icon}></i> 
        <NavLink  className="nav-link"  to={md.route}  activeClassName="nav-active">{md.name}</NavLink> 
      </li> 
    )
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
                <span className="user-name">用 户</span>
                
              </Dropdown>
          </Col>
        </Row>
        </div>
      </div>
    );
  }
}