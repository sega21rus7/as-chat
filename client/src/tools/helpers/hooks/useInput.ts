import { useState } from "react";
import useInputValidation, { ValidatorsType } from "./useInputValidation";

export type InputType = {
  value: string | undefined;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onBlur(): void;
  isDirty: boolean;
  error?: string;
}

export default (initialValue = "", validators?: ValidatorsType): InputType => {
  console.log("!!!!!!!!!!!! USE input", validators);
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const error = validators && useInputValidation(value, validators);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    setIsDirty(true);
  };
  return { value, onChange, onBlur, isDirty, error };
};