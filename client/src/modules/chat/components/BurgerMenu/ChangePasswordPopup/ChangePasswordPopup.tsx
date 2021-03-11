import React from "react";
import "./change_password_popup.scss";
import { Modal, Form, message, Input } from "antd";
import { changePassword } from "store/auth/thunkCreators";
import { useDispatch } from "react-redux";

interface IProps {
  visible: boolean;
  hide(): void;
}

interface IFormValues {
  oldPassword: string;
  password: string;
  repeatPassword: string;
}

const requireMes = "Это обязательное поле";

const ChangePasswordPopup: React.FC<IProps> = ({ visible, hide }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onCancel = () => {
    form.resetFields();
    hide();
  };

  const handleSubmit = (values: IFormValues) => {
    const { oldPassword, password, repeatPassword } = values;
    dispatch(changePassword(oldPassword, password, repeatPassword));
  };

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields();
      handleSubmit(values);
    } catch (err) {
      message.error(err.errorFields[0].errors[0] || err.message || err);
    }
  };

  return (
    <Modal
      className="change-password-popup"
      visible={visible}
      title="Сменить пароль"
      okText="Сменить"
      cancelText="Закрыть"
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form}>
        <Form.Item
          name="oldPassword"
          rules={[{ required: true, message: requireMes }]}
        >
          <Input.Password autoComplete="on" placeholder="Введите старый пароль" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: requireMes },
            { min: 5, message: "Минимальная длина пароля 5 символов" },
          ]}
        >
          <Input.Password autoComplete="on" placeholder="Введите новый пароль" />
        </Form.Item>
        <Form.Item
          name="repeatPassword"
          rules={[
            { required: true, message: requireMes },
            { min: 5, message: "Минимальная длина пароля 5 символов" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли должны совпадать!"));
              },
            }),
          ]}
        >
          <Input.Password autoComplete="on" placeholder="Повторите новый пароль" />
        </Form.Item>
      </Form>

    </Modal>
  );
};

export default ChangePasswordPopup;