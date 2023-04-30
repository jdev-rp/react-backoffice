import {NextPageWithLayout} from "@/pages/_app";
import {Content} from "antd/lib/layout/layout";
import {Button, Col, DatePicker, Form, Input, Row, Select, Space, Table, theme} from "antd";
import FormItem from "antd/lib/form/FormItem";
import {RangePicker} from "rc-picker";
import {getUsers} from "@/storage/userStorage";
import {ColumnsType} from "antd/lib/table";
import {useEffect, useState} from "react";


const Page: NextPageWithLayout = () => {

    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);

    const formStyle = {
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
        width: '100%',
    };

    interface DataType {
        key: React.Key;
        userId: string;
        nickname: string;
        birthday: string;
    }

    const columns: ColumnsType<DataType>= [
        {
            title: '아이디',
            dataIndex: 'userId',
            key: 'userId',
            align: 'center'
        },
        {
            title: '닉네임',
            dataIndex: 'nickname',
            key: 'nickname',
            align: 'center'
        },
        {
            title: '생년월일',
            dataIndex: 'birthday',
            key: 'birthday',
            align: 'center'
        }
    ];

    function onFinish(searchValues: any) {
        console.log(searchValues)
    }

    function onReset() {
        form.resetFields();
    }

    let [data, setData] = useState([]);

    useEffect(() => {
        setData(getUsers());
    }, []);


    return (
        <main>
            <Form
                form={form}
                style={formStyle}
                onFinish={onFinish}
                labelAlign="right"
            >
                <Row gutter="10">
                    <Col span={6}>
                        <FormItem label='생년월일' name="birthday">
                            <DatePicker/>
                            <DatePicker/>
                        </FormItem>
                    </Col>
                    <Col span={6} style={{display: 'flex', flexDirection: 'row'}}>
                        <FormItem  name="searchType">
                            <Select
                                defaultValue="userId"
                                options={[
                                    {label: '아이디', value: 'userId'},
                                    {label: '닉네임', value: 'nickname'},
                                ]}
                            ></Select>
                        </FormItem>
                        <FormItem name="searchValue" style={{ marginLeft: 5, width: '100%' }}>
                            <Input type="search"/>
                        </FormItem>
                    </Col>
                </Row>
                <div style={{textAlign: 'right'}}>
                    <Space size="small">
                        <Button type="primary" htmlType="submit">검색</Button>
                        <Button
                            type="default"
                            htmlType="reset"
                            onClick={onReset}
                        >초기화</Button>
                    </Space>
                </div>
            </Form>
            <Table columns={columns}
                   dataSource={data}
                   size={"small"}
                   bordered
                   scroll={{ y: 500}}
                   style={{marginTop: 15}}/>
        </main>
    )
}


export default Page