import React, { Component } from 'react';
import Header from "../../components/layout/Header"
class MyView extends Component {
    constructor(state){
        super()
        
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <Header></Header>
                {this.props.children}
            </div>
        );
    }
}

export default MyView;
