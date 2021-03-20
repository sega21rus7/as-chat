/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./create_message_form.scss";
import socket from "core/socket";
import socketEvents from "core/socket/events";
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
  const currentDialog = useSelector(state => state.dialogs.currentDialog);
  const currentDialogID = currentDialog?._id;
  const user = useSelector(state => state.auth.user);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (submitted) {
      inputRef.current?.focus();
      setSubmitted(false);
    }
  }, [submitted]);

  const emitStopTyping = () => {
    if (!currentDialog) { return; }
    socket.emit(
      socketEvents.stopTypingMessage,
      currentDialog._id,
      currentDialog.author._id, currentDialog.companion._id,
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!currentDialog || !user) { return; }
    if (!e.target.value) {
      inputRef.current?.focus();
      emitStopTyping();
      return;
    }
    socket.emit(
      socketEvents.typingMessage,
      currentDialog._id,
      currentDialog.author._id, currentDialog.companion._id,
    );
  };

  const handleSubmit = (values: FormValuesType) => {
    if (currentDialogID && values.text && values.text.trim()) {
      dispatch(postMessage(currentDialogID, values.text));
      form.resetFields();
      emitStopTyping();
      setSubmitted(true);
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
          onChange={handleChange}
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