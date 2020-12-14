import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { customFetch } from "../../tools";

interface IFormValues {
  [key: string]: string
}
interface IRules {
  minLen: number;
  maxLen: number;
  minLenErrorMes: string;
  maxLenErrorMes: string;
}
interface IProps {
  requireMess: string;
  passRules: IRules;
  loginRules: IRules;
  setIsLogin(value: boolean): void;
}

const LoginForm: React.FC<IProps> = props => {
  const onFinish = async (values: IFormValues) => {
    try {
      const res = await customFetch("/api/auth/login", values);
      console.log("res", res);
    } catch (err) {
      message.error(err.message);
    }
  };

  return <Form
    style={{
      width: 500,
      margin: "0 auto",
    }}
    onFinish={onFinish}
  >
    <Form.Item
      name="login"
      rules={[{ required: true, message: props.requireMess }]}
    >
      <Input prefix={<UserOutlined />}
        placeholder="Логин" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: props.requireMess }]}
    >
      <Input
        prefix={<LockOutlined />}
        type="password"
        autoComplete="on"
        placeholder="Пароль"
      />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
        Войти
      </Button>
      Или <a role="button" onClick={() => {
        props.setIsLogin(false);
      }}>зарегистрируйтесь сейчас</a>
    </Form.Item>
  </Form >;
};

export default LoginForm;