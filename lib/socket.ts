import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:9999";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export default socket;
