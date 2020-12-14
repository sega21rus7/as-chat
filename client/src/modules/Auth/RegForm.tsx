import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

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

const RegForm: React.FC<IProps> = props => {
  const passRules = [
    { required: true, message: props.requireMess },
    { min: props.passRules.minLen, message: props.passRules.minLenErrorMes },
    { max: props.passRules.maxLen, message: props.passRules.maxLenErrorMes },
  ];
  const loginRules = [
    { required: true, message: props.requireMess },
    { min: props.loginRules.minLen, message: props.loginRules.minLenErrorMes },
    { max: props.loginRules.maxLen, message: props.loginRules.maxLenErrorMes },
  ];

  const onFinish = async (values: IFormValues) => {
    const { password, password2 } = values;
    if (password !== password2) {
      return message.error("Пароли должны совпадать!");
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.status > 201) {
        try {
          const res = await response.json();
          message.error(res.errorMessage);
        } catch (e) {
          // костыль нужно выводить сообщения с прокси response.text()
          // нужно использовать bson наверное
          message.error("Произошла непредвиденная ошибка");
        }
        return;
      }
      const res = await response.json();
      console.log(res);
      if (res.errorMessage) {
        message.error(res.errorMessage);
      }
    } catch (err) {
      console.log(err);
      message.error(err);
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
      rules={[{ required: true, message: props.requireMess }]}
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
    <Form.Item
      name="password2"
      rules={passRules}
    >
      <Input
        prefix={<LockOutlined />}
        type="password"
        autoComplete="on"
        placeholder="Повторите пароль"
      />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
        Зарегистрироваться
      </Button>
      Или <a role="button" onClick={() => {
        props.setIsLogin(true);
      }}>войдите в систему</a>
    </Form.Item>
  </Form>;
};

export default RegForm;