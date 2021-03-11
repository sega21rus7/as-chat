import React, { useEffect, useRef } from "react";
import "./create_message_form.scss";
import { Form, Input, Button } from "antd";
import image from "./assets/svg/send.svg";
import { useDispatch } from "react-redux";
import { postMessage } from "store/messages/thunkCreators";
import { useSelector } from "tools/hooks";
import { TextAreaRef } from "antd/lib/input/TextArea";

interface FormValuesType {
  text: string,
}

const CreateMessageForm: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const inputRef = useRef<TextAreaRef>(null);
  const currentDialogID = useSelector(state => state.dialogs.currentDialog?._id);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const handleSubmit = (values: FormValuesType) => {
    if (currentDialogID && values.text && values.text.trim()) {
      dispatch(postMessage(currentDialogID, values.text));
      form.resetFields();
    }
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey) {
      e.preventDefault();
      handleSubmit({ text: form.getFieldValue("text") });
    }
  };

  return (
    <Form
      form={form}
      className="create-message-form"
      onFinish={handleSubmit}
    >
      <Form.Item name="text">
        <Input.TextArea
          ref={inputRef}
          placeholder="Написать сообщение..."
          allowClear
          autoSize
          onPressEnter={onPressEnter}
        />
      </Form.Item>
      <Form.Item>
        <Button className="create-message-form__submit" htmlType="submit">
          <img src={image} alt="" />
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateMessageForm;