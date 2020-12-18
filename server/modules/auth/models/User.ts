import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IUser extends mongoose.Document {
  login: string,
  email: string,
  password: string;
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
  password: {
    type: String,
    required: true,
  },
  regDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<IUser & Document>("users", userSchema);