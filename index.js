import { Server } from "socket.io";

const PORT = 8000;
const io = new Server(PORT, {
    cors: true
});

io.on("connection", (socket) => {
    console.log("Socket Connected: " + socket.id);
})