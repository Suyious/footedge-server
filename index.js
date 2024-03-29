import { Server } from "socket.io";

const PORT = 8000;
const io = new Server(PORT, {
    cors: true
});

const UsernameToSocket = new Map();
const socketToUsername = new Map();

// On entering browser
io.on("connection", (socket) => {
    console.log("Socket Connected: " + socket.id);
    // on clicking join in /lobby/:id
    socket.on("room:join", ({ room, username }) => {
        // to navigate to /room/:id
        io.to(socket.id).emit("room:join:success", { room })
        // to notify other users in the room
        io.to(room).emit("user:joined", { user: socket.id, username });
        // to actually join the room
        socket.join(room);

        console.log(`User ${socket.id}: ${username} entered room ${room}`);
    })

    socket.on("offer:incoming", ({ id, offer }) => {
        console.log("offer for", id, offer);
        io.to(id).emit("offer:received", { user: socket.id, offer });
    })

    socket.on("ans:incoming", ({ id, ans }) => {
        console.log("ans for", id, ans);
        io.to(id).emit("ans:received", { user: socket.id, ans });
    })

    socket.on("peer:negotiation:needed", ({ offer, id }) => {
        io.to(id).emit("peer:negotiation:needed:received", { offer, user: socket.id });
    })

    socket.on("peer:negotiation:done", ({id, ans}) => {
        io.to(id).emit("peer:negotiation:done:received", { ans, user: socket.id });
    })
})