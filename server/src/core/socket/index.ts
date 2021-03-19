/* eslint-disable @typescript-eslint/ban-ts-comment */
import http from "http";
import socketIO from "socket.io";
import mongoose from "mongoose";
import events from "./events";
import User from "modules/auth/models/User";

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
      await User.updateOne({ _id: mongoose.Types.ObjectId(userID) }, { lastVisited: date });
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

    socket.on("disconnect", data => {
      console.log("data", data);
      console.log("user disconnected");
    });
  });
  return io;
};
