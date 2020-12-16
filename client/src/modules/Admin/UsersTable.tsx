import React from "react";
import { Table, Empty, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import { customFetch, arrToObj } from "../../tools";
import { IUser, IDataSourceObj } from "./interfaces";
import EditUserModal from "./EditUserModal";

interface IResponse {
  users: IUser[]
}

const UsersTable: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<IUser[]>([]);
  const [editableUser, setEditableUser] = React.useState<IUser>();
  const [editModalIsVisible, setEditModalIsVisible] = React.useState(false);
  const [dataSourceObj, setDataSourceObj] = React.useState<IDataSourceObj>();

  React.useEffect(() => {
    getUsers();
  }, []);

  React.useEffect(() => {
    setDataSourceObj(arrToObj(dataSource));
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
        return <EditOutlined onClick={() => {
          clickEditUser(id);
        }} />;
      },
    },
  ];

  const clickEditUser = (id: string) => {
    setEditableUser(dataSourceObj && dataSourceObj[id]);
    setEditModalIsVisible(true);
  };

  const getUsers = async () => {
    try {
      let res = await customFetch("/api/admin/users") as IResponse;
      res.users = res.users.map((x: IUser) => {
        x.key = x.email;
        return x;
      });
      setDataSource(res.users);
    } catch (err) {
      message.error(err.message);
    }
  };

  if (!dataSource.length) {
    return <Empty description="Нет данных" />;
  }

  return (
    <React.Fragment>
      <Table<IUser>
        style={{
          margin: "0px 50px",
        }}
        size="small"
        dataSource={dataSource}
        columns={columns} />
      {editableUser && <EditUserModal
        visible={editModalIsVisible}
        setVisible={setEditModalIsVisible}
        user={editableUser}
        updateUsers={getUsers}
      />}
    </React.Fragment>
  );
};

export default UsersTable;