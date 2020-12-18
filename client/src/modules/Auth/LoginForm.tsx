import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { customFetch, setToken } from "../../tools";
import { IFormValues } from "../../tools/interfaces";
import { IProps } from "./interfaces";
import { passRules, loginRules } from "./rules";

interface IResponse {
  token: string;
}

const LoginForm: React.FC<IProps> = props => {
  const history = useHistory();

  const onFinish = async (values: IFormValues) => {
    try {
      const res = await customFetch("/api/auth/login", values) as IResponse;
      setToken(res.token);
      history.push("/admin/users");
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
      rules={loginRules}
    >
      <Input prefix={<UserOutlined />}
        placeholder="Логин" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={passRules}
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
      Или <a role="button" onClick={() => props.setIsLogin(false)}>
        зарегистрируйтесь сейчас</a>
    </Form.Item>
  </Form >;
};

export default LoginForm;