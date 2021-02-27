import React from "react";
import "./search_form.scss";

interface PropsType {
  className: string;
}

const SearchForm: React.FC<PropsType> = ({ className }) => {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form noValidate className={["search-form", className].join(" ")} onSubmit={submit}>
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