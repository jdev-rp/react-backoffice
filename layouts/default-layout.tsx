import {Layout} from "antd";
import {Content, Footer, Header} from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import {gray} from "@ant-design/colors";

export default function DefaultLayout({ children }) {
    return (
        <Layout>
            <Sider></Sider>
            <Layout>
                <Header></Header>
                <Content>{children}</Content>
                <Footer></Footer>
            </Layout>
        </Layout>
    )
}