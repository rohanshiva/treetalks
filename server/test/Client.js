
var io = require("socket.io-client");


let socket = io.connect("http://localhost:5000");
socket.on("connect", () => {
    console.log("connected");
})
