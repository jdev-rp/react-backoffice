import {DatePicker, Form, Input, Modal} from "antd";
import FormItem from "antd/lib/form/FormItem";
import {passwordRegex, passwordRegexMessage, userIdRegex, userIdRegexMessage} from "@/utils/regex";
import {existByUserId} from "@/storage/userStorage";

const userModalForm = ({open, setOpen, onCancle, isUpdate}) => {
    const [form] = Form.useForm();

    const onOk = () => {
        form.submit();
        setOpen(false);
    }

    return (
        <Modal
            title="사용자 등록/수정"
            open={open}
            onOk={onOk}
            onCancle={onCancle}
            okText='저장'
            cancelText='닫기'
        >
            <Form
                layout={"vertical"}
                form={form}
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
            </Form>
        </Modal>
    )
}

export default userModalForm;