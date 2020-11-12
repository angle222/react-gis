import React from "react";
// import { connect } from "react-redux";
// import { Modal, Button } from "antd";
// import "./index.less";
function Footer(){
  return  (<div className="footer">
        
  <p>版权所有by郑州小蚂蚁科技有限公司所有</p>
</div>)
}
export default Footer
// export default class Footer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visible: false,
//       img:
//         "https://orig00.deviantart.net/95a9/f/2012/363/6/4/pixel_duck_by_pixeldinosaur-d5pkk28.png"
//     };
//   }

//   showModal = () => {
//     this.setState({
//       visible: true
//     });
//   };

//   handleOk = e => {
//     console.log(e);
//     this.setState({
//       visible: false
//     });
//   };

//   handleCancel = e => {
//     console.log(e);
//     this.setState({
//       visible: false
//     });
//   };

//   render() {
//     // const { homeData={} } = this.props;
//     const { img, visible } = this.state;
    
//     return (
//       <div className="footer">
        
//         <p>版权所有by郑州小蚂蚁科技有限公司所有</p>
//       </div>
//     );
//   }
// }