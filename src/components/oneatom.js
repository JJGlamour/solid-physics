import React from "react";
import { InputNumber, Slider, Row, Col, Button } from "antd";


class OneAtom extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            // 默认五个原子
            n: 5,
            // 默认波矢
            q: Math.PI,
            atomsize: 20,
            distance: 100,
            interval: undefined
        };
        this.handleChangeQ = this.handleChangeQ.bind(this);
        this.handleChangeN = this.handleChangeN.bind(this);
        this.handleChangeSize = this.handleChangeSize.bind(this);
        this.handleChangeDistance = this.handleChangeDistance.bind(this);
        this.move = this.move.bind(this);
    }

    handleChangeQ(q) {
        this.setState({ q: q });
    }

    handleChangeN(n) {
        this.setState({ n: n });
        // clearInterval(this.state.interval);
    }
    handleChangeSize(size) {
        this.setState({ atomsize: size })
    }
    handleChangeDistance(dis) {
        this.setState( { distance: dis } )
    }

    move() {
        function moveOneAtom(elem, y) {
            elem.style.bottom = y + "px";
        }
        const q = this.state.q;
        let t = 0;
        let elements = [];

        // 提前找出元素消除时延问题
        for(let i=0; i < this.state.n; i++){
            elements.push(document.querySelector(`#atom${i}`));
        }
        const start = setInterval(() => {
            for(let i = 0; i < this.state.n; i++) {
                let y = Math.cos(q *(i+1)  - (1/50) * Math.abs(Math.sin(q/2)) * t);
                // console.log(y)
                moveOneAtom(elements[i], y * 70);
            }
            t++;
        }, 1);
        console.log(start)
        // this.setState({ interval: start });
    }

    render() {
        // 原子组件
        const state = this.state;
        function Box() {
            const ns = [];
            for(let i = 0; i < state.n; i++) {
                ns.push(i);
            }
            const atoms = ns.map((i) => 
                <div 
                style={{ position: "absolute", width: `${state.atomsize}px`, height: `${state.atomsize}px`,
                background: "blue", bottom: "0px", left: `${state.distance*i}px`, borderRadius: `${state.atomsize/2}px`
                }} key={i} id={`atom${i}`}></div>
            )
            const box = <div style={{ height: "200px", position: "relative" }}>
                { atoms }
            </div>            
            return box
        }

        return (
            <div>
                <Row>
                    <Col span={3} style={{ overflow: "hidden"}}>原子数(0,20)：</Col>
                    <Col span={4}>
                        <InputNumber min={1} max={20} onChange={this.handleChangeN} defaultValue={5}></InputNumber>
                    </Col>
                    <Col span={3} style={{ overflow: "hidden"}}>原子大小：</Col>
                    <Col span={4}>
                        <InputNumber min={10} max={40} onChange={this.handleChangeSize} defaultValue={20}></InputNumber>
                    </Col>
                    <Col span={3} style={{ overflow: "hidden"}}>原子间距：</Col>
                    <Col span={4}>
                        <InputNumber min={50} max={200} onChange={this.handleChangeDistance} defaultValue={100}></InputNumber>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col span={3}>
                        波矢(-π,π)：
                    </Col>
                    <Col span={8}>
                        <Slider min={-Math.PI} max={Math.PI} step={0.01} defaultValue={Math.PI} onChange={this.handleChangeQ} tooltipVisible/>
                    </Col>                                    
                </Row>
                <br></br>
                <Row>
                    <Button type="primary" shape="round" onClick={this.move}>开始</Button>
                    <Box></Box>
                </Row>
            </div>
        )
    }
}

export default OneAtom;