import React from "react";
import { Form, Input, Button, message } from "antd";
import { emailRules, loginRules } from "modules/auth/rules";
import { jsonFetch } from "tools";
import { IUser, IKeyStringValueString } from "tools/interfaces";
export interface IEditUserResponse {
  user: IUser,
}

const EditUserForm: React.FC = () => {
  const [user, setUser] = React.useState<IUser>();
  // const [fileList, setFileList] = React.useState<UploadFile[]>();
  const [form] = Form.useForm();

  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    form.resetFields();
  }, [user]);

  const getUser = async () => {
    try {
      const res = await jsonFetch("/api/profile/user/info", undefined, {
        method: "GET",
      }) as IEditUserResponse;
      setUser(res.user);
    } catch (err) {
      message.error(err.message);
    }
  };

  const editUser = async (values: IKeyStringValueString) => {
    try {
      const res = await jsonFetch("/api/profile/user/edit", values);
      message.success(res);
    } catch (err) {
      message.error(err.message);
    }
  };

  // const beforeAvatarUpload = (file: UploadFile) => {
  //   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  //   if (!isJpgOrPng) {
  //     message.error("Вы можете загрузить только JPG/PNG форматы!");
  //   }
  //   return isJpgOrPng;
  // };

  // const handleAvatarChange = (info: UploadChangeParam) => {
  //   if (info.file.status === "done") {
  //     message.success("Фото успешно загружено.");
  //     setFileList([info.file]);
  //   } else if (info.file.status === "error") {
  //     message.error("При загрузке фото произошла ошибка. Попробуйте снова");
  //   }
  // };

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const onAvatarRemove = (file: UploadFile) => {
  //   setFileList([]);
  // };

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const normFile = (e: any) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.file.originFileObj;
  // };

  return (
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
      {/* <Form.Item
        label="Аватар"
        name="avatar"
        getValueFromEvent={normFile}
      >
        <Upload
          onChange={handleAvatarChange}
          fileList={fileList}
          listType="picture"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeAvatarUpload}
          onRemove={onAvatarRemove}
        >
          {fileList && fileList.length > 0 ? null : <Button icon={<UploadOutlined />}>Загрузить</Button>}
        </Upload>
      </Form.Item> */}
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditUserForm;