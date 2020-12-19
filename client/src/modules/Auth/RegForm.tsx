import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { customFetch, setToken } from "../../tools";
import { IFormValues } from "../../tools/interfaces";
import { IProps } from "./interfaces";
import { passRules, loginRules, emailRules } from "./rules";

// todo потом вынести интерфейсы в tools
interface IResponse {
  token: string,
}

const RegForm: React.FC<IProps> = props => {
  const history = useHistory();

  const onFinish = async (values: IFormValues) => {
    const { password, password2 } = values;
    if (password !== password2) {
      return message.error("Пароли должны совпадать!");
    }
    try {
      let res = await customFetch("/api/auth/register", values);
      res = await customFetch("/api/auth/login", values) as IResponse;
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
      name="email"
      rules={emailRules}
    >
      <Input prefix={<MailOutlined />}
        placeholder="Email"
        type="email"
      />
    </Form.Item>
    <Form.Item
      name="login"
      rules={loginRules}
    >
      <Input
        prefix={<UserOutlined />}
        placeholder="Логин"
      />
    </Form.Item>
    <Form.Item
      name="lastName"
    >
      <Input
        prefix={<UserOutlined />}
        placeholder="Фамилия (необязательное поле)"
      />
    </Form.Item>
    <Form.Item
      name="firstName"
    >
      <Input
        prefix={<UserOutlined />}
        placeholder="Имя (необязательное поле)"
      />
    </Form.Item>
    <Form.Item
      name="middleName"
    >
      <Input
        prefix={<UserOutlined />}
        placeholder="Отчество (необязательное поле)"
      />
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
    <Form.Item
      name="password2"
      rules={passRules}
    >
      <Input.Password
        prefix={<LockOutlined />}
        autoComplete="on"
        placeholder="Повторите пароль"
      />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
        Зарегистрироваться
      </Button>
      Или <a role="button" onClick={() => props.setIsLogin(true)}>войдите в систему</a>
    </Form.Item>
  </Form>;
};

export default RegForm;