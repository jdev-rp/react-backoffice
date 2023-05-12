import {NextPageWithLayout} from "@/pages/_app";
import {Button, Col, DatePicker, Form, Input, Modal, Popconfirm, Row, Select, Space, Table, theme} from "antd";
import FormItem from "antd/lib/form/FormItem";
import {existByUserId, getUsers, pushByUser, removeByUserId} from "@/storage/userStorage";
import {ColumnsType} from "antd/lib/table";
import {forwardRef, useEffect, useRef, useState} from "react";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {passwordRegex, passwordRegexMessage, userIdRegex, userIdRegexMessage} from "@/utils/regex";
import UserModalForm from "@/components/users/userModalForm";
import dayjs from "dayjs";


const Page: NextPageWithLayout = () => {

    const { RangePicker } = DatePicker;
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);

    const formStyle = {
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
        width: '100%',
        marginTop: 10
    };

    interface DataType {
        key: React.Key;
        userId: string;
        nickname: string;
        birthday: string;
    }

    const onCellClick = (record, rowIdx) => {
        console.log(record, rowIdx);
    }

    const columns: ColumnsType<DataType>= [
        {
            title: '아이디',
            dataIndex: 'userId',
            key: 'userId',
            align: 'center',
        },
        {
            title: '닉네임',
            dataIndex: 'nickname',
            key: 'nickname',
            align: 'center',
        },
        {
            title: '생년월일',
            dataIndex: 'birthday',
            key: 'birthday',
            align: 'center',
        }
    ];

    let [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


    useEffect(() => {
        setData(getUsers());
    }, []);


    const userModalFormRef = forwardRef(UserModalForm);

    const onClickCreate = () => {
        userModalFormRef.current.openCreateModal();
    }

    const onClickUpdate = (userId: string) => {
        userModalFormRef.current.openUpdateModal(userId);
    }

    const onOkOrCancel = () => {
        onFinish();
    }


    function onConfirmRemove(): void {
        selectedRowKeys.forEach(key => {
            removeByUserId(key);
        })
        setData(getUsers());
    }

    function onReset() {
        form.resetFields();
        onFinish();
    }

    function onFinish(searchValues: any) {
        const startDay: string = searchValues?.birthday && searchValues?.birthday[0] ? searchValues?.birthday[0].format('YYYYMMDD') : '',
            endDay: string = searchValues?.birthday && searchValues?.birthday[1] ? searchValues?.birthday[1].format('YYYYMMDD') : '',
            searchType: string = searchValues?.searchType,
            searchValue: string = searchValues?.searchValue;

        const users = getUsers().filter((obj) => {
            if(startDay && startDay > obj.birthday) return false;
            if(endDay && endDay < obj.birthday) return false;
            if(searchType === 'userId' && searchValue && obj?.userId.indexOf(searchValue) < 0) return false;
            if(searchType === 'nickname' && searchValue && obj?.nickname.indexOf(searchValue) < 0) return false;
            return true;
        });

        setData(users);
    }

    return (
        <main>
            <Space style={{display: 'flex', justifyContent: 'end'}}>
                <Button onClick={onClickCreate}>등록</Button>
                <UserModalForm
                    onOk={onOkOrCancel}
                    onCancel={onOkOrCancel}
                    ref={userModalFormRef}
                ></UserModalForm>
                <Popconfirm
                    title="사용자 삭제"
                    description="사용자를 삭제하시겠습니까?"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={onConfirmRemove}
                >
                    <Button>삭제</Button>
                </Popconfirm>
            </Space>
            <Form
                form={form}
                style={formStyle}
                onFinish={onFinish}
                labelAlign="right"
            >
                <Row gutter="10">
                    <Col span={6}>
                        <FormItem label='생년월일' name="birthday">
                            <RangePicker
                                allowEmpty={[true, true]}
                                disabledDate={(day) => {
                                    return dayjs().isBefore(day);
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col span={6} style={{display: 'flex', flexDirection: 'row'}}>
                        <FormItem  name="searchType" initialValue="userId">
                            <Select
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
                   rowKey="userId"
                   rowSelection={rowSelection}
                   scroll={{ y: 800}}
                   style={{marginTop: 15}}
                   onRow={(data, rowIdx) => {
                        return {
                            onClick: (event) => onClickUpdate(data.userId)
                        };
                  }}
            />
        </main>
    )
}


export default Page