import React from "react";
import { Table, message, Modal, Input, Form, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import { customFetch, arrToObj } from "../../tools";
import { IResponse } from "../../tools/interfaces";
import { IUser, IDataSourceObj } from "./interfaces";
import { loginRules } from "../Auth/rules";

const UsersTable: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<IUser[]>([]);
  const [editModalIsVisible, setEditModalIsVisible] = React.useState(false);
  const [editableUser, setEditableUser] = React.useState<IUser>();
  const [form] = Form.useForm();

  let dataSourceObj: IDataSourceObj;

  React.useEffect(() => {
    getUsers();
  }, []);

  React.useEffect(() => {
    dataSourceObj = arrToObj(dataSource);
  }, [dataSource]);

  const columns: ColumnsType<IUser> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: IUser, b: IUser) => a.email.length - b.email.length,
      showSorterTooltip: false,
    },
    {
      title: "Логин",
      dataIndex: "login",
      key: "login",
      sorter: (a: IUser, b: IUser) => a.login.length - b.login.length,
      showSorterTooltip: false,
    },
    {
      dataIndex: "_id",
      key: "edit",
      render: (id: string) => {
        return <EditOutlined onClick={() => clickEditUser(id)} />;
      },
    },
  ];

  const getUsers = async () => {
    try {
      let res: IResponse = await customFetch("/api/admin/users");
      res.users = res.users.map((x: IUser) => {
        x.key = x.email;
        return x;
      });
      setDataSource(res.users);
    } catch (err) {
      message.error(err.message);
    }
  };

  const clickEditUser = (id: string) => {
    setEditableUser(dataSourceObj && dataSourceObj[id]);
    setEditModalIsVisible(true);
  };

  const editUserFromModal = async () => {
    try {
      const values = await form.validateFields();
      console.log("values", values);
    } catch (err) {
      console.log("err", err);
      message.error(err);
    }
  };

  const cancelModal = () => {
    setEditModalIsVisible(false);
  };

  return (
    <React.Fragment>
      <Table<IUser>
        style={{
          margin: "0px 50px",
        }}
        size="small"
        dataSource={dataSource}
        columns={columns} />
      <Modal title="Редактирование пользователя"
        visible={editModalIsVisible}
        onOk={editUserFromModal}
        onCancel={cancelModal}
        footer={[
          <Button key="back" onClick={cancelModal}>
            Закрыть
          </Button>,
          <Button key="submit" type="primary" onClick={editUserFromModal}>
            Применить
          </Button>,
        ]}
      >
        <Form
          form={form}
          initialValues={{
            email: editableUser?.email,
            login: editableUser?.login,
          }}
        >
          <Form.Item
            name="email"
          >
            <Input
              placeholder="Email"
              type="email"

            />
          </Form.Item>
          <Form.Item
            name="login"
            rules={loginRules}
          >
            <Input
              placeholder="Логин"
            />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>

  );
};

export default UsersTable;