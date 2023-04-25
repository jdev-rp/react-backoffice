import BlankLayout from "@/components/blank-layout";
import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {Content} from "antd/lib/layout/layout";
import FormItem from "antd/lib/form/FormItem";
import Password from "antd/lib/input/Password";
import Link from "next/link";


const onFinish = (values: any) => {
    console.log(values)
}

const Page: NextPageWithLayout = () => {
    return (
        <Content>
            <Row justify={"start"}>
                <Col span={8} offset={7} style={{marginTop: "15%"}}>
                    <Form
                        labelCol={{span: 10}}
                        wrapperCol={{span:14}}
                        labelAlign="right"
                        colon={false}
                        onFinish={onFinish}
                    >
                        <FormItem
                            label="userId"
                            rules={[{ required: true, message: '아이디를 입력하세요'}]}
                        >
                            <Input/>
                        </FormItem>
                        <FormItem
                            label="password"
                            rules={[{ required: true, message: '비밀번호를 입력하세요' }]}
                        >
                            <Password/>
                        </FormItem>
                        <FormItem label=" ">
                            <Button type="text" htmlType="submit">로그인</Button>
                            <Link href={`/signup`} style={{float: "right"}}>회원가입</Link>
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
