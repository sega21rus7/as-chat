/* eslint-disable @typescript-eslint/ban-ts-comment */
import io from "socket.io-client";
import config from "config";

// @ts-ignore
export default io(`http://localhost:${config.socketPort}`, { transports: ["websocket"] });