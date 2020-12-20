import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { jsonFetch, setToken } from "../../tools";
import { IFormValues } from "../../tools/interfaces";
import { IProps, ILoginResponse } from "./interfaces";
import { passRules, loginRules } from "./rules";

const LoginForm: React.FC<IProps> = props => {
  const history = useHistory();

  const login = async (values: IFormValues) => {
    try {
      const res = await jsonFetch("/api/auth/login", values) as ILoginResponse;
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
    onFinish={login}
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
      <Input.Password
        prefix={<LockOutlined />}
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