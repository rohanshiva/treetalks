
var io = require("socket.io-client");


let socket = io.connect("http://localhost:5000");

const room = "25652";
const roomCreate = {
    roomId: room,
    userId: "Ramko9999",
    topicDetails: {
        title: "World Eater",
        description: "They are nice",
    },
    degree: 1
};



socket.emit("create", roomCreate);

socket.on("disconnect", () => {
    console.log("Killng ramko9999");
})

setTimeout(() => {
    socket.emit("chatMessage", {
        text: "Hi!",
        authorId: "Ramko9999"
    });
}, 1000);









