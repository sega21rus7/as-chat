/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./create_dialog_popup.scss";
import { Modal, Form, Input, message, Pagination, Empty, Spin } from "antd";
import { useDispatch } from "react-redux";
import { fetchUsers } from "store/createDialog/thunkCreators";
import { getFullName } from "tools";
import { useSelector } from "tools/hooks";
import Avatar from "../../Avatar/Avatar";
import { postDialog } from "store/dialogs/thunkCreators";
import { getFiltetedUsers } from "store/createDialog/selectors";
import createDialogActionCreators from "store/createDialog/actionCreators";

interface IProps {
  visible: boolean;
  hide(): void;
}
interface IFormValues {
  text: string;
}

const pageSize = 5;

const CreateDialogPopup: React.FC<IProps> = ({ visible, hide }) => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectedUserID, setSelectedUserID] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const users = useSelector(state => getFiltetedUsers(state.createDialog));
  const loading = useSelector(state => state.createDialog.loading);

  const handleSubmit = (values: IFormValues) => {
    if (!selectedUserID) {
      return message.error("Не выбран собеседник!");
    }
    const { text } = values;
    dispatch(postDialog(selectedUserID, text));
    hide();
  };

  const paginate = (page: number) => {
    setPage(page);
  };

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields();
      handleSubmit(values);
    } catch (err) {
      message.error(err.errorFields[0].errors[0] || err.message || err);
    }
  };

  useEffect(() => {
    if (!searchValue || !searchValue.trim()) {
      dispatch(createDialogActionCreators.showAll());
      return;
    }
    dispatch(createDialogActionCreators.showByFullName(searchValue));
  }, [searchValue]);

  useEffect(() => {
    if (visible) {
      dispatch(fetchUsers());
      return;
    }
    form.resetFields();
    setSearchValue("");
    setSelectedUserID("");
    setPage(1);
  }, [visible]);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { _id } = e.currentTarget.dataset;
    _id && setSelectedUserID(_id);
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Modal
      className="create-dialog-popup"
      visible={visible}
      title="Новое сообщение"
      okText="Отправить"
      cancelText="Закрыть"
      onCancel={hide}
      onOk={onOk}
    >
      {
        loading ? <div className="create-dialog-popup__no">
          <Spin />
        </div> :
          !users?.length ? <div className="create-dialog-popup__no">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Пользователи не найдены"
            />
          </div> :
            <React.Fragment>
              <Input
                placeholder="Найти пользователей..."
                value={searchValue}
                onChange={handleSearchValueChange}
              />
              <div className="user-list">
                {users.slice(page === 1 ? 0 : pageSize * page - pageSize, pageSize * page).map(user =>
                  <li
                    className={
                      selectedUserID === user._id ?
                        "user-list__item user-item user-item_selected" :
                        "user-list__item user-item"
                    }
                    key={user._id}
                    data-_id={user._id}
                    onClick={handleClick}
                  >
                    <div className="user-item__body">
                      <div className="user-item__avatar">
                        <Avatar user={user} />
                      </div>
                      <div className="user-item__name">{getFullName(user)}</div>
                    </div>
                  </li>)}
                <Pagination
                  current={page}
                  total={users?.length}
                  showSizeChanger={false}
                  pageSize={pageSize}
                  responsive
                  onChange={paginate}
                />
              </div>
              <Form form={form}>
                <Form.Item
                  name="text"
                  rules={[{ required: true, message: "Это обязательное поле" }]}
                >
                  <Input placeholder="Введите текст сообщения..." />
                </Form.Item>
              </Form>
            </React.Fragment>
      }
    </Modal>
  );
};

export default CreateDialogPopup;