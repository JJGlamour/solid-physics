import React from "react";
import { Button } from "antd";


class Home extends React.Component {
   render() {
       return (
           <div>
               <h3>站点功能介绍：</h3>
               <p>
                1. 实现任意元胞中原子直角坐标和分数坐标的转换；
               </p>
               <p>
                   2. 模拟展示一维单原子链和一维双原子链的振动模式；
               </p>
               <br></br>
               <h3>
                   备注：
               </h3>
               <p>
                    1. 进行原子振动模拟时，每一毫秒计算并渲染一次原子位置，当原子数量过多(如数百个)、浏览器垃圾回收较慢时，该页面可能会占据较大资源；    
               </p>
               <p>
                   2. 计算及模拟的公式均来自于教材-固体物理学，胡安，章维益，第二版；
               </p>
               <p>
                   3. 由于本程序依赖JavaScript的新标准(ECMAScript 6.0)中的部分特有类型，故该程序暂不兼容IE 11(对JS新标准实现不规范)及以下版本的旧浏览器与设备；
               </p>
               <p>
                   4. 项目源码：<Button href="https://github.com/JJGlamour/solid-physics" target="blank" type="link">https://github.com/JJGlamour/solid-physics</Button>
               </p>
               <p>
                   5. 有问题联系QQ：88106827。
               </p>
           </div>
       )
   }
}

export default Home;