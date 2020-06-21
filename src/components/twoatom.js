import React from "react";
import { InputNumber, Slider, Row, Col, Button } from "antd";
import { CaretRightOutlined } from  "@ant-design/icons";

class TwoAtom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 默认七对原子
            n: 7,
            // 默认波矢
            q: Math.PI,
            atomsize: 20,
            distance: 100,
            // 原子质量比m/M，取M=1，则比例m/M=ratio=m
            ratio: 1
        };
        this.handleChangeQ = this.handleChangeQ.bind(this);
        this.handleChangeN = this.handleChangeN.bind(this);
        this.handleChangeSize = this.handleChangeSize.bind(this);
        this.handleChangeDistance = this.handleChangeDistance.bind(this);
        this.handleChangeRatio = this.handleChangeRatio.bind(this);
        this.move = this.move.bind(this);
    }
    componentWillUnmount() {
        // !!!
        // 不清除则会存在内存泄漏问题，导致页面占用内存过大
        clearInterval(this.timerID);
    }

    // 声学支轻重原子,q为波矢,ratio为m/M,u表示重原子M偏移,v表示轻原子m偏移
    // 为计算简便取得M=1,故m即为ratio
    // 力常数beta
    u_acoustical(q, l, t, ratio, beta) {
        while(Math.abs(q) > Math.PI) {
            q -= 2 * Math.PI;
        }   
        // 重原子振幅
        let A = 1;
        // 色散关系
        let m = ratio;
        let omiga = Math.sqrt(beta * (1+1/m) * (1 - Math.sqrt(1-(4/(m+1/m+2))*Math.sin(q/2)*Math.sin(q/2))));
        return A * Math.cos(q * l - omiga * t);
    }
    v_acoustical(q, l, t, ratio, beta) {
        while(Math.abs(q) > Math.PI) {
            q -= 2 * Math.PI;
        }
        // 轻原子振幅, 在布里渊区边界时候为0
        let B = -(1/Math.PI)*Math.abs(q) + 1;
        let m = ratio;
        let omiga = Math.sqrt(beta * (1+1/m) * (1 - Math.sqrt(1-(4/(m+1/m+2))*Math.sin(q/2)*Math.sin(q/2))));
        return B * Math.cos(q * l - omiga * t);
    }
     
    // 光学支轻重原子
    u_optical(q, l, t, ratio, beta) {
        let m = ratio;
        // 重原子振幅
        while(Math.abs(q) > Math.PI) {
            q -= 2 * Math.PI;
        }
        let A = (m/Math.PI) * Math.abs(q) - m;
        let omiga = Math.sqrt(beta * (1+1/m) * (1 + Math.sqrt(1-(4/(m+1/m+2))*Math.sin(q/2)*Math.sin(q/2))));
        return A * Math.cos(q * l - omiga * t);
    }
    v_optical(q, l, t, ratio, beta) {
        while(Math.abs(q) > Math.PI) {
            q -= 2 * Math.PI;
        }
        let m = ratio;
        let B = 1;
        let omiga = Math.sqrt(beta * (1+1/m) * (1 + Math.sqrt(1-(4/(m+1/m+2))*Math.sin(q/2)*Math.sin(q/2))));
        return B * Math.cos(q * l - omiga * t);
    }

    test() {
        console.log("test function");
    }
    handleChangeQ(q) {
        this.setState({ q: q });
        clearInterval(this.timerID);
    }
    handleChangeRatio(ratio) {
        this.setState({ ratio: ratio });
        clearInterval(this.timerID);
    }
    handleChangeN(n) {
        this.setState({ n: n });
        clearInterval(this.timerID);
    }
    handleChangeSize(size) {
        this.setState({ atomsize: size })
        clearInterval(this.timerID);
    }
    handleChangeDistance(dis) {
        this.setState( { distance: dis } )
        clearInterval(this.timerID);
    }

    move() {
        clearInterval(this.timerID);
        this.test();
        function moveOneAtom(elem, y) {
            elem.style.bottom = y + "px";
        }
        const q = this.state.q;
        const ratio = this.state.ratio;
        let t = 0;
        let atoms_acoustical_M = [];
        let atoms_acoustical_m = [];
        let atoms_optical_M = [];
        let atoms_optical_m = [];
        for( let i=0; i<this.state.n; i++) {
            atoms_acoustical_M.push(document.querySelector(`#atom${i}-M-1`));
            atoms_acoustical_m.push(document.querySelector(`#atom${i}-m-1`));
            atoms_optical_M.push(document.querySelector(`#atom${i}-M-2`));
            atoms_optical_m.push(document.querySelector(`#atom${i}-m-2`));
        }
        this.timerID = setInterval(() => {
            for( let i=0; i<this.state.n; i++) {
                let u_acoustical = this.u_acoustical(q, i+1, t, ratio, 1/1000);
                let v_acoustical = this.v_acoustical(q, i+1, t, ratio, 1/1000);
                let u_optical = this.u_optical(q, i+1, t, ratio, 1/1000);
                let v_optical = this.v_optical(q, i+1, t, ratio, 1/1000);
                moveOneAtom(atoms_acoustical_M[i], u_acoustical * 70);
                moveOneAtom(atoms_acoustical_m[i], v_acoustical * 70);
                moveOneAtom(atoms_optical_M[i], u_optical * 70);
                moveOneAtom(atoms_optical_m[i], v_optical * 70);
            }
            t++;
        }, 1);
        console.log("interval ID: ", this.timerID);
    }

    render() {
        const state = this.state;
        // 声学支
        function Box1() {
            const ns = [];
            for(let i = 0; i < state.n; i++) {
                ns.push(i);
            }
            const atoms = ns.map((i) => 
                <div key={i}>
                    <div 
                    style={{ position: "absolute", width: `${state.atomsize}px`, height: `${state.atomsize}px`,
                    background: "rgb(30 144 255)", bottom: "0px", left: `${state.distance*i}px`, borderRadius: `${state.atomsize/2}px`
                    }} id={`atom${i}-M-1`}></div>

                    <div 
                    style={{ position: "absolute", width: `${state.atomsize/2}px`, height: `${state.atomsize/2}px`,
                    background: "red", bottom: "5px", left: `${state.distance*(i+0.5)}px`, borderRadius: `${state.atomsize/4}px`
                    }} id={`atom${i}-m-1`}></div>
                </div>
            )
            const box = <div style={{ height: "130px", position: "relative" }}>
                { atoms }
            </div>            
            return box
        }
        // 光学支
        function Box2() {
            const ns = [];
            for(let i = 0; i < state.n; i++) {
                ns.push(i);
            }
            const atoms = ns.map((i) => 
                <div key={i}>
                    <div 
                    style={{ position: "absolute", width: `${state.atomsize}px`, height: `${state.atomsize}px`,
                    background: "rgb(30 144 255)", bottom: "0px", left: `${state.distance*i}px`, borderRadius: `${state.atomsize/2}px`
                    }} id={`atom${i}-M-2`}></div>

                    <div 
                    style={{ position: "absolute", width: `${state.atomsize/2}px`, height: `${state.atomsize/2}px`,
                    background: "red", bottom: "5px", left: `${state.distance*(i+0.5)}px`, borderRadius: `${state.atomsize/4}px`
                    }} id={`atom${i}-m-2`}></div>
                </div>
            )
            const box = <div style={{ height: "130px", position: "relative" }}>
                { atoms }
            </div>            
            return box
        }
        return (
            <div>
                <Row>
                    <Col span={3} style={{ overflow: "hidden"}}>原子对数(0,200)：</Col>
                    <Col span={4}>
                        <InputNumber min={1} max={200} onChange={this.handleChangeN} defaultValue={7}></InputNumber>
                    </Col>
                    <Col span={3} style={{ overflow: "hidden"}}>原子大小：</Col>
                    <Col span={4}>
                        <InputNumber min={3} max={100} onChange={this.handleChangeSize} defaultValue={20}></InputNumber>
                    </Col>
                    <Col span={3} style={{ overflow: "hidden"}}>原子间距：</Col>
                    <Col span={4}>
                        <InputNumber min={10} max={300} onChange={this.handleChangeDistance} defaultValue={100}></InputNumber>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col span={3}>
                        波矢(-π,π)：
                    </Col>
                    <Col span={6}>
                        <Slider min={-Math.PI} max={Math.PI} step={0.01} defaultValue={Math.PI} onChange={this.handleChangeQ} tooltipVisible/>
                    </Col>    
                    <Col span={2}></Col>
                    <Col span={3}>
                        原子质量比m/M：
                    </Col>
                    <Col span={6}>
                        <Slider min={0} max={1} step={0.01} defaultValue={1} onChange={this.handleChangeRatio} tooltipVisible/>
                    </Col>                                  
                </Row>
                <br></br>
                <Row>
                    <Button type="primary" shape="round" onClick={this.move} icon={<CaretRightOutlined />}>开始模拟</Button>
                </Row>
                <Row><br></br>声学支：</Row>
                <Row>
                    <Box1></Box1>
                </Row>
                <Row style={{position: "relative", height: "130px"}}><div style={{position: "absolute", bottom: 0}}>光学支：</div></Row>
                <Row>
                    <Box2></Box2>
                </Row>
                <Row>
                    <div style={{ position: "relative", top: "120px", background: "#fff"}}>
                        <p>备注：</p>
                        <p>
                            1. 在一维双原子链中，色散关系为<span style={{color: "red"}}>ω±²(q)=β×((m+M)/(m×M))×﹛1±[1-4mM/(m+M)²×sin²(qa/2)]^½﹜</span>；此处取晶格常数a=1，重原子质量M=1(故m/M=m)，力常数β=1/1000(β取值大小是根据页面显示效果来决定的)，于是
                            色散关系为<span style={{color: "red"}}>ω±²(q)=(1/1000)×(1+1/m)×﹛1±[1-4/(2+m+1/m)×sin²(q/2)]^½﹜</span>；
                        </p>
                        <p>
                            2. 在判定色散关系的基础上，根据格波解<span style={{color: "red"}}>u=A×exp[i×(qla-ωt)]</span>、<span style={{color: "red"}}>v=B×exp[i×(qla-ωt)]</span>来模拟原子振动情况；
                        </p>
                        <p>
                            3. 晶格常数取a=1，故波矢q取值范围为-π到π；
                        </p>
                        <p>
                            4. 参数中的原子大小和原子间距均为页面展示效果；
                        </p>
                    </div>
                </Row>
            </div>
        )
    }
}

export default TwoAtom;