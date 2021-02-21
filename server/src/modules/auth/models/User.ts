import { Schema, Document, model } from "mongoose";
import { UserRoles } from "./Role";

export interface UserType extends Document {
  login: string,
  email: string,
  password: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  regDate: string;
  roles: Array<UserRoles>;
}

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  regDate: {
    type: Date,
    required: true,
  },
  roles: [
    {
      type: String,
      ref: "Role",
    }],
});

export default model<UserType & Document>("users", userSchema);