import {httpServer} from "./core/HttpServer";
import {Socket} from "socket.io";

const socketServer = require("socket.io")(httpServer);

socketServer.on("connection", (socket:Socket) => {
    console.log("Connected!");
});


httpServer.listen(5000, () => {
    console.log("Listening...");
});
