import React from "react";
import "./search_form.scss";

const SearchForm: React.FC = () => {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form noValidate className="search-form" onSubmit={submit}>
      <div className="input search-form-input">
        <input
          className="search-form-input__body"
          type="text"
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          // value={value}
          placeholder="Поиск среди контактов"
        />
      </div>
    </form>
  );
};

export default SearchForm;