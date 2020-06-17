import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  TeamOutlined,
  DesktopOutlined,
  PieChartOutlined
} from '@ant-design/icons';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  };

  render() {
    return (
      <Layout style={ { height: "100%"} }>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} width="250px">
          <div className="logo" style={ { textAlign: "left", color: "white", fontSize: 20, margin: 20}}>固体物理PROJECT</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<DesktopOutlined/>}>
                首页
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="晶体">
                <Menu.Item key="3">坐标转换</Menu.Item>
                <Menu.Item key="4">对称操作</Menu.Item>
                <Menu.Item key="5">and so on</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="声子">
                <Menu.Item key="6">一维单原子链模拟</Menu.Item>
                <Menu.Item key="7">一维双原子链模拟</Menu.Item>
                <Menu.Item key="8">and so on</Menu.Item>
              </SubMenu>
          </Menu>
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
            Contenttest
          </Content>
        </Layout>
      </Layout> 
    )
  }
};


export default App;
