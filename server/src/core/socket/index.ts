/* eslint-disable @typescript-eslint/ban-ts-comment */
import http from "http";
import socketIO from "socket.io";
import mongoose from "mongoose";
import events from "./events";
import User from "modules/auth/models/User";
import Message from "modules/chat/messages/models/Message";
import Dialog from "modules/chat/dialogs/models/Dialog";

export default (http: http.Server): socketIO.Server => {
  // @ts-ignore
  const io: socketIO.Server = socketIO(http);
  io.on("connection", (socket: socketIO.Socket) => {
    console.log("a user connected");

    socket.on(events.joinDialog, (dialogID: string, login: string) => {
      socket.join(dialogID);
      console.log(`User ${login} joined the room ${dialogID}`);
    });
    socket.on(events.leaveDialog, (dialogID: string, login: string) => {
      socket.leave(dialogID);
      console.log(`User ${login} left the room ${dialogID}`);
    });
    socket.on(events.join, (userID: string, login: string) => {
      socket.join(userID);
      console.log(`User ${login} joined the chat. ID: ${userID}`);
    });
    socket.on(events.leave, async (date: Date, userID: string, login: string) => {
      try {
        await User.updateOne({ _id: mongoose.Types.ObjectId(userID) }, { lastVisited: date });
      } catch (err) {
        console.log("err in events.leave", err);
      }
      socket.leave(userID);
      console.log(`User ${login} left the chat. ID: ${userID}`);
    });
    socket.on(events.typingMessage, (dialogID, ...roomIds: string[]) => {
      roomIds.forEach(room => {
        socket.to(room).emit(events.typingMessage, dialogID);
      });
    });
    socket.on(events.stopTypingMessage, (dialogID, ...roomIds: string[]) => {
      roomIds.forEach(room => {
        socket.to(room).emit(events.stopTypingMessage, dialogID);
      });
    });
    socket.on(events.isOnline, (userID: string, response: (v: boolean | undefined) => void) => {
      const clients = io.sockets.adapter.rooms.get(userID);
      response(clients && clients.size > 0);
    });
    socket.on(events.updateMessagesHasRead,
      async (userID: string, dialogID: string, login: string, companionID: string, cb: (v: boolean) => void) => {
        try {
          console.log("updateMessagesHasRead");
          const dres = await Dialog.updateOne(
            { _id: mongoose.Types.ObjectId(dialogID) },
            { hasNotReadMessagesCount: 0 }
          );
          if (!dres.nModified) { return; }
          const mres = await Message.updateMany(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { author: { $nin: [mongoose.Types.ObjectId(userID) as any] }, dialog: mongoose.Types.ObjectId(dialogID) as any, hasRead: false },
            { hasRead: true }
          );
          if (!mres.nModified) { return; }
          console.log(`User ${login} has read ${mres.nModified} of ${mres.n} messages in the room ${dialogID}`);
          console.log("companionID", companionID);
          console.log("userID", userID);
          socket.to(userID).to(companionID).emit(events.updateDialogsHasRead);
          socket.to(dialogID).emit(events.updateMessagesHasRead);
          cb && cb(true);
        } catch (err) {
          console.log("err in events.updateMessagesHasRead", err);
        }
      });

    // socket.on("disconnecting", () => {
    //   console.log("socket.rooms", io.sockets.adapter.rooms);
    // });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  return io;
};
