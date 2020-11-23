import React from "react";
// import { connect } from "react-redux";
// import { Modal, Button } from "antd";
import "./layout.less";
import { NavLink  } from 'react-router-dom';
import { Row, Col } from 'antd';
import {$_menuData} from '../menu';
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData:$_menuData,
      visible: false,
      img:
        "https://orig00.deviantart.net/95a9/f/2012/363/6/4/pixel_duck_by_pixeldinosaur-d5pkk28.png"
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

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
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
          </Col>
        </Row>
        

          
        </div>
      </div>
    );
  }
}