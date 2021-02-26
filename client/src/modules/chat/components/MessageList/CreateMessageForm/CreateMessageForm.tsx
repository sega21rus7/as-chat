import { useFormik } from "formik";
import React from "react";
import "./create_message_form.scss";
import image from "./assets/svg/send.svg";
import { useDispatch } from "react-redux";
import { postMessage } from "store/messages/actionCreators";
import { useSelector } from "tools/hooks";

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
  const dispatch = useDispatch();
  const currentDialogID = useSelector(state => state.dialogs.currentDialog?._id);

  const handleSubmit = (values: FormValuesType) => {
    currentDialogID && dispatch(postMessage(currentDialogID, values.message));
    formik.resetForm();
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