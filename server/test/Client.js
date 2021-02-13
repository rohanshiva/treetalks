
var io = require("socket.io-client");
const fetch = require("node-fetch");


let socket = io.connect("http://localhost:5000");


fetch("http://localhost:5000/room", {
    method: "POST"
}).then((async (resp) => {
    const {roomId} = await resp.json();
    console.log(roomId);
    const roomOptions = {
        roomId: roomId,
        userId: "Ramko9999",
        topicDetails: {
            title: "Abortion",
            description: "Abortion stuff",
        },
        degree: 99
    };
    socket.emit("join", roomOptions);
    socket.on("disconnect", () => {
        console.log("Killng ramko9999");
    });

    socket.emit("chatMessage", {
        text: "Hi!",
        authorId: "Ramko9999"
    });

}));










