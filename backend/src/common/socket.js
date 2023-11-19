import { Server } from "socket.io";
import { chatService } from "../chat";

const configureSocket = (httpServer) => {
  let messages = [];
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });
  io.use((socket, next) => {
    const userId = socket.handshake.query.userId;
    socket.customSocketId = userId;
    next();
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    console.log(
      "const customSocketId = socket.customSocketId;",
      socket.customSocketId
    );

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room ${roomId}`);
    });

    socket.on("chat_message", (data) => {
      const { roomId, message } = data;
      console.log(`Received message in room ${roomId}: ${message}`);

      io.to(roomId).emit("chat_reply", { roomId, message });
    });
  

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};


export { configureSocket };
