export interface UserType {
  roles: string[];
  _id?: string;
  email: string;
  login: string;
  createdAt: Date;
  updatedAt: Date;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  avatar?: string;
}
export interface MessageType {
  hasRead: boolean;
  _id: string;
  author: UserType;
  text: string;
  updatedAt: Date;
}

export interface DialogType {
  messages: MessageType[],
  _id: string;
  author: UserType;
  companion: UserType;
  updatedAt: Date;
}