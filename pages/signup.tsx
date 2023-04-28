import BlankLayout from "@/layouts/blank-layout";
import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import {Button, Col, Divider, Form, Input, Row} from "antd";
import {Content} from "antd/lib/layout/layout";
import FormItem from "antd/lib/form/FormItem";
import Link from "next/link";
import {passwordRegex, passwordRegexMessage, userIdRegex, userIdRegexMessage} from "@/utils/regex";
import Title from "antd/lib/typography/Title";

const Page: NextPageWithLayout = () => {

    const onFinish = (values: any) => {
        localStorage.getItem('users')
    }

    return (
        <Content style={{maxWidth: '400px', width: '100%', margin: "10% auto"}}>
            <Row>
                <Col span={24}>
                    <Title level={2}>회원가입</Title>
                </Col>
            </Row>
            <Row style={{marginTop : 15}}>
                <Col span={24}>
                    <Form
                        layout={"vertical"}
                        onFinish={onFinish}
                    >
                        <FormItem
                            label="아이디"
                            name="userId"
                            rules={[
                                { required: true, message: '아이디를 입력하세요'},
                                { pattern: userIdRegex, message: userIdRegexMessage}
                            ]}
                        >
                            <Input/>
                        </FormItem>
                        <FormItem
                            label="패스워드"
                            name="password"
                            rules={[
                                { required: true, message: '비밀번호를 입력하세요' },
                                { pattern: passwordRegex, message: passwordRegexMessage}
                            ]}
                        >
                            <Input
                                type="password"
                            />
                        </FormItem>
                        <FormItem
                            label="닉네임"
                            name="nickname"
                            rules={[{ required: true, message: '닉네임를 입력하세요' }]}
                        >
                            <Input/>
                        </FormItem>
                        <FormItem
                            label="생년월일"
                            name="birthday"
                            rules={[{ required: true, message: '생년월일을 선택하세요' }]}
                        >
                            <Input/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" block>회원가입</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
            <Divider/>
            <Row>
                <Col>
                    <Link href="/login">로그인 이동</Link>
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
