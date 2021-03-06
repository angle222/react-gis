import React, { Component } from 'react';
import {Route,Link,NavLink} from "react-router-dom"
import User from './User'
import Role from './Role'
import Resource from './Resource'
import Dep from './Dep'
import styleObj from "./Privilege.module.css"
import "./Privilege.css"
const leftList = <ul className="list">
  <li className={styleObj.listItem}><NavLink className="nav-link" activeClassName="nav-active" to='/privilege/user'> 用户管理</NavLink> </li>
  <li className={styleObj.listItem}><NavLink className="nav-link" activeClassName="nav-active" to='/privilege/role'> 角色管理</NavLink></li>
  <li className={styleObj.listItem}><NavLink className="nav-link" activeClassName="nav-active" to='/privilege/resource'> 资源管理</NavLink></li>
  <li className={styleObj.listItem}><NavLink className="nav-link" activeClassName="nav-active" to='/privilege/dep'> 部门管理</NavLink></li>
</ul>
class Privilege extends Component {
  render() {
    return (
      <div className={styleObj.flex}>
        <div className={styleObj.flexLeft}>{leftList}</div>
        <div className={styleObj.flexMain}>
          <Route path='/privilege/user' component={User}/>
          <Route path='/privilege/role' component={Role}/>
          <Route path='/privilege/resource' component={Resource}/>
          <Route path='/privilege/dep' component={Dep}/>
        </div>
      </div>
    );
  }
}

export default Privilege;
