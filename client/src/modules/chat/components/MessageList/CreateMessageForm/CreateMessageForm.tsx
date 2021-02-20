import { useFormik } from "formik";
import React from "react";
import "./create_message_form.scss";
import image from "./assets/svg/send.svg";

interface FormValuesType {
  message: string,
}

const CreateMessageForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: values => handleSubmit(values),
  });

  const handleSubmit = (values: FormValuesType) => {
    console.log("values", values);
  };

  return (
    <form noValidate className="create-message-form" onSubmit={formik.handleSubmit}>
      <div className="create-message-form__input">
        <input
          className="input create-message-form-input"
          type="text"
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
          placeholder="Написать сообщение..."
        />
        <div className="input__error">{formik.errors.message}</div>
      </div>
      <button className="create-message-form__button" type="submit">
        <img src={image} alt="" />
      </button>
    </form>
  );
};

export default CreateMessageForm;