import { useFormik } from "formik";
import React from "react";
import "./create_message_form.scss";

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
      <div className="input">
        <input
          className="create-message-form__input input__content"
          type="text"
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
          placeholder="Написать сообщение..."
        />
        <div className="input__error">{formik.errors.message}</div>
      </div>
    </form>
  );
};

export default CreateMessageForm;