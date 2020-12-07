import React, { Component } from 'react'
import {connect} from 'react-redux'
class HomePage extends Component {
  render() {
    console.log('homePage',this.props)
    return (
      <div>
        <h2>HomePage</h2>
      </div>
    )
  }
}
const mapStateToProps = (state)=>({
  isLogin:state.isLogin
})
export default connect(mapStateToProps)(HomePage)