import { Server } from "socket.io";

const PORT = 8000;
const io = new Server(PORT, {
    cors: true
});

const emailToSocket = new Map();
const socketToEmail = new Map();

io.on("connection", (socket) => {
    console.log("Socket Connected: " + socket.id);
    socket.on("room:join", ({ room }) => {
        console.log(`User ${socket.id} entered room ${room}`);
        io.to(room).emit("user:joined", { user: socket.id });
        socket.join(room);
        io.to(socket.id).emit("room:join:success", { room })
    })
})