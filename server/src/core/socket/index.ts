/* eslint-disable @typescript-eslint/ban-ts-comment */
import http from "http";
import socketIO from "socket.io";
import events from "./events";

export default (http: http.Server): socketIO.Server => {
  // @ts-ignore
  const io = socketIO(http);
  io.on("connection", (socket: socketIO.Socket) => {
    console.log("a user connected");

    socket.on(events.JOIN_ROOM, (roomID, login) => {
      socket.join(roomID);
      console.log(`User ${login} joined the room ${roomID}`);
    });
    socket.on(events.LEAVE_ROOM, (roomID, login) => {
      socket.leave(roomID);
      console.log(`User ${login} left the room ${roomID}`);
    });
    socket.on(events.JOIN, (userID, login) => {
      socket.join(userID);
      console.log(`User ${login} joined the chat. ID: ${userID}`);
    });
    socket.on(events.LEAVE, (userID, login) => {
      socket.leave(userID);
      console.log(`User ${login} left the chat. ID: ${userID}`);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  return io;
};
