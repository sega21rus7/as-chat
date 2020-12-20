import React from "react";
import { Image, Form, Input, Button, Upload, Modal, message } from "antd";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { emailRules, loginRules } from "../auth/rules";
import { jsonFetch } from "../../tools";
import { IUser } from "../../tools/interfaces";
export interface IEditUserResponse {
  user: IUser,
}

interface IUserFormValues {
  avatar: UploadFile[],
  email: string;
  login: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBase64 = (file: File | Blob): any => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const EditUserForm: React.FC = () => {
  const [user, setUser] = React.useState<IUser>();
  const [fileList, setFileList] = React.useState<UploadFile[]>();
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState<string>();
  const [previewTitle, setPreviewTitle] = React.useState<string>();
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

  const editUser = async (values: IUserFormValues) => {
    console.log("values 1", values);
    try {
      const res = await jsonFetch("/api/profile/user/edit", {
        values,
        avatar: values.avatar[0].thumbUrl,
      });
      message.success(res);
    } catch (err) {
      message.error(err.message);
    }
  };

  const beforeAvatarUpload = (file: UploadFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Вы можете загрузить только JPG/PNG форматы!");
    }
    return isJpgOrPng;
  };

  const handleAvatarChange = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      message.success("Фото успешно загружено.");
      setFileList([info.file]);
    } else if (info.file.status === "error") {
      message.error("При загрузке фото произошла ошибка. Попробуйте снова");
    }
  };

  const handleAvatarPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url?.substring(file.url?.lastIndexOf("/") + 1));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onAvatarRemove = (file: UploadFile) => {
    setFileList([]);
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e[0].thumbUrl;
    }
    return e && e.fileList[0].thumbUrl;
  };

  return (
    <React.Fragment>
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
          getValueFromEvent={normFile}
        >
          <Upload
            onChange={handleAvatarChange}
            onPreview={handleAvatarPreview}
            fileList={fileList}
            listType="picture-card"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeAvatarUpload}
            onRemove={onAvatarRemove}
          >
            {fileList && fileList.length > 0 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <Image style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </React.Fragment>
  );
};

export default EditUserForm;