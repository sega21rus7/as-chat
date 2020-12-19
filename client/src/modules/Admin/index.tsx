import React from "react";
import { Table, Empty, Popconfirm, Tooltip, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { customTokenFetch, arrToObj } from "../../tools";
import { IUser, IDataSourceObj } from "./interfaces";
import ErrorIfNotAuth from "../../tools/wrapperComponents/ErrorIfNotAuth";
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
      title: "Фамилия",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a: IUser, b: IUser) => a.lastName.length - b.lastName.length,
      showSorterTooltip: false,
    },
    {
      title: "Имя",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a: IUser, b: IUser) => a.firstName.length - b.firstName.length,
      showSorterTooltip: false,
    },
    {
      title: "Отчество",
      dataIndex: "middleName",
      key: "middleName",
      sorter: (a: IUser, b: IUser) => a.middleName.length - b.middleName.length,
      showSorterTooltip: false,
    },
    {
      title: "Дата регистрации",
      dataIndex: "regDate",
      key: "regDate",
      render: (date: Date) => new Date(date).toLocaleString(),
    },
    {
      dataIndex: "_id",
      key: "edit",
      render: (id: string) => {
        return <React.Fragment>
          <Tooltip title="Редактировать">
            <EditOutlined
              style={{
                marginRight: 5,
              }}
              onClick={() => editUser(id)}
            />
          </Tooltip>
          <Tooltip title="Удалить">
            <Popconfirm
              title="Подтвердите действие?"
              onConfirm={() => deleteUser(id)}
              okText="Удалить"
              cancelText="Отмена"
              placement="leftTop"
            >
              <DeleteOutlined />
            </Popconfirm>
          </Tooltip>
        </React.Fragment >;
      },
    },
  ];

  const editUser = (_id: string) => {
    setEditableUser(dataSourceObj && dataSourceObj[_id]);
    setEditModalIsVisible(true);
  };

  const deleteUser = async (_id: string) => {
    try {
      const res = await customTokenFetch("/api/admin/user/delete", { _id });
      getUsers();
      message.success(res);
    } catch (err) {
      console.log("err", err);
      message.error(err.message);
    }
  };

  const getUsers = async () => {
    try {
      let res = await customTokenFetch("/api/admin/users", undefined, {
        method: "GET",
      }) as IResponse;
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
    return <ErrorIfNotAuth>
      <Empty description="Нет данных" />
    </ErrorIfNotAuth>;
  }

  return (
    <ErrorIfNotAuth>
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
    </ErrorIfNotAuth>
  );
};

export default UsersTable;