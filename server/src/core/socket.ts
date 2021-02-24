/* eslint-disable @typescript-eslint/ban-ts-comment */
import http from "http";
import socketIO from "socket.io";

export default (http: http.Server): socketIO.Server => {
  // @ts-ignore
  const io = socketIO(http);
  io.on("connection", (socket: socketIO.Socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
    socket.emit("test", "test message");
  });
  return io;
};