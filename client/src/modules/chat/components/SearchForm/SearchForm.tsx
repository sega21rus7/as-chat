import React from "react";
import { useFormik } from "formik";
import "./search_form.scss";

interface FormValuesType {
  title: string,
}

const SearchForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: values => handleSubmit(values),
  });

  const handleSubmit = (values: FormValuesType) => {
    console.log("values", values);
  };

  return (
    <form noValidate className="search-form" onSubmit={formik.handleSubmit}>
      <div className="search-form__input-wrapper input">
        <input
          className="search-form__input input__content"
          type="text"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          placeholder="Поиск среди контактов"
        />
        <div className="input__error">{formik.errors.title}</div>
      </div>
    </form>
  );
};

export default SearchForm;