import BlankLayout from "@/layouts/blank-layout";
import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement, useRef} from "react";
import {Avatar, Button, Col, Form, FormInstance, Input, InputRef, message, Row} from "antd";
import {Content} from "antd/lib/layout/layout";
import FormItem from "antd/lib/form/FormItem";
import Password from "antd/lib/input/Password";
import Link from "next/link";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {existByUserIdAndPassword, existNotByUserIdAndPassword} from "@/storage/userStorage";

const Page: NextPageWithLayout = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (user: any) => {

        const existNot = existNotByUserIdAndPassword(user);

        console.log(existNot);

        if(existNot) {
            return messageApi.open({
                type: 'error',
                content: '일치하는 사용자가 존재하지 않습니다'
            });
        }


    }

    return (
        <Content style={{maxWidth: '400px', width: '100%', margin: "15% auto"}}>
            {contextHolder}
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
                                placeholder="아이디"
                                allowClear={true}
                                maxLength={15}
                            />
                        </FormItem>
                        <FormItem
                            name="password"
                            rules={[{ required: true, message: '비밀번호를 입력하세요' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="패스워드"
                                allowClear={true}
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
