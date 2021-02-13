
var io = require("socket.io-client");
socket2 = io.connect("http://localhost:5000");
const room = "25652";

socket2.emit("join", {
        roomId: room,
        userId: "Sponged",
        degree: 5 
    
    });

    socket2.on("disconnect", () => {
        console.log("Killing Sponged");
    });

    setTimeout(() => {
        socket2.emit("chatMessage", {
            text: "H!",
            authorId: "Sponged"
        });
    }, 1000);