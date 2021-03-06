/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./search_form.scss";
import { useDispatch } from "react-redux";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dialogsActionCreators from "store/dialogs/actionCreators";

const SearchForm: React.FC = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!value || !value.trim()) {
      dispatch(dialogsActionCreators.showAll());
      return;
    }
    dispatch(dialogsActionCreators.showByFullName(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Input
      className="search-input"
      allowClear
      placeholder="Поиск среди контактов"
      value={value}
      onChange={handleChange}
      suffix={<SearchOutlined />}
    />
  );
};

export default SearchForm;