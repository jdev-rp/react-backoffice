import {DatePicker, Form, Input, Modal, ModalProps} from "antd";
import FormItem from "antd/lib/form/FormItem";
import {passwordRegex, passwordRegexMessage, userIdRegex, userIdRegexMessage} from "@/utils/regex";
import {existByUserId, getUser, getUsers, pushByUser, updateUser} from "@/storage/userStorage";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import dayjs from "dayjs";


const userFormModal = forwardRef(({onOk, onCancel}, ref) => {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [isUpdate, setUpdate] = useState(false);

    const onFinish = (values: any) => {
        values.birthday = values.birthday.format('YYYYMMDD');
        isUpdate ? updateUser(values) : pushByUser(values);
        form.resetFields();
        setOpen(false);
        onOk();
    }

    const onOkFirst = () : void => {
        form.submit();
    }

    const onCancelFirst = () : void => {
        form.resetFields();
        setOpen(false);
        onCancel();
    }



    useImperativeHandle(
        ref, () => ({
            openCreateModal: () => {
                setOpen(true);
                setUpdate(false);

            },
            openUpdateModal: (userId: string) => {
                setOpen(true);
                setUpdate(true);

                for(let [key, value] of Object.entries(getUser(userId))) {
                    if(key === 'birthday') value = dayjs(value, 'YYYYMMDD');
                    form.setFieldValue(key, value);
                }
            }
        }));
    



    return (
        <Modal
            title={isUpdate ? "사용자 수정" : "사용자 등록"}
            open={open}
            onOk={onOkFirst}
            onCancel={onCancelFirst}
            okText='저장'
            cancelText='닫기'
        >
            <Form
                layout={"vertical"}
                form={form}
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
                                if(!isUpdate && value && existByUserId(value)) return Promise.reject(new Error('중복되는 아이디가 존재합니다'));

                                return Promise.resolve();
                            }
                        })
                    ]}
                >
                    <Input maxLength={15} disabled={isUpdate}/>
                </FormItem>
                <FormItem
                    label="패스워드"
                    name="password"
                    hidden={isUpdate}
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
                    hidden={isUpdate}
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
                    <DatePicker
                        format={'YYYY-MM-DD'}
                        showToday={false}
                        disabledDate={(day) => {
                            return dayjs().isBefore(day);
                        }}
                    />
                </FormItem>
            </Form>
        </Modal>
    )
});

userFormModal.displayName = "UserFormModal";

export default userFormModal;