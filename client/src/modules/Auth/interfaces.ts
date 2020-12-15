export interface IFormValues {
  [key: string]: string
}

export interface IProps {
  requireMess: string;
  setIsLogin(value: boolean): void;
}