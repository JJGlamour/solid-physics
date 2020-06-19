import React from "react";
import { InputNumber, Slider, Row, Col, Button } from "antd";
import { CaretRightOutlined } from  "@ant-design/icons";

class TwoAtom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 默认五个原子
            n: 5,
            // 默认波矢
            q: Math.PI,
            atomsize: 20,
            distance: 100,
        };
        this.handleChangeQ = this.handleChangeQ.bind(this);
        this.handleChangeN = this.handleChangeN.bind(this);
        this.handleChangeSize = this.handleChangeSize.bind(this);
        this.handleChangeDistance = this.handleChangeDistance.bind(this);
        this.move = this.move.bind(this);
    }

    handleChangeQ(q) {
        this.setState({ q: q });
        // clearInterval(this.timerID);
    }

    handleChangeN(n) {
        this.setState({ n: n });
        // clearInterval(this.timerID);
    }
    handleChangeSize(size) {
        this.setState({ atomsize: size })
        // clearInterval(this.timerID);
    }
    handleChangeDistance(dis) {
        this.setState( { distance: dis } )
        // clearInterval(this.timerID);
    }

    move() {
        console.log("movemove");
    }

    render() {
        const state = this.state;
        function Box() {
            const ns = [];
            for(let i = 0; i < state.n; i++) {
                ns.push(i);
            }
            const atoms = ns.map((i) => 
                <div key={i}>
                    <div 
                    style={{ position: "absolute", width: `${state.atomsize}px`, height: `${state.atomsize}px`,
                    background: "blue", bottom: "0px", left: `${state.distance*i}px`, borderRadius: `${state.atomsize/2}px`
                    }} id={`atom${i}-M`}></div>

                    <div 
                    style={{ position: "absolute", width: `${state.atomsize/2}px`, height: `${state.atomsize/2}px`,
                    background: "red", bottom: "5px", left: `${state.distance*(i+0.5)}px`, borderRadius: `${state.atomsize/4}px`
                    }} id={`atom${i}-m`}></div>
                </div>
            )
            const box = <div style={{ height: "200px", position: "relative" }}>
                { atoms }
            </div>            
            return box
        }

        return (
            <div>
                <Row>
                    <Col span={3} style={{ overflow: "hidden"}}>原子对数(0,30)：</Col>
                    <Col span={4}>
                        <InputNumber min={1} max={30} onChange={this.handleChangeN} defaultValue={5}></InputNumber>
                    </Col>
                    <Col span={3} style={{ overflow: "hidden"}}>原子大小：</Col>
                    <Col span={4}>
                        <InputNumber min={5} max={80} onChange={this.handleChangeSize} defaultValue={20}></InputNumber>
                    </Col>
                    <Col span={3} style={{ overflow: "hidden"}}>原子间距：</Col>
                    <Col span={4}>
                        <InputNumber min={30} max={300} onChange={this.handleChangeDistance} defaultValue={100}></InputNumber>
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
                    <Button type="primary" shape="round" onClick={this.move} icon={<CaretRightOutlined />}>开始</Button>
                    <Box></Box>
                </Row>
                <Row>
                    <div style={{ position: "relative", top: "120px"}}>
                        <p>备注：</p>
                        <p>
                            1. 在一维双原子链中，取晶格常数a=1，故第一布里渊区中波矢取值范围为-π到π；
                        </p>
                        <p>
                            2. 参数中的原子大小和原子间距均为页面展示效果；
                        </p>
                    </div>
                </Row>
            </div>
        )
    }
}

export default TwoAtom;