import React from "react";
import { Row, Col, Image, Form, Input, Button, Upload, message } from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { emailRules, loginRules } from "../auth/rules";
import { customTokenFetch } from "../../tools";
import { IFormValues } from "../../tools/interfaces";

export interface IUser {
  email: string;
  login: string;
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

export interface IEditUserResponse {
  user: IUser,
}

const EditUserForm: React.FC = () => {
  const [user, setUser] = React.useState<IUser>();
  const [avatarUrl, setAvatarUrl] = React.useState<string>();
  const [avatarLoading, setAvatarLoading] = React.useState(false);
  const [avatarFileList, setAvatarFileList] = React.useState<UploadFile[]>();
  const [form] = Form.useForm();

  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    form.resetFields();
  }, [user]);

  const getUser = async () => {
    try {
      const res = await customTokenFetch("/api/profile/user/info", undefined, {
        method: "GET",
      }) as IEditUserResponse;
      setUser(res.user);
    } catch (err) {
      message.error(err.message);
    }
  };

  const editUser = async (values: IFormValues) => {
    try {
      console.log(values.avatar);
      const res = await customTokenFetch("/api/profile/user/edit", values);
      message.success(res);
    } catch (err) {
      message.error(err.message);
    }
  };

  const beforeAvatarUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Вы можете загрузить JPG/PNG форматы!");
    }
    setAvatarFileList([file]);
    return isJpgOrPng;
  };

  const handleAvatarChange = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      setAvatarLoading(true);
    } else if (info.file.status === "done") {
      console.log("info", info);
      message.success("Фото успешно загружено.");
      setAvatarUrl(info.file.response.url);
      setAvatarLoading(false);
    } else if (info.file.status === "error") {
      message.error("При загрузке фото произошла ошибка. Попробуйте снова");
      setAvatarLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onAvatarRemove = (file: UploadFile) => {
    setAvatarFileList([]);
  };

  return (
    <Row>
      <Col span={12} style={{
        maxWidth: "50%",
      }}>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          initialValues={{
            email: user?.email,
            login: user?.login,
            lastName: user?.lastName,
            firstName: user?.firstName,
            middleName: user?.middleName,
          }}
          onFinish={editUser}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={emailRules}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="login"
            label="Логин"
            rules={loginRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Фамилия"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="Имя"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="middleName"
            label="Отчество"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="Аватар"
          >
            <Upload
              onChange={handleAvatarChange}
              fileList={avatarFileList}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeAvatarUpload}
              onRemove={onAvatarRemove}
            >
              <Button icon={avatarLoading ? <LoadingOutlined /> : <UploadOutlined />}>Загрузить</Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col
        span={6}
        style={{
          margin: "0 auto",
        }}>
        <Image
          src={avatarUrl}
        />
      </Col>
    </Row>
  );
};

export default EditUserForm;