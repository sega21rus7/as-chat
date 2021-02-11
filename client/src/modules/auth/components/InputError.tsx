import React from "react";
import { InputType } from "tools/hooks/useInput";

type PropsType = {
  value: InputType;
}

const InputError: React.FC<PropsType> = ({ value }) => {
  return (
    <>
      {
        value.isDirty && value.error &&
        <div className="input__error">
          {value.error}
        </div>
      }
    </>
  );
};

export default InputError;