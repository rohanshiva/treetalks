
var io = require("socket.io-client");


let socket = io.connect("http://localhost:5000");


const roomCreate = {
    roomId: "1xl-1js",
    userId: "Ramko9999",
    topicDetails: "World Eaters are bad for heatlh",
    degree: 1
};



socket.emit("create", roomCreate);

setTimeout(() => {
    let socket2 = io.connect("http://localhost:5000");
    socket2.emit("join", {
        roomId: "1xl-1js",
        userId: "Sponged",
        degree: 5
    });

    socket2.on("room", (room) => {
        console.log(room);   
    })
}, 500);


