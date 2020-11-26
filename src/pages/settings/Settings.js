import React from "react";
// import { Modal, Button } from "antd";
// import "./index.less";
import store from "../../store/redux";
import { connect } from "react-redux";
import { Link,Route  } from 'react-router-dom';
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
      <h1>settings页面，展示redux</h1>
     <button> <Link to="/setting/set1">设置1</Link> </button>
     <button><Link to="/setting/set2">设置2</Link></button>
     <button><Link to="/setting/set3">设置3</Link></button>
     <Route path='/setting/set1' render={props=><div>设置1的内容</div>}/>
     <Route path='/setting/set2' render={props=><div>设置2的内容</div>}/>
     <Route path='/setting/set3' render={props=><div>设置3的内容</div>}/>
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