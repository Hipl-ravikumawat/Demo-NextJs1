import { io } from "socket.io-client";

export const socket = io("http://192.168.1.37:5001",{
    transports: ["websocket"],
});