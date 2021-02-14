import {httpServer, redisClient} from "./core/HttpServer";
import {onDisconnecting, onJoin, onMessage} from "./core/SocketHandlers";
import {Socket} from "socket.io";



const socketServer = require("socket.io")(httpServer, {
    cors: {
      origin: '*',
    }
  }
);

socketServer.on("connection", (socket:Socket) => {
    socket.on("disconnecting", onDisconnecting(socket, socketServer));
    socket.on("join", onJoin(socket, socketServer));
    socket.on("chatMessage", onMessage(socket, socketServer));
});



redisClient.on("connect", () => {
    httpServer.listen(5000, () => {
        console.log("Listening...");
    });
})
