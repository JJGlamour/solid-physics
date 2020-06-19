import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MinusSquareOutlined,
  DesktopOutlined,
  SmileOutlined
} from '@ant-design/icons';

import { BrowserRouter as Router, Route, Link, HashRouter} from "react-router-dom";
import Home from "./components/home";
import Coordinate from "./components/coordinate";
import OneAtom from "./components/oneatom";
import TwoAtom from  "./components/twoatom";
import Symmetry from './components/symmetry';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: false,
    selectedKey: window.location.hash.substr(1).split('/').pop(),
    openKey: window.location.hash.substr(1).split('/')[1]
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  };

  render() {
    return (
      <Layout style={ { height: "100%"} }>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} width="230px" theme="light">
          <div className="logo" style={ { fontSize: 20, margin: 20, }}><p style={ { whiteSpace: "nowrap", overflow: "hidden" }}>固体物理PROJECT</p></div>
           <HashRouter>
              <Menu mode="inline" defaultSelectedKeys={[ this.state.selectedKey ]} defaultOpenKeys={[ this.state.openKey ]}>
                  <Menu.Item key="home" icon={<DesktopOutlined/>}>
                    <Link to="/home">首页</Link>
                  </Menu.Item>
                  <SubMenu key="crystal" icon={<MinusSquareOutlined />} title="晶体">
                    <Menu.Item key="coordinate"><Link to="/crystal/coordinate">坐标转换</Link></Menu.Item>
                    <Menu.Item key="symmetry"><Link to="/crystal/symmetry">对称操作</Link></Menu.Item>
                    <Menu.Item key="5">and so on</Menu.Item>
                  </SubMenu>
                  <SubMenu key="phonon" icon={<SmileOutlined />} title="声子">
                    <Menu.Item key="one-atom"><Link to="/phonon/one-atom">一维单原子链模拟</Link></Menu.Item>
                    <Menu.Item key="two-atom"><Link to="/phonon/two-atom">一维双原子链模拟</Link></Menu.Item>
                    <Menu.Item key="8">and so on</Menu.Item>
                  </SubMenu>
              </Menu>
            </HashRouter>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '2px 1px',
              padding: 24,
            }}
          >
          <HashRouter>
            <div>
              <Route path="/home" component={Home}></Route>
              <Route path="/crystal/coordinate" component={Coordinate}></Route>
              <Route path="/crystal/symmetry" component={Symmetry}></Route>
              <Route path="/phonon/one-atom" component={OneAtom}></Route>
              <Route path="/phonon/two-atom" component={TwoAtom}></Route>
            </div>
          </HashRouter>
          </Content>
        </Layout>
      </Layout> 
    )
  }
};


export default App;
