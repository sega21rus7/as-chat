export interface IProps {
  setIsLogin(value: boolean): void;
}

export interface ILoginResponse {
  token: string,
}