import {Button, Layout, Menu, theme} from "antd";
import {Content, Footer, Header} from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import {gray} from "@ant-design/colors";
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";

export default function DefaultLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { token: {colorBgContainer}, } = theme.useToken();

    return (
        <Layout hasSider>
            <Sider
                breakpoint='lg'
                collapsedWidth='0'
            >
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        color: 'lightgray',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    백오피스
                </div>
                <Menu
                    theme='dark'
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    items={[{
                        key: '1',
                        icon: <UserOutlined />,
                        label: '사용자 관리'
                    }]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer}}/>
                <Content
                    style={{
                        margin: '24px 16px 0',
                        padding: 24,
                        minHeight: 780,

                    }}
                >
                    <main
                        style={{
                            padding: 25,
                            height: '100%',
                            background: colorBgContainer
                        }}>
                        {children}
                    </main>
                </Content>
                <Footer style={{textAlign: 'right'}}>©2023 Created by me</Footer>
            </Layout>
        </Layout>
    )
}