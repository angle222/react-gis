import React, { Component } from 'react';
import Header from "../../components/layout/Header"
class MyView extends Component {
  constructor(state){
    super()
        
  }
  render() {
    return (
            <div className="main-content">
                <Header></Header>
                {this.props.children}
            </div>
    );
  }
}

export default MyView;
