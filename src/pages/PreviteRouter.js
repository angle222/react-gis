import React, { Component } from 'react'
import { Route,Redirect } from 'react-router-dom';
import {connect} from 'react-redux'

class PreviteRouter extends Component {
  render() {
    console.log('previte',this.props)
    const {component:Cmp,isLogin,...rest} = this.props;
    console.log('component',rest)
    // const isLogin = true
    return (
      <Route {...rest} render={props => isLogin ? (<Cmp {...props} />) : (<Redirect to={{ pathname: "/login", state: { redirect: props.location.pathname }, }} />)} />
    )
  }
}

export default connect(
  state=>({
    isLogin:state.isLogin
  })
)(PreviteRouter)