import {Button, Layout, Menu, Space, theme} from "antd";
import {Content, Footer, Header} from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import {gray} from "@ant-design/colors";
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useRouter} from "next/router";

export default function DefaultLayout({ children } : { children: React.ReactNode}) {
    const [collapsed, setCollapsed] = useState(false);
    const { token: {colorBgContainer}, } = theme.useToken();

    const router = useRouter();

    function onClickLogout() : void {
        document.cookie += '=; max-age=-1;';
        router.push('/login');
    }

    function onSelectMenu() : any {
    }

    return (
        <Layout hasSider>
            <Sider
                theme='light'
                breakpoint='lg'
                collapsedWidth='0'
            >
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'lightgray',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    백오피스
                </div>
                <Menu
                    theme='light'
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    onClick={onSelectMenu}
                    items={[{
                        key: '1',
                        icon: <UserOutlined />,
                        label: '사용자 관리',
                    }]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'right'}} >
                    <Space
                        style={{ marginRight: 10}}
                    >
                        <Button
                            type="default"
                            onClick={onClickLogout}
                        >로그아웃</Button>
                    </Space>
                </Header>
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