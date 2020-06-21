 import React from "react";
 import { Row, InputNumber } from "antd";

 class Coordinate extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
            x1: 2.13,
            y1: -1.23,
            z1: 0,
            x2: 0,
            y2: 2.46,
            z2: 0,
            x3: 0,
            y3: 0,
            z3: 1,
            // 分数坐标
            a: 0,
            b: 0,
            c: 0,
            // 直角坐标
            x: 0,
            y: 0,
            z: 0
         }
         this.onChangex1 = this.onChangex1.bind(this);
         this.onChangey1 = this.onChangey1.bind(this);
         this.onChangez1 = this.onChangez1.bind(this);
         this.onChangex2 = this.onChangex2.bind(this);
         this.onChangey2 = this.onChangey2.bind(this);
         this.onChangez2 = this.onChangez2.bind(this);
         this.onChangex3 = this.onChangex3.bind(this);
         this.onChangey3 = this.onChangey3.bind(this);
         this.onChangez3 = this.onChangez3.bind(this);
         this.onChangea = this.onChangea.bind(this);
         this.onChangeb = this.onChangeb.bind(this);
         this.onChangec = this.onChangec.bind(this);
         this.onChangex = this.onChangex.bind(this);
         this.onChangey = this.onChangey.bind(this);
         this.onChangez = this.onChangez.bind(this);    
     }
     onChangex1(x1) {
        this.setState({ x1: x1});
     }
     onChangey1(y1) {
        this.setState({ y1: y1});
     }
     onChangez1(z1) {
        this.setState({ z1: z1});
     }
     onChangex2(x2) {
        this.setState({ x2: x2});
     }
     onChangey2(y2) {
        this.setState({ y2: y2});
     }
     onChangez2(z2) {
        this.setState({ z2: z2});
     }
     onChangex3(x3) {
        this.setState({ x3: x3});
     }
     onChangey3(y3) {
        this.setState({ y3: y3});
     }
     onChangez3(z3) {
        this.setState({ z3: z3});
     }
    //  每次变换abc均触发xyz改变
     getxyz() {
        let a = this.state.a;
        let b = this.state.b;
        let c = this.state.c;
        let x1 = this.state.x1;
        let x2 = this.state.x2;
        let x3 = this.state.x3;
        let y1 = this.state.y1;
        let y2 = this.state.y2;
        let y3 = this.state.y3;
        let z1 = this.state.z1;
        let z2 = this.state.z2;
        let z3 = this.state.z3;
        this.setState({ x: x1*a + x2*b + x3*c, y: y1*a + y2*b + y3*c, z: z1*a + z2*b + z3*c });
     }
    //  每次变换xyz均触发abc改变
     getabc() {
        let x = this.state.x;
        let y = this.state.y;
        let z = this.state.z;
        let x1 = this.state.x1;
        let x2 = this.state.x2;
        let x3 = this.state.x3;
        let y1 = this.state.y1;
        let y2 = this.state.y2;
        let y3 = this.state.y3;
        let z1 = this.state.z1;
        let z2 = this.state.z2;
        let z3 = this.state.z3;
        // 行列式的值
        debugger;
        let A = x1*y2*z3 + x2*y3*z1 +　x3*y1*z2 - x3*y2*z1 - x1*y3*z2 - x2*y1*z3;
        console.log("|A|=",A);
        // 根据伴随矩阵计算逆矩阵元素
        let x1_ = (y2*z3 - y3*z2)/A;
        let x2_ = -(x2*z3 - x3*z2)/A;
        let x3_ = (x2*y3 - x3*y2)/A;
        console.log(x1_, x2_, x3_);
        let y1_ = -(y1*z3 - y3*z1)/A;
        let y2_ = (x1*z3 - x3*z1)/A;
        let y3_ = -(x1*y3 - x3*y1)/A;
        console.log(y1_, y2_, y3_);
        let z1_ = (y1*z2 - y2*z1)/A;
        let z2_ = -(x1*z2 - x2*z1)/A;
        let z3_ = (x1*y2 - x2*y1)/A;
        console.log(z1_, z2_, z3_);
        // 算出abc
        let a = x1_*x + x2_*y + x3_*z;
        let b = y1_*x + y2_*y + y3_*z;
        console.log("b=",b)
        let c = z1_*x + z2_*y + z3_*z;
        this.setState({ a:a, b:b, c:c })
     }

     onChangea(a) {
         this.setState({a:a});
         this.getxyz();
     }
     onChangeb(b) {
         this.setState({b:b});
         this.getxyz();
     }
     onChangec(c) {
        this.setState({c:c});
        this.getxyz();
     }
     onChangex(x) {
         this.setState({x:x});
         this.getabc();
     }
     onChangey(y) {
         this.setState({y:y});
         this.getabc();
     }
     onChangez(z) {
         this.setState({z:z});
         this.getabc();
     }  
    render() {
        return (
            <div>
                <Row><h3>直角坐标与分数坐标转换：</h3></Row>
                <br></br>
                <Row>初基元胞三个基矢：</Row>
                <Row style={{ fontSize: "20px" }}>a = (x1, y1, z1) = (<InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangex1 } value={this.state.x1}/>, 
                    <InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangey1 } value={this.state.y1}/>, <InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangez1 } value={this.state.z1}/>)
                </Row>
                <Row style={{ fontSize: "20px" }}>b = (x2, y2, z2) = (<InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangex2 } value={this.state.x2}/>, 
                    <InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangey2 } value={this.state.y2}/>, <InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangez2 } value={this.state.z2}/>)
                </Row>
                <Row style={{ fontSize: "20px" }}>c = (x3, y3, z3) = (<InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangex3 } value={this.state.x3}/>, 
                    <InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangey3 } value={this.state.y3}/>, <InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangez3 } value={this.state.z3}/>)
                </Row>
                <br></br>
                <Row>分数坐标</Row>
                <Row style={{ fontSize: "20px" }}>(<InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangea } value={this.state.a}/>, 
                    <InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangeb } value={this.state.b}/>, <InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangec } value={this.state.c}/>)
                </Row>
                <Row style={{paddingLeft: "130px"}}><br></br>
                ↑↓
                </Row>
                <Row><br></br>直角坐标</Row>
                <Row style={{ fontSize: "20px" }}>(<InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangex } value={this.state.x}/>, 
                    <InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangey } value={this.state.y}/>, <InputNumber min={-100} max={100} step={0.1} onChange={ this.onChangez } value={this.state.z}/>)
                </Row>
                <br></br><br></br><br></br><br></br>
                <Row>
                    <div>
                        <p>备注：</p>
                        <p>
                            1. 在首先确定初基元胞的三个基矢以后，每次改变分数坐标(或直角坐标)，就会获得相应的直角坐标(或分数坐标)；
                        </p>
                    </div>

                </Row>
            </div>
        )
    }
}

 export default Coordinate;