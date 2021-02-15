import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface UserType extends mongoose.Document {
  login: string,
  email: string,
  password: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  regDate: string;
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
});

export default mongoose.model<UserType & Document>("users", userSchema);