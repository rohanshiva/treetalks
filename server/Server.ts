import {httpServer, redisClient} from "./core/HttpServer";
import {onLeave, onJoin, onMessage, onMute} from "./core/SocketHandlers";
import {Socket} from "socket.io";



const socketServer = require("socket.io")(httpServer, {
    cors: {
      origin: '*',
    }
  }
);

socketServer.on("connection", (socket:Socket) => {
    console.log("Recieved a connection!");
    socket.on("leave", onLeave(socket, socketServer));
    socket.on("join", onJoin(socket, socketServer));
    socket.on("chatMessage", onMessage(socket, socketServer));
    socket.on("mute", onMute(socket, socketServer));
});



redisClient.on("connect", () => {
    httpServer.listen(5000, () => {
        console.log("Listening...");
    });
})
