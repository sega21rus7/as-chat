import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./search_form.scss";

interface FormValuesType {
  title: string,
}

const validationSchema = yup.object({
  title: yup
    .string()
    .required("Это обязательное поле"),
});

const SearchForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: values => handleSubmit(values),
    validationSchema,
  });

  const handleSubmit = (values: FormValuesType) => {
    console.log("values", values);
  };

  return (
    <form noValidate className="search-form" onSubmit={formik.handleSubmit}>
      <div className="input">
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