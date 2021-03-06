import { Schema, Document, model } from "mongoose";

interface IMessage extends Document {
  _id: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  text: string;
  dialog: Schema.Types.ObjectId;
  hasRead: boolean;
}

const messageSchema = new Schema({
  author: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    required: true,
    type: String,
  },
  dialog: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Dialog",
  },
  hasRead: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default model<IMessage & Document>("Message", messageSchema);
