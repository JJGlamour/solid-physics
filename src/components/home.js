import React from "react";

class Home extends React.Component {
   render() {
       return (
           <div>
               <h3>声子相关</h3>
               <p>
                   1. 进行原子振动模拟时，每一毫秒计算并渲染一次原子位置，若原子数量过多，该页面可能会占据较大资源
               </p>
           </div>
       )
   }
}

export default Home;