
var io = require("socket.io-client");
const fetch = require("node-fetch");
socket2 = io.connect("http://localhost:5000");

fetch("http://localhost:5000/room/find", {
    headers: {
        "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
        title: "Abortion",
        degree: 89
    })
}).then(async (resp) => {
    console.log(resp.status);
    const {roomId} = await resp.json();
    socket2.emit("join", {
        roomId: roomId,
        userId: "Sponged",
        topicDetails: {
            title: "Abortion",
            description: "Abortion exists"
        },
        degree: 5 
    
    });

    socket2.emit("chatMessage", {
        text: "H!",
        authorId: "Sponged"
    });

    socket2.on("disconnect", () => {
        console.log("Killing Sponged");
    });
})

