import React from "react";
// import { connect } from "react-redux";
// import { Modal, Button } from "antd";
// import "./index.less";
import store from "../../store/redux";
import { connect } from "react-redux";
class Menu4 extends React.Component {
  componentDidMount() {
    // console.log()
    store.subscribe(() => {
      console.log("订阅subscribe",store.getState());
      // this.forceUpdate();
      this.setState({});
    });
  }
  add=()=>{
    store.dispatch({type:'setName',payload:'lily',other:'aaa'})
  }
  minus=()=>{
    let {isShow} = store.getState()
    store.dispatch({type:'toggle',payload:!isShow,other:'vvv'})
  }
  render() {
    let {name,isShow} = store.getState()
    console.log("store", store.getState());
    return (
      <div>
        <h1>ReduxPage</h1>
        <p>{name}</p>
        {isShow&&<div>显示</div>}
        <button onClick={this.add}>changeName</button>
        <button onClick={this.minus}>toggle</button>
        <button onClick={this.stayStatic}>static</button>
      </div>
    );
  }
}
class Menu2 extends React.Component {
  render() {
    const {changeName,toggle,state} = this.props
    return <div>
      <h1>react-redux</h1>
     <div>{state.name}</div>
      {state.isShow&&<div>显示</div>}
      <button onClick={changeName}>changeName</button>
      <button onClick={toggle}>toggle</button>
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  // ... 从state中处理的一些数据，以及可选的ownProps
  console.log(state)
  return{
    state:state
  }
};

const mapDispatchToProps = {
  // ... 通常是action creators构成的对象
  changeName:()=>{
    return {
      type:'setName',
      payload:'marry'
    }
  },
  toggle:()=>{
    return {
      type:'toggle',
    }
  }
};
// console.log(mapDispatchToProps)
// `connect`返回一个新的函数，可以接收一个待包装的组件
// const connectToStore = connect(
//   mapStateToProps,
//   mapDispatchToProps
// );
// 上面的函数能够返回一个已经包装、连接过的组件


export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Menu2)