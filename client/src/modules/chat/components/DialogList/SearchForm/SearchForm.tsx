import React from "react";
import "./search_form.scss";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchForm: React.FC = () => {
  return (
    <Input
      className="search-input"
      allowClear
      placeholder="Поиск среди контактов"
      suffix={<SearchOutlined />}
    />
  );
};

export default SearchForm;