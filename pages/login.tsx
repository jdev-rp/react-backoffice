import BlankLayout from "@/layouts/blank-layout";
import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import {Avatar, Button, Col, Form, FormInstance, Input, Row} from "antd";
import {Content} from "antd/lib/layout/layout";
import FormItem from "antd/lib/form/FormItem";
import Password from "antd/lib/input/Password";
import Link from "next/link";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

const Page: NextPageWithLayout = () => {

    const onFinish = (values: any) => {

        console.log(values);
    }

    return (
        <Content style={{maxWidth: '400px', width: '100%', margin: "15% auto"}}>
            <Row>
                <Col span={24} style={{textAlign: 'center'}}>
                    <Avatar size={100} icon={<UserOutlined/>} />
                </Col>
            </Row>
            <Row style={{marginTop : 15}}>
                <Col span={24}>
                    <Form
                        className="login-form"
                        onFinish={onFinish}
                    >
                        <FormItem
                            name="userId"
                            rules={[{ required: true, message: '아이디를 입력하세요'}]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                            />
                        </FormItem>
                        <FormItem
                            name="password"
                            rules={[{ required: true, message: '비밀번호를 입력하세요' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">로그인</Button>
                            <Link href={`/signup`} style={{float: "right"}}>
                                <Button type="text">
                                    회원가입
                                </Button>
                            </Link>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </Content>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <BlankLayout>{page}</BlankLayout>
    )
}

export default Page
