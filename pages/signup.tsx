import BlankLayout from "@/layouts/blank-layout";
import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import {Button, Col, DatePicker, Divider, Form, Input, Row} from "antd";
import {Content} from "antd/lib/layout/layout";
import FormItem from "antd/lib/form/FormItem";
import Link from "next/link";
import {passwordRegex, passwordRegexMessage, userIdRegex, userIdRegexMessage} from "@/utils/regex";
import Title from "antd/lib/typography/Title";
import {existByUserId, pushByUser} from "@/storage/userStorage";
import {useRouter} from "next/router";

const Page: NextPageWithLayout = () => {
    const router = useRouter();

    const onFinish = async (user: any) => {
        user.birthday = user.birthday.format('YYYYMMDD');
        await pushByUser(user)
        await router.push('/signup-complete');
    }

    return (
        <section style={{maxWidth: '400px', width: '100%', margin: "10% auto"}}>
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
                                { pattern: userIdRegex, message: userIdRegexMessage},
                                ({}) => ({
                                    validator(rule, value) {
                                        if(value && existByUserId(value)) return Promise.reject(new Error('중복되는 아이디가 존재합니다'));

                                        return Promise.resolve();
                                    }
                                })
                            ]}
                        >
                            <Input maxLength={15}/>
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
                            label="패스워드 재확인"
                            name="passwordConfirm"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: '비밀번호 재확인을 입력하세요' },
                                ({ getFieldValue}) => ({
                                    validator(rule, value) {
                                        if(value && getFieldValue('password') !== value) return Promise.reject(new Error('패스워드가 일치하지 않습니다'))

                                        return Promise.resolve();
                                    }
                                })
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
                            <DatePicker format={'YYYY-MM-DD'} block/>
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
        </section>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <BlankLayout>{page}</BlankLayout>
    )
}

export default Page
