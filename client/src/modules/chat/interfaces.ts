export interface UserType {
  _id: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  login: string;
  avatar?: string;
  online: boolean;
}